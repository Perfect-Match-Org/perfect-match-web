import React, { useState, useEffect, useCallback } from "react";
import { theme } from "@/styles/themes";
import { Template } from "@/types/email";
import {
    Plus,
    Search,
    Filter,
    MoreVertical,
    Edit2,
    Trash2,
    Copy,
    Eye,
    Mail,
    Calendar,
    Tag,
    AlertCircle,
    PlusCircle,
    Inbox,
    NotebookPen,
} from "lucide-react";
import PreviewModal from "./PreviewModal";

interface TemplateListProps {
    onEditTemplate: (template: Template) => void;
    onCreateTemplate: () => void;
}

export default function TemplateList({ onEditTemplate, onCreateTemplate }: TemplateListProps) {
    const [templates, setTemplates] = useState<Template[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState<string>("");
    
    // Filtering state
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [selectedYear, setSelectedYear] = useState<string>("");
    
    // Preview modal state
    const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
    const [allTags, setAllTags] = useState<string[]>([
        "notification", "reminder", "release", 
        "auth", "crush", "survey", "matches", "announcement"
    ]);

    const fetchTemplates = useCallback(async (search: string, tags: string[], year: string) => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            params.append("limit", "100"); // Fetch more to avoid pagination for now
            if (search) params.append("search", search);
            if (year) params.append("year", year);
            tags.forEach(tag => params.append("tags", tag));
            
            const response = await fetch(`/api/admin/email/templates?${params.toString()}`);
            const data = await response.json();

            if (response.ok) {
                setTemplates(data.templates);
                
                // Extract unique tags from fetched templates to update our filter list dynamically
                const extractedTags = new Set<string>();
                data.templates.forEach((t: Template) => {
                    t.tags?.forEach(tag => extractedTags.add(tag));
                });
                
                if (extractedTags.size > 0) {
                    setAllTags(prev => {
                        const combined = new Set([...prev, ...Array.from(extractedTags)]);
                        return Array.from(combined).sort();
                    });
                }
            } else {
                console.error("Failed to fetch templates:", data.error);
            }
        } catch (error) {
            console.error("Network error fetching templates:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        // Debounce search
        const timeoutId = setTimeout(() => {
            fetchTemplates(searchQuery, selectedTags, selectedYear);
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [searchQuery, selectedTags, selectedYear, fetchTemplates]);

    const handleDeleteTemplate = useCallback(async (templateId: string) => {
        if (!confirm("Are you sure you want to delete this template?")) {
            return;
        }

        try {
            setDeleting(templateId);
            const response = await fetch(`/api/admin/email/templates/${templateId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setTemplates((prev) => prev.filter((t) => t._id !== templateId));
            } else {
                const error = await response.json();
                alert(`Failed to delete template: ${error.error}`);
            }
        } catch (error) {
            alert(`Network error: ${error}`);
        } finally {
            setDeleting("");
        }
    }, []);

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: theme.fonts.heading }}>
                            Email Templates
                        </h1>
                        <p className="text-gray-600">Design and manage reusable email layouts</p>
                    </div>

                    <button
                        onClick={onCreateTemplate}
                        className="inline-flex items-center px-5 py-2.5 rounded-lg text-white font-medium transition-all duration-200 hover:shadow-lg"
                        style={{
                            backgroundColor: theme.colors.primary,
                            fontFamily: theme.fonts.main,
                        }}
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Create New Template
                    </button>
                </div>

                {/* Filters */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-8 flex flex-col md:flex-row gap-4">
                    <div className="flex flex-1 gap-2">
                        <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search templates..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="block w-full pl-10 pr-3 bg-white text-gray-900 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 text-sm"
                            />
                        </div>
                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            className="block w-32 text-gray-900 px-3 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 text-sm bg-white"
                        >
                            <option value="">All Years</option>
                            <option value="2026">2026</option>
                            <option value="2025">2025</option>
                        </select>
                    </div>
                    
                    <div className="flex-1 overflow-x-auto pb-2 md:pb-0">
                        <div className="flex gap-2 min-w-max">
                            <div className="flex items-center text-gray-500 text-sm mr-2 font-medium">
                                <Filter className="w-4 h-4 mr-1" />
                                Tags:
                            </div>
                            {allTags.map(tag => (
                                <button
                                    key={tag}
                                    onClick={() => {
                                        setSelectedTags(prev => 
                                            prev.includes(tag) 
                                                ? prev.filter(t => t !== tag)
                                                : [...prev, tag]
                                        );
                                    }}
                                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                                        selectedTags.includes(tag)
                                            ? "bg-pink-100 text-pink-700 border-pink-200 border"
                                            : "bg-gray-100 text-gray-600 hover:bg-gray-200 border-transparent border"
                                    }`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Templates Grid Area */}
                <div className="relative min-h-[400px]">
                    {loading && (
                        <div className="absolute inset-0 bg-gray-50/60 backdrop-blur-sm z-10 flex items-center justify-center transition-all duration-300">
                            <div className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                                <div className="w-10 h-10 border-4 border-pink-100 border-t-pink-500 rounded-full animate-spin mb-4" />
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Loading Templates...</span>
                            </div>
                        </div>
                    )}

                    <div className={`transition-opacity duration-300 ${loading && templates.length === 0 ? "opacity-0" : "opacity-100"}`}>
                        {templates.length === 0 && !loading ? (
                            <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-300">
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Inbox className="w-10 h-10 text-gray-300" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">No templates found</h3>
                                <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                                    Get started by creating your first reusable email template or choose from our gallery.
                                </p>
                                <button
                                    onClick={onCreateTemplate}
                                    className="inline-flex items-center px-6 py-3 text-white rounded-lg font-medium transition-all hover:shadow-md"
                                    style={{ backgroundColor: theme.colors.primary }}
                                >
                                    <PlusCircle className="w-5 h-5 mr-2" />
                                    Create Your First Template
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {templates.map((template) => (
                                    <div
                                        key={template._id}
                                        className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group"
                                    >
                                        {/* Template Thumbnail */}
                                        <div className="h-48 bg-gray-50 flex items-center justify-center relative overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-blue-500/5 group-hover:opacity-100 transition-opacity" />
                                            {template.thumbnail ? (
                                                <img
                                                    src={template.thumbnail}
                                                    alt={template.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="text-center p-6 flex flex-col items-center">
                                                    <div className="w-16 h-16 rounded-xl bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                                        <span className="text-2xl font-bold text-pink-600">
                                                            <NotebookPen className="w-10 h-10" />
                                                        </span>
                                                    </div>
                                                    <div className="text-xs font-medium text-gray-400 uppercase tracking-widest group-hover:text-pink-500 transition-colors">
                                                        Preview
                                                    </div>
                                                </div>
                                            )}

                                            {/* Hover Overlay */}
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <button
                                                    onClick={() => onEditTemplate(template)}
                                                    className="p-3 bg-white rounded-full text-gray-900 hover:bg-pink-500 hover:text-white transition-colors"
                                                    title="Edit Template"
                                                >
                                                    <Edit2 className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => setPreviewTemplate(template)}
                                                    className="p-3 bg-white rounded-full text-gray-900 hover:bg-pink-500 hover:text-white transition-colors"
                                                    title="Preview Template"
                                                >
                                                    <Eye className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Template Info */}
                                        <div className="p-5">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-bold text-gray-900 truncate flex-1 group-hover:text-pink-600 transition-colors">
                                                    {template.name}
                                                </h3>
                                            </div>
                                            <p className="text-sm text-gray-500 mb-4 line-clamp-2 min-h-[40px]">
                                                {template.description || "No description provided for this template."}
                                            </p>
                                            
                                            {(template.year || (template.tags && template.tags.length > 0)) && (
                                                <div className="flex flex-wrap gap-1.5 mb-4">
                                                    {template.year && (
                                                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 border border-blue-200 rounded text-[10px] font-medium uppercase tracking-wider">
                                                            {template.year}
                                                        </span>
                                                    )}
                                                    {template.tags?.slice(0, 3).map((tag, idx) => (
                                                        <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px] font-medium uppercase tracking-wider">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                    {template.tags && template.tags.length > 3 && (
                                                        <span className="px-2 py-0.5 bg-gray-50 text-gray-400 rounded text-[10px] font-medium uppercase tracking-wider">
                                                            +{template.tags.length - 3}
                                                        </span>
                                                    )}
                                                </div>
                                            )}

                                            {/* Actions & Meta */}
                                            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                                <div className="flex items-center text-xs text-gray-400">
                                                    <Calendar className="w-3.5 h-3.5 mr-1" />
                                                    {template.created_at
                                                        ? new Date(template.created_at).toLocaleDateString("en-US", {
                                                              month: "short",
                                                              day: "numeric",
                                                          })
                                                        : "Recently"}
                                                </div>

                                                <div className="flex gap-1">
                                                    <button
                                                        onClick={() => onEditTemplate(template)}
                                                        className="p-2 text-gray-500 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-all"
                                                        title="Edit"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteTemplate(template._id!)}
                                                        disabled={deleting === template._id}
                                                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50"
                                                        title="Delete"
                                                    >
                                                        {deleting === template._id ? (
                                                            <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                                                        ) : (
                                                            <Trash2 className="w-4 h-4" />
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Preview Modal */}
            {previewTemplate && (
                <PreviewModal
                    isOpen={!!previewTemplate}
                    onClose={() => setPreviewTemplate(null)}
                    htmlContent={previewTemplate.html_content}
                    cssContent={previewTemplate.css_content || ""}
                    templateName={previewTemplate.name}
                />
            )}
        </div>
    );
}
