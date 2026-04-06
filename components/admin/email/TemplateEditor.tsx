import React, { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import DOMPurify from "dompurify";

interface Template {
    id?: string;
    name: string;
    description: string;
    html_content: string;
    css_content: string;
    tags: string[];
}

interface TemplateEditorProps {
    template?: Template;
    onSave: (template: Template) => void;
    onCancel: () => void;
}

export default function TemplateEditor({ template, onSave, onCancel }: TemplateEditorProps) {
    const [templateData, setTemplateData] = useState<Template>({
        name: "",
        description: "",
        html_content: "",
        css_content: "",
        tags: [],
        ...template,
    });

    const [activeTab, setActiveTab] = useState<"html" | "css" | "preview">("html");
    const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);

    const previewRef = useRef<HTMLIFrameElement>(null);

    // Default HTML template with Perfect Match branding
    const defaultHtmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{subject}}</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Work Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background-color: #f3f3f3;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 40px;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .logo {
            font-family: 'Dela Gothic One', cursive;
            font-size: 24px;
            color: #FF328F;
            margin-bottom: 10px;
        }
        .content {
            line-height: 1.6;
            color: #161616;
        }
        .cta-button {
            display: inline-block;
            padding: 12px 30px;
            background-color: #FF328F;
            color: #ffffff;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            margin: 20px 0;
        }
        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e5e5e5;
            font-size: 12px;
            color: #666666;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <div class="logo">Perfect Match</div>
            <p>Find Your Perfect Match</p>
        </div>
        
        <div class="content">
            <h1>Hello {{firstName}}!</h1>
            
            <p>Welcome to Perfect Match! We're excited to help you find meaningful connections.</p>
            
            <p>Your journey to finding your perfect match starts here. Our algorithm has been designed to help you discover people who truly align with your interests and values.</p>
            
            <div style="text-align: center;">
                <a href="{{ctaLink}}" class="cta-button">Get Started</a>
            </div>
            
            <p>If you have any questions, feel free to reach out to our support team.</p>
            
            <p>Best regards,<br>The Perfect Match Team</p>
        </div>
        
        <div class="footer">
            <p>Perfect Match | <a href="{{unsubscribeLink}}">Unsubscribe</a></p>
            <p>© 2026 Perfect Match. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`;

    const defaultCssTemplate = `/* Additional CSS for advanced styling */

/* Responsive Design */
@media only screen and (max-width: 600px) {
    .email-container {
        padding: 20px !important;
    }
    
    .logo {
        font-size: 20px !important;
    }
    
    .cta-button {
        display: block !important;
        text-align: center !important;
        margin: 20px auto !important;
    }
}

/* Animation Effects */
.cta-button:hover {
    background-color: #E02B7A !important;
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(255, 50, 143, 0.3);
}

