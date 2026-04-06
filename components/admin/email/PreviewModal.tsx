import React, { useRef, useEffect, useCallback } from "react";
import DOMPurify from "dompurify";
import { X, Eye, Monitor, Smartphone, Tablet } from "lucide-react";

interface PreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    htmlContent: string;
    cssContent: string;
    templateName: string;
}

export default function PreviewModal({ isOpen, onClose, htmlContent, cssContent, templateName }: PreviewModalProps) {
    const previewRef = useRef<HTMLIFrameElement>(null);
    const [viewMode, setViewMode] = React.useState<'desktop' | 'tablet' | 'mobile'>('desktop');

    const generatePreviewHtml = useCallback(() => {
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
    }, [htmlContent, cssContent, templateName]);

    const updatePreview = useCallback(() => {
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
    }, [generatePreviewHtml]);

    useEffect(() => {
        if (isOpen) {
            updatePreview();
        }
    }, [isOpen, updatePreview]);

    if (!isOpen) return null;

    const getPreviewWidth = () => {
        switch (viewMode) {
            case 'mobile': return '375px';
            case 'tablet': return '768px';
            default: return '100%';
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose} />

            {/* Modal */}
            <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-5xl h-[85vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-300 border border-white/20">
                {/* Header */}
                <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-md bg-pink-100 flex items-center justify-center">
                            <Eye className="w-5 h-5 text-pink-600" />
                        </div>
                        <div>
                            <h2 className="text-lg font-black text-gray-900 leading-tight">Preview: {templateName}</h2>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-left block">Live Simulation</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-1.5 p-1 bg-white rounded-md border border-gray-100 shadow-sm">
                        {[
                            { id: 'desktop', icon: Monitor, label: 'Desktop' },
                            { id: 'tablet', icon: Tablet, label: 'Tablet' },
                            { id: 'mobile', icon: Smartphone, label: 'Mobile' }
                        ].map(mode => (
                            <button
                                key={mode.id}
                                onClick={() => setViewMode(mode.id as any)}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${viewMode === mode.id
                                    ? "bg-pink-600 text-white shadow-lg shadow-pink-200"
                                    : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                                    }`}
                            >
                                <mode.icon className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">{mode.label}</span>
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-900 hover:bg-white rounded-md transition-all shadow-sm border border-transparent hover:border-gray-100"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Preview Content */}
                <div className="flex-1 p-8 bg-gray-100/50 overflow-hidden flex flex-col items-center">
                    <div
                        className="bg-white rounded-md shadow-2xl overflow-hidden border border-gray-100 transition-all duration-500 flex-1 w-full"
                        style={{ maxWidth: getPreviewWidth() }}
                    >
                        <iframe ref={previewRef} className="w-full h-full border-0" title="Email Preview" />
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-100 bg-white text-center">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        Preview data is for simulation only. Real recipient data will be populated during delivery.
                    </p>
                </div>
            </div>
        </div>
    );
}
