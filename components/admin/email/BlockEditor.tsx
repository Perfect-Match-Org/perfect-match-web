import React, { useState } from "react";
import { X } from "lucide-react";
import { theme } from "@/styles/themes";

interface Block {
	id: string;
	type: "text" | "heading" | "image" | "button" | "divider" | "spacer" | "logo";
	content: {
		text?: string;
		subtitle?: string;
		link?: string;
		src?: string;
		alt?: string;
		height?: string;
	};
	styles: {
		textAlign?: "left" | "center" | "right";
		marginBottom?: string;
		fontSize?: string;
		color?: string;
		lineHeight?: string;
		fontWeight?: string;
		backgroundColor?: string;
		padding?: string;
		borderRadius?: string;
	};
}

interface BlockEditorProps {
	block: Block;
	onUpdate: (block: Block) => void;
	onClose: () => void;
}

export default function BlockEditor({ block, onUpdate, onClose }: BlockEditorProps) {
	const [editedBlock, setEditedBlock] = useState<Block>({ ...block });

	const handleSave = () => {
		onUpdate(editedBlock);
		onClose();
	};

	const updateContent = (key: string, value: any) => {
		setEditedBlock((prev) => ({
			...prev,
			content: { ...prev.content, [key]: value },
		}));
	};

	const updateStyle = (key: string, value: any) => {
		setEditedBlock((prev) => ({
			...prev,
			styles: { ...prev.styles, [key]: value },
		}));
	};

	const renderSharedSpacingControls = () => (
		<div className="grid grid-cols-2 gap-4">
			<div>
				<label className="mb-2 block text-sm font-bold text-gray-700">Alignment</label>
				<select
					value={editedBlock.styles.textAlign || "left"}
					onChange={(e) => updateStyle("textAlign", e.target.value as "left" | "center" | "right")}
					className="w-full rounded-md border bg-white border-gray-200 px-3 py-2 text-sm text-gray-700 focus:border-pink-300 focus:outline-none focus:ring-4 focus:ring-pink-500/10"
				>
					<option value="left">Left</option>
					<option value="center">Center</option>
					<option value="right">Right</option>
				</select>
			</div>
			<div>
				<label className="mb-2 block text-sm font-bold text-gray-700">Bottom Spacing</label>
				<input
					type="text"
					value={editedBlock.styles.marginBottom || ""}
					onChange={(e) => updateStyle("marginBottom", e.target.value)}
					className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-pink-300 focus:outline-none focus:ring-4 focus:ring-pink-500/10"
					placeholder="20px"
				/>
			</div>
		</div>
	);

	const renderContentEditor = () => {
		switch (block.type) {
			case "heading":
			case "text":
				return (
					<div className="space-y-4">
						<div>
							<label className="mb-2 block text-sm font-bold text-gray-700">Text Content</label>
							<textarea
								value={editedBlock.content.text || ""}
								onChange={(e) => updateContent("text", e.target.value)}
								rows={block.type === "heading" ? 2 : 4}
								className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-pink-300 focus:outline-none focus:ring-4 focus:ring-pink-500/10"
								placeholder="Enter your text here..."
							/>
							<p className="text-xs text-gray-500 mt-1">
								You can use tokens like {`{{firstName}}`}, {`{{matchCount}}`}, etc.
							</p>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div>
								<label className="mb-2 block text-sm font-bold text-gray-700">Font Size</label>
								<input
									type="text"
									value={editedBlock.styles.fontSize || ""}
									onChange={(e) => updateStyle("fontSize", e.target.value)}
									className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-pink-300 focus:outline-none focus:ring-4 focus:ring-pink-500/10"
									placeholder="16px"
								/>
							</div>
							<div>
								<label className="mb-2 block text-sm font-bold text-gray-700">Color</label>
								<div className="flex items-center rounded-md border gap-1 justify-end flex-1 w-full">
									<input
										type="color"
										value={editedBlock.styles.color || "#161616"}
										onChange={(e) => updateStyle("color", e.target.value)}
										className="h-8 p-0 ml-1 w-8 rounded-full bg-white"
									/>
									<span className="text-gray-700 text-xs border-none">
										<input
											type="text"
											value={editedBlock.styles.color || "#161616"}
											onChange={(e) => updateStyle("color", e.target.value)}
											className="w-full rounded-md border-gray-200 bg-white px-2 py-2 text-sm text-gray-700 focus:border-pink-300 focus:outline-none focus:ring-4 focus:ring-pink-500/10"
											placeholder="Color"
										/>
									</span>
								</div>
							</div>
						</div>

						{renderSharedSpacingControls()}
					</div>
				);

			case "button":
				return (
					<div className="space-y-4">
						<div>
							<label className="mb-2 block text-sm font-bold text-gray-700">Button Text</label>
							<input
								type="text"
								value={editedBlock.content.text || ""}
								onChange={(e) => updateContent("text", e.target.value)}
								className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-pink-300 focus:outline-none focus:ring-4 focus:ring-pink-500/10"
								placeholder="Click Here"
							/>
						</div>

						<div>
							<label className="mb-2 block text-sm font-bold text-gray-700">Link URL</label>
							<input
								type="text"
								value={editedBlock.content.link || ""}
								onChange={(e) => updateContent("link", e.target.value)}
								className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-pink-300 focus:outline-none focus:ring-4 focus:ring-pink-500/10"
								placeholder="https://perfectmatch.ai or {{ctaLink}}"
							/>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div>
								<label className="mb-2 block text-sm font-bold text-gray-700">Background Color</label>
								<input
									type="color"
									value={editedBlock.styles.backgroundColor || "#FF328F"}
									onChange={(e) => updateStyle("backgroundColor", e.target.value)}
									className="h-10 w-full rounded-md border border-gray-200"
								/>
							</div>
							<div>
								<label className="mb-2 block text-sm font-bold text-gray-700">Text Color</label>
								<input
									type="color"
									value={editedBlock.styles.color || "#ffffff"}
									onChange={(e) => updateStyle("color", e.target.value)}
									className="h-10 w-full rounded-md border border-gray-200"
								/>
							</div>
						</div>

						{renderSharedSpacingControls()}
					</div>
				);

			case "image":
				return (
					<div className="space-y-4">
						<div>
							<label className="mb-2 block text-sm font-bold text-gray-700">Image URL</label>
							<input
								type="text"
								value={editedBlock.content.src || ""}
								onChange={(e) => updateContent("src", e.target.value)}
								className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-pink-300 focus:outline-none focus:ring-4 focus:ring-pink-500/10"
								placeholder="https://example.com/image.jpg"
							/>
						</div>

						<div>
							<label className="mb-2 block text-sm font-bold text-gray-700">Alt Text</label>
							<input
								type="text"
								value={editedBlock.content.alt || ""}
								onChange={(e) => updateContent("alt", e.target.value)}
								className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-pink-300 focus:outline-none focus:ring-4 focus:ring-pink-500/10"
								placeholder="Image description"
							/>
						</div>

						{renderSharedSpacingControls()}
					</div>
				);

			case "logo":
				return (
					<div className="space-y-4">
						<div>
							<label className="mb-2 block text-sm font-bold text-gray-700">Brand Text</label>
							<input
								type="text"
								value={editedBlock.content.text || ""}
								onChange={(e) => updateContent("text", e.target.value)}
								className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-pink-300 focus:outline-none focus:ring-4 focus:ring-pink-500/10"
								placeholder="Perfect Match"
							/>
						</div>

						<div>
							<label className="mb-2 block text-sm font-bold text-gray-700">Subtitle</label>
							<input
								type="text"
								value={editedBlock.content.subtitle || ""}
								onChange={(e) => updateContent("subtitle", e.target.value)}
								className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-pink-300 focus:outline-none focus:ring-4 focus:ring-pink-500/10"
								placeholder="Find your perfect match"
							/>
						</div>

						{renderSharedSpacingControls()}
					</div>
				);

			case "spacer":
				return (
					<div>
						<label className="mb-2 block text-sm font-bold text-gray-700">Height</label>
						<input
							type="text"
							value={editedBlock.content.height || ""}
							onChange={(e) => updateContent("height", e.target.value)}
							className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-pink-300 focus:outline-none focus:ring-4 focus:ring-pink-500/10"
							placeholder="20px"
						/>
					</div>
				);

			default:
				return <div>No editable properties for this block type.</div>;
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/60 p-4 backdrop-blur-sm">
			<div className="mx-4 w-full max-w-md rounded-2xl border border-white/10 bg-white shadow-2xl">
				<div className="flex items-center justify-between border-b border-gray-100 p-6">
					<h2 className="text-lg font-semibold text-gray-900">
						Edit {block.type.charAt(0).toUpperCase() + block.type.slice(1)} Block
					</h2>
					<button
						onClick={onClose}
						className="rounded-md p-2 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600"
					>
						<X className="h-5 w-5" />
					</button>
				</div>

				<div className="p-6">{renderContentEditor()}</div>

				<div className="flex justify-end gap-3 border-t border-gray-100 p-6">
					<button
						onClick={onClose}
						className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
					>
						Cancel
					</button>
					<button
						onClick={handleSave}
						className="rounded-md px-4 py-2 font-medium text-white transition-colors"
						style={{ backgroundColor: theme.colors.primary }}
					>
						Save Changes
					</button>
				</div>
			</div>
		</div>
	);
}
