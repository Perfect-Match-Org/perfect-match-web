import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Editor from "@monaco-editor/react";
import DOMPurify from "dompurify";
import {
	AlertCircle,
	ArrowDown,
	ArrowUp,
	Code2,
	Eye,
	GripVertical,
	Heading,
	Heart,
	ImageIcon,
	Loader2,
	Minus,
	Monitor,
	MousePointer2,
	PencilRuler,
	Smartphone,
	Square,
	Tablet,
	Trash2,
	Type,
	X,
} from "lucide-react";
import { theme } from "@/styles/themes";
import { Template, TemplateComponentBlock } from "@/types/email";
import BlockEditor from "./BlockEditor";

type BlockType = "heading" | "text" | "image" | "button" | "divider" | "spacer" | "logo";
type EditorMode = "visual" | "code" | "preview";
type PreviewMode = "desktop" | "tablet" | "mobile";

interface EmailBlockContent {
	text?: string;
	subtitle?: string;
	link?: string;
	src?: string;
	alt?: string;
	height?: string;
}

interface EmailBlockStyles {
	textAlign?: "left" | "center" | "right";
	marginBottom?: string;
	fontSize?: string;
	color?: string;
	lineHeight?: string;
	fontWeight?: string;
	backgroundColor?: string;
	padding?: string;
	borderRadius?: string;
}

interface EmailBlock {
	id: string;
	type: BlockType;
	content: EmailBlockContent;
	styles: EmailBlockStyles;
}

interface TemplateEditorProps {
	template?: Template;
	onSave: (template: Template) => void | Promise<void>;
	onCancel: () => void;
}

interface CodeEditorRange {
	startLineNumber: number;
	startColumn: number;
	endLineNumber: number;
	endColumn: number;
}

interface CodeEditorInstance {
	getSelection: () => CodeEditorRange | null;
	executeEdits: (
		source: string,
		edits: Array<{
			range: CodeEditorRange;
			text: string;
			forceMoveMarkers: boolean;
		}>
	) => void;
	focus: () => void;
}

interface BlockDefinition {
	type: BlockType;
	label: string;
	description: string;
	icon: React.ComponentType<{ className?: string }>;
}

const DEFAULT_TEMPLATE_CSS = `
body {
	margin: 0;
	padding: 0;
	background: #f5f5f7;
	font-family: "Work Sans", Arial, sans-serif;
	color: #161616;
}

.email-shell {
	padding: 40px 16px;
}

.email-card {
	max-width: 600px;
	margin: 0 auto;
	background: #ffffff;
	border-radius: 24px;
	padding: 40px;
	box-shadow: 0 20px 60px rgba(15, 23, 42, 0.08);
}

.email-footer {
	margin-top: 40px;
	padding-top: 20px;
	border-top: 1px solid #ececec;
	font-size: 12px;
	line-height: 1.6;
	text-align: center;
	color: #7a7a7a;
}

.cta-button {
	display: inline-block;
	text-decoration: none;
	font-weight: 700;
}

@media (max-width: 640px) {
	.email-shell {
		padding: 24px 12px;
	}

	.email-card {
		padding: 24px;
		border-radius: 20px;
	}
}
`.trim();

const PERSONALIZATION_TOKENS = [
	{ token: "firstName", label: "First Name" },
	{ token: "lastName", label: "Last Name" },
	{ token: "email", label: "Email Address" },
	{ token: "matchCount", label: "Match Count" },
	{ token: "joinDate", label: "Join Date" },
	{ token: "ctaLink", label: "CTA Link" },
	{ token: "unsubscribeLink", label: "Unsubscribe Link" },
] as const;

const serializeStyles = (styles: EmailBlockStyles): string => {
	return Object.entries(styles)
		.filter(([, value]) => value !== undefined && value !== "")
		.map(([key, value]) => `${key.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${value}`)
		.join("; ");
};

const normalizeBlockType = (value: string): BlockType => {
	if (value === "heading" || value === "text" || value === "image" || value === "button" || value === "divider" || value === "spacer" || value === "logo") {
		return value;
	}

	return "text";
};