/* Custom Components */
.highlight-box {
    background: linear-gradient(135deg, #5A1A35 0%, #8B2D52 50%, #C44569 100%);
    color: white;
    padding: 20px;
    border-radius: 8px;
    margin: 20px 0;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 20px;
    margin: 20px 0;
}

.stat-item {
    text-align: center;
    padding: 15px;
    background-color: #f9f9f9;
    border-radius: 6px;
}

.stat-number {
    font-size: 24px;
    font-weight: bold;
    color: #FF328F;
    display: block;
}`;

    useEffect(() => {
        if (!template && !templateData.html_content) {
            setTemplateData((prev) => ({
                ...prev,
                html_content: defaultHtmlTemplate,
                css_content: defaultCssTemplate,
            }));
        }
    }, [template]);

    const validateTemplate = (): string[] => {
        const errors: string[] = [];

        if (!templateData.name.trim()) {
            errors.push("Template name is required");
        }

        if (!templateData.html_content.trim()) {
            errors.push("HTML content is required");
        }

        // Basic HTML validation
        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(templateData.html_content, "text/html");
            const parseErrors = doc.querySelectorAll("parsererror");
            if (parseErrors.length > 0) {
                errors.push("Invalid HTML syntax detected");
            }
        } catch (e) {
            errors.push("HTML parsing error");
        }

        return errors;
    };

    const handleSave = async () => {
        const validationErrors = validateTemplate();
        setErrors(validationErrors);

        if (validationErrors.length > 0) {
            return;
        }

        setSaving(true);
        try {
            await onSave(templateData);
        } catch (error) {
            setErrors(["Failed to save template. Please try again."]);
        } finally {
            setSaving(false);
        }
    };

    const generatePreviewHtml = () => {
        const combinedHtml = templateData.html_content.replace("</head>", `<style>${templateData.css_content}</style></head>`);

        // Replace personalization tokens with sample data
        return combinedHtml
            .replace(/\{\{firstName\}\}/g, "John")
            .replace(/\{\{lastName\}\}/g, "Doe")
            .replace(/\{\{subject\}\}/g, "Welcome to Perfect Match!")
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
        if (activeTab === "preview") {
            updatePreview();
        }
    }, [activeTab, templateData.html_content, templateData.css_content]);

    const getPreviewWidth = () => {
        switch (previewMode) {
            case "mobile":
                return "375px";
            case "tablet":
                return "768px";
            case "desktop":
                return "100%";
            default:
                return "100%";
        }
    };

    const insertPersonalizationToken = (token: string) => {
        // This would integrate with Monaco Editor to insert tokens at cursor position
        const newHtml = templateData.html_content + `{{${token}}}`;
        setTemplateData((prev) => ({ ...prev, html_content: newHtml }));
    };

    return (
        <div className="h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{template ? "Edit Template" : "Create New Template"}</h1>
                    <p className="text-gray-600">Design your email template with full HTML and CSS control</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="px-6 py-2 text-white rounded-lg font-medium transition-colors disabled:opacity-50 bg-[#FF328F] hover:bg-[#E02B7A]"
                    >
                        {saving ? "Saving..." : "Save Template"}
                    </button>
                </div>
            </div>

            {/* Template Info */}
            <div className="bg-white border-b px-6 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Template Name *</label>
                        <input
                            type="text"
                            value={templateData.name}
                            onChange={(e) => setTemplateData((prev) => ({ ...prev, name: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                            placeholder="e.g., Welcome Series 2026"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <input
                            type="text"
                            value={templateData.description}
                            onChange={(e) => setTemplateData((prev) => ({ ...prev, description: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                            placeholder="Brief description of this template"
                        />
                    </div>
                </div>

                {errors.length > 0 && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <ul className="text-sm text-red-600">
                            {errors.map((error, index) => (
                                <li key={index}>• {error}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Editor Tabs */}
            <div className="bg-white border-b">
                <div className="flex">
                    {(["html", "css", "preview"] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                                activeTab === tab ? "border-pink-500 text-pink-600" : "border-transparent text-gray-500 hover:text-gray-700"
                            }`}
                        >
                            {tab.toUpperCase()}
                        </button>
                    ))}

                    {activeTab === "preview" && (
                        <div className="ml-auto flex items-center gap-2 px-6">
                            <span className="text-sm text-gray-600">Preview:</span>
                            {(["desktop", "tablet", "mobile"] as const).map((mode) => (
                                <button
                                    key={mode}
                                    onClick={() => setPreviewMode(mode)}
                                    className={`px-3 py-1 text-xs rounded-full transition-colors ${
                                        previewMode === mode ? "bg-pink-100 text-pink-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                                >
                                    {mode}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Editor Content */}
            <div className="flex-1 flex">
                {activeTab === "html" && (
                    <div className="flex-1 flex">
                        <div className="flex-1">
                            <Editor
                                height="100%"
                                defaultLanguage="html"
                                value={templateData.html_content}
                                onChange={(value) => setTemplateData((prev) => ({ ...prev, html_content: value || "" }))}
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
                        <div className="w-64 bg-gray-50 border-l p-4">
                            <h3 className="font-medium text-gray-900 mb-3">Personalization Tokens</h3>
                            <div className="space-y-2">
                                {[
                                    { token: "firstName", label: "First Name" },
                                    { token: "lastName", label: "Last Name" },
                                    { token: "email", label: "Email Address" },
                                    { token: "matchCount", label: "Match Count" },
                                    { token: "joinDate", label: "Join Date" },
                                    { token: "ctaLink", label: "CTA Link" },
                                    { token: "unsubscribeLink", label: "Unsubscribe Link" },
                                ].map((item) => (
                                    <button
                                        key={item.token}
                                        onClick={() => insertPersonalizationToken(item.token)}
                                        className="w-full text-left px-3 py-2 text-sm bg-white border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="font-medium">{item.label}</div>
                                        <div className="text-gray-500 text-xs">{"{{" + item.token + "}}"}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "css" && (
                    <div className="flex-1">
                        <Editor
                            height="100%"
                            defaultLanguage="css"
                            value={templateData.css_content}
                            onChange={(value) => setTemplateData((prev) => ({ ...prev, css_content: value || "" }))}
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
                )}

                {activeTab === "preview" && (
                    <div className="flex-1 bg-gray-100 p-4">
                        <div className="mx-auto bg-white rounded-lg shadow-sm overflow-hidden" style={{ width: getPreviewWidth() }}>
                            <iframe
                                ref={previewRef}
                                className="w-full h-full min-h-96"
                                style={{ height: "calc(100vh - 300px)" }}
                                title="Email Preview"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
