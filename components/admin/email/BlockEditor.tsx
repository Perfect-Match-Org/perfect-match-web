// components/admin/email/BlockEditor.tsx
import React, { useState } from "react";
import { theme } from "@/styles/themes";

interface Block {
    id: string;
    type: "text" | "heading" | "image" | "button" | "divider" | "spacer" | "logo";
    content: any;
    styles: any;
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

    const renderContentEditor = () => {
        switch (block.type) {
            case "heading":
            case "text":
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Text Content</label>
                            <textarea
                                value={editedBlock.content.text}
                                onChange={(e) => updateContent("text", e.target.value)}
                                rows={block.type === "heading" ? 2 : 4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                                placeholder="Enter your text here..."
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                You can use tokens like {`{{firstName}}`}, {`{{matchCount}}`}, etc.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Font Size</label>
                                <input
                                    type="text"
                                    value={editedBlock.styles.fontSize || ""}
                                    onChange={(e) => updateStyle("fontSize", e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                                    placeholder="16px"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                                <input
                                    type="color"
                                    value={editedBlock.styles.color || "#161616"}
                                    onChange={(e) => updateStyle("color", e.target.value)}
                                    className="w-full h-10 border border-gray-300 rounded-lg"
                                />
                            </div>
                        </div>
                    </div>
                );

            case "button":
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
                            <input
                                type="text"
                                value={editedBlock.content.text}
                                onChange={(e) => updateContent("text", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                                placeholder="Click Here"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Link URL</label>
                            <input
                                type="text"
                                value={editedBlock.content.link}
                                onChange={(e) => updateContent("link", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                                placeholder="https://perfectmatch.ai or {{ctaLink}}"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
                                <input
                                    type="color"
                                    value={editedBlock.styles.backgroundColor || "#FF328F"}
                                    onChange={(e) => updateStyle("backgroundColor", e.target.value)}
                                    className="w-full h-10 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Text Color</label>
                                <input
                                    type="color"
                                    value={editedBlock.styles.color || "#ffffff"}
                                    onChange={(e) => updateStyle("color", e.target.value)}
                                    className="w-full h-10 border border-gray-300 rounded-lg"
                                />
                            </div>
                        </div>
                    </div>
                );

            case "image":
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                            <input
                                type="text"
                                value={editedBlock.content.src}
                                onChange={(e) => updateContent("src", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Alt Text</label>
                            <input
                                type="text"
                                value={editedBlock.content.alt}
                                onChange={(e) => updateContent("alt", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                                placeholder="Image description"
                            />
                        </div>
                    </div>
                );

            case "spacer":
                return (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Height</label>
                        <input
                            type="text"
                            value={editedBlock.content.height}
                            onChange={(e) => updateContent("height", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                            placeholder="20px"
                        />
                    </div>
                );

            default:
                return <div>No editable properties for this block type.</div>;
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Edit {block.type.charAt(0).toUpperCase() + block.type.slice(1)} Block
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-6">{renderContentEditor()}</div>

                <div className="flex justify-end gap-3 p-6 border-t">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 text-white rounded-lg font-medium transition-colors"
                        style={{ backgroundColor: theme.colors.primary }}
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