export default function HybridTemplateEditor({ template, onSave, onCancel }: TemplateEditorProps) {
	const blockTypes = useMemo<BlockDefinition[]>(
		() => [
			{ type: "heading", label: "Heading", description: "Large title text", icon: Heading },
			{ type: "text", label: "Text Block", description: "Paragraph copy", icon: Type },
			{ type: "image", label: "Image", description: "Hero or content image", icon: ImageIcon },
			{ type: "button", label: "CTA Button", description: "Primary action", icon: MousePointer2 },
			{ type: "divider", label: "Divider", description: "Visual separator", icon: Minus },
			{ type: "spacer", label: "Spacer", description: "Add breathing room", icon: Square },
			{ type: "logo", label: "Brand Mark", description: "Perfect Match logo block", icon: Heart },
		],
		[]
	);

	const defaultBlocks = useMemo<EmailBlock[]>(
		() => [
			{
				id: "logo-block",
				type: "logo",
				content: {
					text: "Perfect Match",
					subtitle: "Find your perfect match",
				},
				styles: {
					textAlign: "center",
					marginBottom: "28px",
				},
			},
			{
				id: "heading-block",
				type: "heading",
				content: {
					text: "Hello {{firstName}}",
				},
				styles: {
					fontSize: "30px",
					color: "#161616",
					fontWeight: "800",
					marginBottom: "18px",
					textAlign: "left",
				},
			},
			{
				id: "body-block",
				type: "text",
				content: {
					text: "You are getting this email because we have an update worth opening. Keep the message sharp, clear, and action-oriented.",
				},
				styles: {
					fontSize: "16px",
					color: "#4b5563",
					lineHeight: "1.7",
					marginBottom: "20px",
				},
			},
			{
				id: "button-block",
				type: "button",
				content: {
					text: "Open Perfect Match",
					link: "{{ctaLink}}",
				},
				styles: {
					backgroundColor: "#FF328F",
					color: "#ffffff",
					padding: "14px 28px",
					borderRadius: "999px",
					textAlign: "center",
					marginBottom: "12px",
				},
			},
		],
		[]
	);

	const createBaseTemplate = useCallback(
		(value?: Template): Template => ({
			_id: value?._id,
			name: value?.name || "",
			description: value?.description || "",
			html_content: value?.html_content || "",
			css_content: value?.css_content || DEFAULT_TEMPLATE_CSS,
			tags: value?.tags || [],
			thumbnail: value?.thumbnail,
			year: value?.year,
			created_at: value?.created_at,
			updated_at: value?.updated_at,
			created_by: value?.created_by,
			version: value?.version,
			is_shared: value?.is_shared,
			components: value?.components,
		}),
		[]
	);

	const hydrateSavedBlocks = useCallback(
		(value?: Template): EmailBlock[] => {
			const savedBlocks = value?.components?.blocks;
			if (!savedBlocks || savedBlocks.length === 0) {
				return value?.html_content ? [] : defaultBlocks;
			}

			return savedBlocks.map((block: TemplateComponentBlock, index: number) => ({
				id: `saved-block-${index + 1}`,
				type: normalizeBlockType(block.type),
				content: {
					text: typeof block.content.text === "string" ? block.content.text : "",
					subtitle: typeof block.content.subtitle === "string" ? block.content.subtitle : "",
					link: typeof block.content.link === "string" ? block.content.link : "",
					src: typeof block.content.src === "string" ? block.content.src : "",
					alt: typeof block.content.alt === "string" ? block.content.alt : "",
					height: typeof block.content.height === "string" ? block.content.height : "",
				},
				styles: {
					textAlign:
						block.styling.textAlign === "left" || block.styling.textAlign === "center" || block.styling.textAlign === "right"
							? block.styling.textAlign
							: undefined,
					marginBottom: typeof block.styling.marginBottom === "string" ? block.styling.marginBottom : undefined,
					fontSize: typeof block.styling.fontSize === "string" ? block.styling.fontSize : undefined,
					color: typeof block.styling.color === "string" ? block.styling.color : undefined,
					lineHeight: typeof block.styling.lineHeight === "string" ? block.styling.lineHeight : undefined,
					fontWeight: typeof block.styling.fontWeight === "string" ? block.styling.fontWeight : undefined,
					backgroundColor: typeof block.styling.backgroundColor === "string" ? block.styling.backgroundColor : undefined,
					padding: typeof block.styling.padding === "string" ? block.styling.padding : undefined,
					borderRadius: typeof block.styling.borderRadius === "string" ? block.styling.borderRadius : undefined,
				},
			}));
		},
		[defaultBlocks]
	);

	const [templateData, setTemplateData] = useState<Template>(() => createBaseTemplate(template));
	const [editorMode, setEditorMode] = useState<EditorMode>("visual");
	const [blocks, setBlocks] = useState<EmailBlock[]>(() => hydrateSavedBlocks(template));
	const [previewMode, setPreviewMode] = useState<PreviewMode>("desktop");
	const [saving, setSaving] = useState(false);
	const [editorReady, setEditorReady] = useState(false);
	const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
	const [errors, setErrors] = useState<string[]>([]);
	const [editingBlock, setEditingBlock] = useState<EmailBlock | null>(null);

	const editorRef = useRef<CodeEditorInstance | null>(null);
	const previewRef = useRef<HTMLIFrameElement>(null);

	useEffect(() => {
		setTemplateData(createBaseTemplate(template));
		setBlocks(hydrateSavedBlocks(template));
		setHasUnsavedChanges(false);
		setErrors([]);
	}, [template, createBaseTemplate, hydrateSavedBlocks]);

	const serializeBlocks = useCallback((currentBlocks: EmailBlock[]): TemplateComponentBlock[] => {
		return currentBlocks.map((block) => ({
			type: block.type,
			content: {
				text: block.content.text,
				subtitle: block.content.subtitle,
				link: block.content.link,
				src: block.content.src,
				alt: block.content.alt,
				height: block.content.height,
			},
			styling: {
				textAlign: block.styles.textAlign,
				marginBottom: block.styles.marginBottom,
				fontSize: block.styles.fontSize,
				color: block.styles.color,
				lineHeight: block.styles.lineHeight,
				fontWeight: block.styles.fontWeight,
				backgroundColor: block.styles.backgroundColor,
				padding: block.styles.padding,
				borderRadius: block.styles.borderRadius,
			},
			custom_html: "",
		}));
	}, []);

	const generateHtmlFromBlocks = useCallback((currentBlocks: EmailBlock[]) => {
		const htmlParts = [
			"<!DOCTYPE html>",
			"<html lang=\"en\">",
			"<head>",
			"    <meta charset=\"UTF-8\" />",
			"    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />",
			"    <title>{{subject}}</title>",
			"</head>",
			"<body>",
			"    <div class=\"email-shell\">",
			"        <div class=\"email-card\">",
		];

		currentBlocks.forEach((block) => {
			const styles = serializeStyles(block.styles);

			if (block.type === "logo") {
				htmlParts.push(`            <div style="${styles}">`);
				htmlParts.push(`                <div style="font-size: 24px; font-weight: 800; color: #FF328F;">${block.content.text || "Perfect Match"}</div>`);
				if (block.content.subtitle) {
					htmlParts.push(`                <div style="margin-top: 6px; font-size: 14px; color: #6b7280;">${block.content.subtitle}</div>`);
				}
				htmlParts.push("            </div>");
				return;
			}

			if (block.type === "heading") {
				htmlParts.push(`            <h1 style="${styles}">${block.content.text || ""}</h1>`);
				return;
			}

			if (block.type === "text") {
				htmlParts.push(`            <p style="${styles}">${block.content.text || ""}</p>`);
				return;
			}

			if (block.type === "button") {
				htmlParts.push(`            <div style="text-align: ${block.styles.textAlign || "center"}; margin-bottom: ${block.styles.marginBottom || "20px"};">`);
				htmlParts.push(`                <a class="cta-button" href="${block.content.link || "{{ctaLink}}"}" style="${styles}">${block.content.text || "Call to action"}</a>`);
				htmlParts.push("            </div>");
				return;
			}

			if (block.type === "image") {
				htmlParts.push(`            <div style="text-align: ${block.styles.textAlign || "center"}; margin-bottom: ${block.styles.marginBottom || "20px"};">`);
				htmlParts.push(`                <img src="${block.content.src || "https://via.placeholder.com/640x320"}" alt="${block.content.alt || "Email image"}" style="max-width: 100%; height: auto; border-radius: 18px;" />`);
				htmlParts.push("            </div>");
				return;
			}

			if (block.type === "divider") {
				htmlParts.push(`            <hr style="border: none; border-top: 1px solid #ececec; margin: ${block.styles.marginBottom || "24px"} 0;" />`);
				return;
			}

			if (block.type === "spacer") {
				htmlParts.push(`            <div style="height: ${block.content.height || "20px"};"></div>`);
			}
		});

		htmlParts.push(
			"            <div class=\"email-footer\">",
			"                <p>Perfect Match | <a href=\"{{unsubscribeLink}}\">Unsubscribe</a></p>",
			"                <p>© 2026 Perfect Match. All rights reserved.</p>",
			"            </div>",
			"        </div>",
			"    </div>",
			"</body>",
			"</html>"
		);

		return htmlParts.join("\n");
	}, []);

	useEffect(() => {
		if (blocks.length === 0) {
			return;
		}

		const generatedHtml = generateHtmlFromBlocks(blocks);
		setTemplateData((prev) => ({
			...prev,
			html_content: generatedHtml,
			components: {
				blocks: serializeBlocks(blocks),
			},
		}));
	}, [blocks, generateHtmlFromBlocks, serializeBlocks]);

	const previewWidth = useMemo(() => {
		if (previewMode === "mobile") {
			return "375px";
		}

		if (previewMode === "tablet") {
			return "768px";
		}

		return "100%";
	}, [previewMode]);

	const addBlock = useCallback((type: BlockType) => {
		const newBlock: EmailBlock = {
			id: `block-${Date.now()}`,
			type,
			content:
				type === "heading"
					? { text: "New heading" }
					: type === "text"
						? { text: "Add your message here." }
						: type === "button"
							? { text: "Learn more", link: "{{ctaLink}}" }
							: type === "image"
								? { src: "https://via.placeholder.com/640x320", alt: "Campaign image" }
								: type === "logo"
									? { text: "Perfect Match", subtitle: "Find your perfect match" }
									: type === "spacer"
										? { height: "20px" }
										: {},
			styles:
				type === "heading"
					? { fontSize: "28px", fontWeight: "800", color: "#161616", marginBottom: "18px", textAlign: "left" }
					: type === "text"
						? { fontSize: "16px", color: "#4b5563", lineHeight: "1.7", marginBottom: "18px" }
						: type === "button"
							? { backgroundColor: "#FF328F", color: "#ffffff", padding: "14px 28px", borderRadius: "999px", textAlign: "center", marginBottom: "18px" }
							: type === "image"
								? { textAlign: "center", marginBottom: "18px" }
								: type === "logo"
									? { textAlign: "center", marginBottom: "28px" }
									: type === "divider"
										? { marginBottom: "24px" }
										: { marginBottom: "20px" },
		};

		setBlocks((prev) => [...prev, newBlock]);
		setHasUnsavedChanges(true);
	}, []);

	const updateBlock = useCallback((updatedBlock: EmailBlock) => {
		setBlocks((prev) => prev.map((block) => (block.id === updatedBlock.id ? updatedBlock : block)));
		setHasUnsavedChanges(true);
	}, []);

	const deleteBlock = useCallback((blockId: string) => {
		setBlocks((prev) => prev.filter((block) => block.id !== blockId));
		setHasUnsavedChanges(true);
	}, []);

	const moveBlock = useCallback((fromIndex: number, toIndex: number) => {
		if (toIndex < 0 || toIndex >= blocks.length) {
			return;
		}

		setBlocks((prev) => {
			const nextBlocks = [...prev];
			const [movedBlock] = nextBlocks.splice(fromIndex, 1);
			nextBlocks.splice(toIndex, 0, movedBlock);
			return nextBlocks;
		});
		setHasUnsavedChanges(true);
	}, [blocks.length]);

	const insertPersonalizationToken = useCallback((token: string) => {
		if (editorMode !== "code") {
			window.alert("Switch to the code editor to insert personalization tokens.");
			return;
		}

		const editorInstance = editorRef.current;
		if (!editorInstance) {
			return;
		}

		const range = editorInstance.getSelection() || {
			startLineNumber: 1,
			startColumn: 1,
			endLineNumber: 1,
			endColumn: 1,
		};

		editorInstance.executeEdits("insert-token", [
			{
				range,
				text: `{{${token}}}`,
				forceMoveMarkers: true,
			},
		]);
		editorInstance.focus();
		setHasUnsavedChanges(true);
	}, [editorMode]);

	const validateTemplate = useCallback(() => {
		const nextErrors: string[] = [];

		if (!templateData.name.trim()) {
			nextErrors.push("Template name is required.");
		}

		if (!templateData.html_content.trim()) {
			nextErrors.push("Template content is required.");
		}

		return nextErrors;
	}, [templateData.html_content, templateData.name]);

	const handleSave = useCallback(async () => {
		const validationErrors = validateTemplate();
		setErrors(validationErrors);

		if (validationErrors.length > 0) {
			return;
		}

		setSaving(true);
		try {
			const nextTemplate: Template = {
				...templateData,
				components:
					blocks.length > 0
						? {
							blocks: serializeBlocks(blocks),
						}
						: templateData.components,
			};

			await onSave(nextTemplate);
			setHasUnsavedChanges(false);
		} catch (error) {
			setErrors(["Failed to save template. Please try again."]);
		} finally {
			setSaving(false);
		}
	}, [blocks, onSave, serializeBlocks, templateData, validateTemplate]);

	const generatePreviewHtml = useCallback(() => {
		const htmlWithStyles = templateData.html_content.includes("</head>")
			? templateData.html_content.replace("</head>", `<style>${templateData.css_content}</style></head>`)
			: `<!DOCTYPE html><html><head><style>${templateData.css_content}</style></head><body>${templateData.html_content}</body></html>`;

		return htmlWithStyles
			.replace(/\{\{firstName\}\}/g, "Jordan")
			.replace(/\{\{lastName\}\}/g, "Lee")
			.replace(/\{\{email\}\}/g, "jordan.lee@example.com")
			.replace(/\{\{matchCount\}\}/g, "4")
			.replace(/\{\{joinDate\}\}/g, "March 15, 2026")
			.replace(/\{\{subject\}\}/g, templateData.name || "Perfect Match Update")
			.replace(/\{\{ctaLink\}\}/g, "https://perfectmatch.ai")
			.replace(/\{\{unsubscribeLink\}\}/g, "https://perfectmatch.ai/unsubscribe");
	}, [templateData.css_content, templateData.html_content, templateData.name]);

	const updatePreview = useCallback(() => {
		const previewDoc = previewRef.current?.contentDocument;
		if (!previewDoc) {
			return;
		}

		const sanitizedHtml = DOMPurify.sanitize(generatePreviewHtml());
		previewDoc.open();
		previewDoc.write(sanitizedHtml);
		previewDoc.close();
	}, [generatePreviewHtml]);

	useEffect(() => {
		if (editorMode === "preview") {
			updatePreview();
		}
	}, [editorMode, updatePreview]);

	useEffect(() => {
		if (!hasUnsavedChanges) {
			return;
		}

		const handleBeforeUnload = (event: BeforeUnloadEvent) => {
			event.preventDefault();
			event.returnValue = "";
		};

		window.addEventListener("beforeunload", handleBeforeUnload);
		return () => window.removeEventListener("beforeunload", handleBeforeUnload);
	}, [hasUnsavedChanges]);

	const renderBlockContent = useCallback((block: EmailBlock) => {
		if (block.type === "logo") {
			return (
				<div className="flex flex-col gap-2" style={{ textAlign: block.styles.textAlign || "center" }}>
					<div className="inline-flex items-center gap-2 self-center text-pink-600">
						<Heart className="h-5 w-5 fill-pink-100" />
						<span className="text-xl font-black" style={{ fontFamily: theme.fonts.heading }}>
							{block.content.text || "Perfect Match"}
						</span>
					</div>
					{block.content.subtitle ? <p className="text-sm text-gray-500">{block.content.subtitle}</p> : null}
				</div>
			);
		}

		if (block.type === "heading") {
			return <h1 style={block.styles}>{block.content.text}</h1>;
		}

		if (block.type === "text") {
			return <p style={block.styles}>{block.content.text}</p>;
		}

		if (block.type === "button") {
			return (
				<div style={{ textAlign: block.styles.textAlign || "center" }}>
					<span
						className="inline-block no-underline"
						style={{
							backgroundColor: block.styles.backgroundColor,
							color: block.styles.color,
							padding: block.styles.padding,
							borderRadius: block.styles.borderRadius,
							fontWeight: 700,
						}}
					>
						{block.content.text || "Call to action"}
					</span>
				</div>
			);
		}

		if (block.type === "image") {
			return (
				<div style={{ textAlign: block.styles.textAlign || "center" }}>
					<img
						src={block.content.src || "https://via.placeholder.com/640x320"}
						alt={block.content.alt || "Email image"}
						className="mx-auto rounded-xl"
						style={{ maxWidth: "100%", height: "auto" }}
					/>
				</div>
			);
		}

		if (block.type === "divider") {
			return <hr className="border-0 border-t border-gray-200" style={{ marginBottom: block.styles.marginBottom || "24px" }} />;
		}

		if (block.type === "spacer") {
			return <div style={{ height: block.content.height || "20px" }} />;
		}

		return null;
	}, []);

	const visualModeContent = useMemo(() => {
		return (
			<div className="flex h-full">
				<div className="w-80 shrink-0 border-r border-gray-200 bg-gray-50/70 p-5">
					<div className="mb-5">
						<h3 className="text-sm font-bold uppercase tracking-widest text-gray-500">Add Blocks</h3>
						<p className="mt-2 text-sm text-gray-500">Build the structure visually, then fine-tune the final HTML if needed.</p>
					</div>

					<div className="space-y-2">
						{blockTypes.map((blockType) => {
							const Icon = blockType.icon;
							return (
								<button
									key={blockType.type}
									onClick={() => addBlock(blockType.type)}
									className="w-full rounded-xl border border-gray-200 bg-white p-4 text-left transition-all hover:border-pink-200 hover:bg-pink-50/40"
								>
									<div className="flex items-start gap-3">
										<div className="rounded-md bg-gray-50 p-2 text-pink-600">
											<Icon className="h-4 w-4" />
										</div>
										<div>
											<div className="text-sm font-bold text-gray-900">{blockType.label}</div>
											<div className="mt-1 text-xs font-medium text-gray-500">{blockType.description}</div>
										</div>
									</div>
								</button>
							);
						})}
					</div>

					<div className="mt-8 rounded-xl border border-amber-100 bg-amber-50 p-4">
						<div className="flex items-start gap-3">
							<AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
							<div>
								<div className="text-xs font-bold uppercase tracking-widest text-amber-700">Visual note</div>
								<p className="mt-1 text-sm font-medium text-amber-900">
									The visual editor keeps your layout clean and fast. Use the code tab when you need exact markup control.
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="flex-1 overflow-y-auto p-6">
					<div className="mx-auto max-w-[680px] rounded-[12px] border border-gray-200 bg-white p-8 shadow-[0_20px_70px_rgba(17,24,39,0.08)]">
						{blocks.length === 0 ? (
							<div className="rounded-xl border border-dashed border-gray-200 bg-gray-50/60 px-8 py-16 text-center">
								<div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-md bg-white shadow-sm">
									<PencilRuler className="h-6 w-6 text-pink-500" />
								</div>
								<h3 className="text-lg font-bold text-gray-900">Start with a block</h3>
								<p className="mt-2 text-sm font-medium text-gray-500">
									Add a heading, body copy, CTA, or divider from the left panel to start building the template.
								</p>
							</div>
						) : (
							<div className="space-y-4">
								{blocks.map((block, index) => (
									<div key={block.id} className="group rounded-xl border border-transparent p-3 transition-all hover:border-gray-200 hover:bg-gray-50/70">
										<div className="mb-3 flex items-center justify-between opacity-0 transition-opacity group-hover:opacity-100">
											<div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400">
												<GripVertical className="h-3.5 w-3.5" />
												{block.type}
											</div>
											<div className="flex items-center gap-2">
												<button
													onClick={() => moveBlock(index, index - 1)}
													disabled={index === 0}
													className="rounded-md border border-gray-200 bg-white p-2 text-gray-500 transition-all hover:text-gray-900 disabled:opacity-30"
												>
													<ArrowUp className="h-4 w-4" />
												</button>
												<button
													onClick={() => moveBlock(index, index + 1)}
													disabled={index === blocks.length - 1}
													className="rounded-md border border-gray-200 bg-white p-2 text-gray-500 transition-all hover:text-gray-900 disabled:opacity-30"
												>
													<ArrowDown className="h-4 w-4" />
												</button>
												<button
													onClick={() => setEditingBlock(block)}
													className="rounded-md border border-gray-200 bg-white px-3 py-2 text-xs font-bold uppercase tracking-widest text-gray-600 transition-all hover:border-pink-200 hover:text-pink-600"
												>
													Edit
												</button>
												<button
													onClick={() => deleteBlock(block.id)}
													className="rounded-md border border-rose-100 bg-rose-50 p-2 text-rose-600 transition-all hover:bg-rose-100"
												>
													<Trash2 className="h-4 w-4" />
												</button>
											</div>
										</div>
										<div style={{ marginBottom: block.styles.marginBottom }}>{renderBlockContent(block)}</div>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}, [addBlock, blockTypes, blocks, deleteBlock, moveBlock, renderBlockContent]);

	const codeModeContent = useMemo(() => {
		return (
			<div className="flex h-full">
				<div className="flex-1 border-r border-gray-200 bg-white">
					<Editor
						height="100%"
						defaultLanguage="html"
						value={templateData.html_content}
						onChange={(value) => {
							setTemplateData((prev) => ({
								...prev,
								html_content: value || "",
							}));
							setHasUnsavedChanges(true);
						}}
						onMount={(editorInstance) => {
							const typedEditor: CodeEditorInstance = editorInstance;
							editorRef.current = typedEditor;
							setEditorReady(true);
						}}
						loading={
							<div className="flex h-full items-center justify-center bg-gray-50">
								<div className="flex flex-col items-center rounded-xl border border-gray-100 bg-white p-6 shadow-xl">
									<Loader2 className="mb-4 h-10 w-10 animate-spin text-pink-500" />
									<span className="text-xs font-bold uppercase tracking-widest text-gray-400">Loading Editor...</span>
								</div>
							</div>
						}
						theme="vs-light"
						options={{
							minimap: { enabled: false },
							fontSize: 14,
							lineNumbers: "on",
							wordWrap: "on",
							automaticLayout: true,
							scrollBeyondLastLine: false,
						}}
					/>
				</div>

				<div className="w-[320px] shrink-0 bg-gray-50/70 p-5">
					<div className="rounded-xl border border-gray-200 bg-white p-4">
						<div className="text-xs font-bold uppercase tracking-widest text-gray-400">Quick Tip</div>
						<p className="mt-2 text-sm font-medium text-gray-600">
							Use the visual tab for layout and this tab for precision. Tokens can be inserted directly into the HTML.
						</p>
					</div>

					<div className="mt-5">
						<h3 className="text-sm font-bold uppercase tracking-widest text-gray-500">Personalization Tokens</h3>
						<div className="mt-3 space-y-2">
							{PERSONALIZATION_TOKENS.map((item) => (
								<button
									key={item.token}
									onClick={() => insertPersonalizationToken(item.token)}
									className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-left transition-all hover:border-pink-200 hover:bg-pink-50/40"
								>
									<div className="text-sm font-bold text-gray-900">{item.label}</div>
									<div className="mt-1 text-xs font-medium text-gray-500">{`{{${item.token}}}`}</div>
								</button>
							))}
						</div>
					</div>

					<div className="mt-5">
						<label className="mb-2 block text-sm font-bold uppercase tracking-widest text-gray-500">CSS</label>
						<textarea
							value={templateData.css_content}
							onChange={(event) => {
								setTemplateData((prev) => ({
									...prev,
									css_content: event.target.value,
								}));
								setHasUnsavedChanges(true);
							}}
							rows={14}
							className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 shadow-sm focus:border-pink-300 focus:outline-none focus:ring-4 focus:ring-pink-500/10"
						/>
					</div>

					{!editorReady && (
						<div className="mt-5 text-xs font-bold uppercase tracking-widest text-gray-400">Editor is booting...</div>
					)}
				</div>
			</div>
		);
	}, [editorReady, insertPersonalizationToken, templateData.css_content, templateData.html_content]);

	const previewModeContent = useMemo(() => {
		return (
			<div className="flex h-full flex-col bg-gray-50/80">
				<div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
					<div>
						<h3 className="text-sm font-bold uppercase tracking-widest text-gray-500">Preview</h3>
						<p className="mt-1 text-sm text-gray-500">Simulated data is used for names, CTAs, and unsubscribe links.</p>
					</div>

					<div className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 p-1">
						{[
							{ value: "desktop", label: "Desktop", icon: Monitor },
							{ value: "tablet", label: "Tablet", icon: Tablet },
							{ value: "mobile", label: "Mobile", icon: Smartphone },
						].map((modeOption) => {
							const Icon = modeOption.icon;
							return (
								<button
									key={modeOption.value}
									onClick={() => setPreviewMode(modeOption.value as PreviewMode)}
									className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-bold uppercase tracking-widest transition-all ${previewMode === modeOption.value ? "bg-pink-600 text-white shadow-lg shadow-pink-200" : "text-gray-500 hover:text-gray-900"
										}`}
								>
									<Icon className="h-3.5 w-3.5" />
									{modeOption.label}
								</button>
							);
						})}
					</div>
				</div>

				<div className="flex-1 overflow-auto p-8">
					<div className="mx-auto h-full rounded-[12px] border border-gray-200 bg-white shadow-[0_20px_70px_rgba(17,24,39,0.08)] transition-all duration-300" style={{ maxWidth: previewWidth }}>
						<iframe ref={previewRef} title="Email preview" className="h-full min-h-[680px] w-full rounded-[12px]" />
					</div>
				</div>
			</div>
		);
	}, [previewMode, previewWidth]);

	return (
		<div className="flex h-screen flex-col bg-gray-50">
			<div className="border-b border-gray-200 bg-white px-6 py-4">
				<div className="flex items-start justify-between gap-4">
					<div>
						<h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: theme.fonts.heading }}>
							{template ? "Edit Template" : "Create New Template"}
						</h1>
						<p className="mt-1 text-gray-600">Design visually, edit the HTML directly, and preview the final send in one workflow.</p>
					</div>

					<div className="flex items-center gap-3">
						{hasUnsavedChanges && (
							<div className="inline-flex items-center gap-2 rounded-md border border-amber-100 bg-amber-50 px-3 py-2 text-xs font-bold uppercase tracking-widest text-amber-700">
								<AlertCircle className="h-3.5 w-3.5" />
								Unsaved Changes
							</div>
						)}

						<button
							onClick={onCancel}
							className="inline-flex items-center gap-2 rounded-md border border-gray-200 px-4 py-2 text-sm font-bold text-gray-600 transition-all hover:bg-gray-50"
						>
							<X className="h-4 w-4" />
							Cancel
						</button>
						<button
							onClick={handleSave}
							disabled={saving}
							className="rounded-md px-6 py-2 text-sm font-bold text-white transition-all hover:shadow-lg disabled:opacity-50"
							style={{ backgroundColor: theme.colors.primary }}
						>
							{saving ? "Saving..." : "Save Template"}
						</button>
					</div>
				</div>
			</div>

			<div className="border-b border-gray-200 bg-white px-6 py-4">
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div>
						<label className="mb-2 block text-sm font-bold text-gray-700">Template Name</label>
						<input
							type="text"
							value={templateData.name}
							onChange={(event) => {
								setTemplateData((prev) => ({
									...prev,
									name: event.target.value,
								}));
								setHasUnsavedChanges(true);
							}}
							placeholder="e.g. Matches Release 2026"
							className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-900 shadow-sm focus:border-pink-300 focus:outline-none focus:ring-4 focus:ring-pink-500/10"
						/>
					</div>
					<div>
						<label className="mb-2 block text-sm font-bold text-gray-700">Description</label>
						<input
							type="text"
							value={templateData.description}
							onChange={(event) => {
								setTemplateData((prev) => ({
									...prev,
									description: event.target.value,
								}));
								setHasUnsavedChanges(true);
							}}
							placeholder="Short internal note about this template"
							className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-900 shadow-sm focus:border-pink-300 focus:outline-none focus:ring-4 focus:ring-pink-500/10"
						/>
					</div>
				</div>

				{errors.length > 0 && (
					<div className="mt-4 rounded-xl border border-rose-100 bg-rose-50 p-4">
						<ul className="space-y-1 text-sm font-medium text-rose-700">
							{errors.map((error) => (
								<li key={error}>{error}</li>
							))}
						</ul>
					</div>
				)}
			</div>

			<div className="border-b border-gray-200 bg-white">
				<div className="flex items-center">
					{[
						{ id: "visual", label: "Visual Builder", icon: PencilRuler },
						{ id: "code", label: "HTML & CSS", icon: Code2 },
						{ id: "preview", label: "Preview", icon: Eye },
					].map((tab) => {
						const Icon = tab.icon;
						return (
							<button
								key={tab.id}
								onClick={() => setEditorMode(tab.id as EditorMode)}
								className={`inline-flex items-center gap-2 border-b-2 px-6 py-4 text-sm font-bold transition-all ${editorMode === tab.id
									? "border-pink-500 text-pink-600"
									: "border-transparent text-gray-500 hover:text-gray-900"
									}`}
							>
								<Icon className="h-4 w-4" />
								{tab.label}
							</button>
						);
					})}
				</div>
			</div>

			<div className="min-h-0 flex-1">
				{editorMode === "visual" ? visualModeContent : null}
				{editorMode === "code" ? codeModeContent : null}
				{editorMode === "preview" ? previewModeContent : null}
			</div>

			{editingBlock && (
				<BlockEditor
					block={editingBlock}
					onUpdate={(updatedBlock) => {
						updateBlock(updatedBlock);
						setEditingBlock(null);
					}}
					onClose={() => setEditingBlock(null)}
				/>
			)}
		</div>
	);
}