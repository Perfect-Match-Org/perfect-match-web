import React, { useRef, useEffect } from "react";
import DOMPurify from "dompurify";

interface PreviewModalProps {
	isOpen: boolean;
	onClose: () => void;
	htmlContent: string;
	cssContent: string;
	templateName: string;
}

export default function PreviewModal({ isOpen, onClose, htmlContent, cssContent, templateName }: PreviewModalProps) {
	const previewRef = useRef<HTMLIFrameElement>(null);

	const generatePreviewHtml = () => {
		const combinedHtml = htmlContent.replace("</head>", `<style>${cssContent}</style></head>`);

		// Replace personalization tokens with sample data
		return combinedHtml
			.replace(/\{\{firstName\}\}/g, "John")
			.replace(/\{\{lastName\}\}/g, "Doe")
			.replace(/\{\{email\}\}/g, "john.doe@example.com")
			.replace(/\{\{matchCount\}\}/g, "3")
			.replace(/\{\{joinDate\}\}/g, "March 15, 2026")
			.replace(/\{\{subject\}\}/g, templateName)
			.replace(/\{\{ctaLink\}\}/g, "https://perfectmatch.ai")
			.replace(/\{\{unsubscribeLink\}\}/g, "https://perfectmatch.ai/unsubscribe");
	};

	const updatePreview = () => {
		if (previewRef.current) {
			const previewHtml = generatePreviewHtml();
			const sanitizedHtml = DOMPurify.sanitize(previewHtml);

			const previewDoc = previewRef.current.contentDocument;
			if (previewDoc) {
				previewDoc.open();
				previewDoc.write(sanitizedHtml);
				previewDoc.close();
			}
		}
	};

	useEffect(() => {
		if (isOpen) {
			updatePreview();
		}
	}, [isOpen, htmlContent, cssContent]);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			{/* Backdrop */}
			<div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />

			{/* Modal */}
			<div className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl h-5/6 mx-4">
				{/* Header */}
				<div className="flex items-center justify-between p-6 border-b">
					<h2 className="text-xl font-semibold text-gray-900">Preview: {templateName}</h2>
					<button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
						<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				{/* Preview Content */}
				<div className="p-6 h-full overflow-hidden">
					<div className="bg-gray-100 rounded-lg p-4 h-full">
						<iframe ref={previewRef} className="w-full h-full rounded border-0" title="Email Preview" />
					</div>
				</div>
			</div>
		</div>
	);
}
