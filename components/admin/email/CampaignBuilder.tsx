import React, { useState, useEffect, useCallback, useMemo } from "react";
import { theme } from "@/styles/themes";
import { Template, Campaign, FilterCriteria } from "@/types/email";
import UserSelector from "./UserSelector";
import {
    ChevronRight,
    ChevronLeft,
    Check,
    Calendar,
    Clock,
    Send,
    Users,
    FileText,
    X,
    Info,
    AlertCircle,
    Layout,
    ArrowUpRight,
} from "lucide-react";

// Using shared types from @/types/email

interface CampaignBuilderProps {
    campaign?: Campaign;
    onSave: (campaign: Campaign, action: string) => void;
    onCancel: () => void;
}

export default function CampaignBuilder({ campaign, onSave, onCancel }: CampaignBuilderProps) {
    const [campaignData, setCampaignData] = useState<Campaign>({
        name: "",
        description: "",
        template_id: "",
        user_filters: {
            year: "2025",
            natural_query: "",
            filters: {},
        },
        campaign_type: "bulk",
        status: "draft",
        ...campaign,
    });

    const [templates, setTemplates] = useState<Template[]>([]);
    const [selectedUsers, setSelectedUsers] = useState({
        count: 0,
        criteria: {
            year: "2025",
            natural_query: "",
            filters: {},
        } as FilterCriteria,
    });
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);

    const fetchTemplates = useCallback(async () => {
        try {
            const response = await fetch("/api/admin/email/templates");
            const data = await response.json();

            if (response.ok) {
                setTemplates(data.templates);
            }
        } catch (error) {
            console.error("Failed to fetch templates:", error);
        }
    }, []);

    useEffect(() => {
        fetchTemplates();
    }, [fetchTemplates]);

    const validateStep = useCallback(
        (step: number): string[] => {
            const errors: string[] = [];

            switch (step) {
                case 1:
                    if (!campaignData.name.trim()) {
                        errors.push("Campaign name is required");
                    }
                    if (!campaignData.template_id) {
                        errors.push("Please select a template");
                    }
                    break;
                case 2:
                    if (selectedUsers.count === 0) {
                        errors.push("Please select target users");
                    }
                    break;
                case 3:
                    // Schedule validation if needed
                    break;
            }

            return errors;
        },
        [campaignData.name, campaignData.template_id, selectedUsers.count],
    );

    const handleNext = useCallback(() => {
        const stepErrors = validateStep(currentStep);
        setErrors(stepErrors);

        if (stepErrors.length === 0) {
            setCurrentStep((prev) => Math.min(prev + 1, 3));
        }
    }, [currentStep, validateStep]);

    const handlePrevious = useCallback(() => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    }, []);

    const handleSave = useCallback(async () => {
        const allErrors = validateStep(1).concat(validateStep(2)).concat(validateStep(3));
        setErrors(allErrors);

        if (allErrors.length > 0) {
            return;
        }

        setLoading(true);
        try {
            const finalCampaign = {
                ...campaignData,
                user_filters: selectedUsers.criteria,
            };
            const action = campaignData.status === "draft" ? "draft" : campaignData.status === "scheduled" ? "schedule" : "send";
            onSave(finalCampaign, action);
        } catch (error) {
            setErrors(["Failed to save campaign. Please try again."]);
        } finally {
            setLoading(false);
        }
    }, [validateStep, campaignData, selectedUsers.criteria, onSave]);

    const handleUserSelection = useCallback((criteria: FilterCriteria, count: number) => {
        setSelectedUsers({ criteria, count });
    }, []);

    const selectedTemplate = useMemo(() => {
        return templates.find((t) => t._id === campaignData.template_id);
    }, [templates, campaignData.template_id]);

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-gray-900" style={{ fontFamily: theme.fonts.main }}>
                            Campaign Details
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Name *</label>
                                <input
                                    type="text"
                                    value={campaignData.name}
                                    onChange={(e) => setCampaignData((prev) => ({ ...prev, name: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:bg-white focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 text-sm font-bold text-gray-700 transition-all"
                                    placeholder="e.g., Welcome Series March 2026"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Type</label>
                                <select
                                    value={campaignData.campaign_type}
                                    onChange={(e) => setCampaignData((prev) => ({ ...prev, campaign_type: e.target.value as any }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:bg-white focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 text-sm font-bold text-gray-700 transition-all"
                                >
                                    <option value="bulk">Bulk Campaign</option>
                                    <option value="personalized">Personalized Campaign</option>
                                    <option value="ab_test">A/B Test Campaign</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea
                                value={campaignData.description}
                                onChange={(e) => setCampaignData((prev) => ({ ...prev, description: e.target.value }))}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:bg-white focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 text-sm font-bold text-gray-700 transition-all"
                                placeholder="Brief description of this campaign"
                            />
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">
                                    Select Email Template *
                                </label>
                                <span className="text-xs text-gray-400 font-medium">Choose a design for your message</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {templates.map((template) => (
                                    <div
                                        key={template._id}
                                        onClick={() => setCampaignData((prev) => ({ ...prev, template_id: template._id }))}
                                        className={`group relative border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                                            campaignData.template_id === template._id
                                                ? "border-pink-500 bg-pink-50/50 shadow-lg shadow-pink-100"
                                                : "border-gray-100 bg-white hover:border-gray-300 hover:shadow-md"
                                        }`}
                                    >
                                        {campaignData.template_id === template._id && (
                                            <div className="absolute -top-3 -right-3 bg-pink-500 text-white p-1.5 rounded-full shadow-lg z-20">
                                                <Check className="w-4 h-4 stroke-[3]" />
                                            </div>
                                        )}

                                        <div className="h-40 bg-gray-100 rounded-lg mb-4 overflow-hidden relative">
                                            {template.thumbnail ? (
                                                <img
                                                    src={template.thumbnail}
                                                    alt={template.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <Layout className="w-10 h-10 text-gray-200" />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                                        </div>

                                        <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">{template.name}</h3>
                                        <p className="text-xs text-gray-500 mb-3 line-clamp-2 h-8 leading-relaxed">
                                            {template.description || "No description provided."}
                                        </p>
                                        <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center">
                                                <Calendar className="w-3 h-3 mr-1" />
                                                {template.created_at ? new Date(template.created_at).toLocaleDateString() : "Just now"}
                                            </span>
                                            {campaignData.template_id === template._id && (
                                                <span className="text-[10px] font-bold text-pink-500 uppercase tracking-widest">
                                                    Active
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: theme.fonts.main }}>
                                Select Target Audience
                            </h2>
                            <div className="flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold border border-blue-100">
                                <Info className="w-3.5 h-3.5 mr-1.5" />
                                AI-powered segmentation
                            </div>
                        </div>

                        <div className="bg-amber-50/50 border border-amber-100 rounded-lg p-4 mb-6 flex items-start">
                            <AlertCircle className="w-5 h-5 text-amber-500 mr-3 shrink-0 mt-0.5" />
                            <p className="text-sm text-amber-800 leading-relaxed font-medium">
                                AI filters are automatically converted into the manual criteria shown below. You can fine-tune any
                                AI-generated segments manually before proceeding.
                            </p>
                        </div>

                        {/* UserSelector Component */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <UserSelector onSelectionChange={handleUserSelection} initialCriteria={campaignData.user_filters} />
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="space-y-8 animate-in fade-in duration-500">
                        <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: theme.fonts.main }}>
                            Final Review & Schedule
                        </h2>

                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                            <div className="p-5 border-b bg-gray-50/50 flex items-center">
                                <FileText className="w-5 h-5 text-pink-500 mr-2" />
                                <h3 className="font-bold text-gray-900">Campaign Summary</h3>
                            </div>

                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center">
                                                <Info className="w-3 h-3 mr-1" />
                                                Core Details
                                            </h4>
                                            <div className="grid grid-cols-[100px_1fr] gap-x-6 gap-y-4 text-sm">
                                                <div className="text-gray-500 font-medium">Name</div>
                                                <div className="text-gray-900 font-bold">{campaignData.name}</div>

                                                <div className="text-gray-500 font-medium">Type</div>
                                                <div className="text-gray-900 font-bold capitalize">
                                                    {campaignData.campaign_type.replace("_", " ")}
                                                </div>

                                                <div className="text-gray-500 font-medium">Template</div>
                                                <div className="text-pink-600 font-bold flex items-center">
                                                    {selectedTemplate?.name}
                                                    <ArrowUpRight className="w-3 h-3 ml-1" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center">
                                                <Users className="w-3 h-3 mr-1" />
                                                Audience & Delivery
                                            </h4>
                                            <div className="grid grid-cols-[100px_1fr] gap-x-6 gap-y-4 text-sm">
                                                <div className="text-gray-500 font-medium">Recipients</div>
                                                <div className="text-emerald-600 font-bold flex items-center">
                                                    {selectedUsers.count.toLocaleString()}
                                                    <span className="text-[10px] text-gray-400 ml-2 font-medium">Total users</span>
                                                </div>

                                                <div className="text-gray-500 font-medium">Cost Est.</div>
                                                <div className="text-gray-900 font-bold">${(selectedUsers.count * 0.001).toFixed(2)}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                            <div className="p-5 border-b bg-gray-50/50 flex items-center">
                                <Clock className="w-5 h-5 text-pink-500 mr-2" />
                                <h3 className="font-bold text-gray-900">Delivery Schedule</h3>
                            </div>

                            <div className="p-6 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <label
                                        className={`relative flex flex-col p-4 border-2 rounded-lg cursor-pointer transition-all ${!campaignData.scheduled_at && campaignData.status === "sending" ? "border-pink-500 bg-pink-50/50" : "border-gray-100 hover:border-gray-200"}`}
                                    >
                                        <input
                                            type="radio"
                                            name="send"
                                            disabled={loading || !campaign}
                                            className="absolute top-4 right-4 text-pink-500 focus:ring-pink-500"
                                            checked={!campaignData.scheduled_at && campaignData.status === "sending"}
                                            onChange={() =>
                                                setCampaignData((prev) => ({ ...prev, status: "sending", scheduled_at: undefined }))
                                            }
                                        />
                                        <Send
                                            className={`w-6 h-6 mb-3 ${!campaignData.scheduled_at && campaignData.status === "sending" ? "text-pink-500" : "text-gray-400"}`}
                                        />
                                        <span className="font-bold text-gray-900 text-sm">Send Now</span>
                                        <span className="text-[11px] text-gray-500 mt-1 leading-relaxed">
                                            Start delivery immediately after saving {" "}
                                            {!campaign ? 
                                            <span className="text-[11px] text-gray-250 font-bold leading-relaxed">
                                            (Can't send the campaign without saving first)
                                            </span>
                                            : ""}
                                        </span>
                                    </label>

                                    <label
                                        className={`relative flex flex-col p-4 border-2 rounded-lg cursor-pointer transition-all ${campaignData.scheduled_at ? "border-pink-500 bg-pink-50/50" : "border-gray-100 hover:border-gray-200"}`}
                                    >
                                        <input
                                            type="radio"
                                            name="scheduling"
                                            disabled={loading || !campaign}
                                            className="absolute top-4 right-4 text-pink-500 focus:ring-pink-500"
                                            checked={!!campaignData.scheduled_at}
                                            onChange={() =>
                                                setCampaignData((prev) => ({
                                                    ...prev,
                                                    status: "scheduled",
                                                    scheduled_at: new Date().toISOString(),
                                                }))
                                            }
                                        />
                                        <Calendar
                                            className={`w-6 h-6 mb-3 ${campaignData.scheduled_at ? "text-pink-500" : "text-gray-400"}`}
                                        />
                                        <span className="font-bold text-gray-900 text-sm">Schedule Later</span>
                                        <span className="text-[11px] text-gray-500 mt-1 leading-relaxed">
                                            Pick a specific date and time for delivery {" "}
                                            {!campaign ? 
                                            <span className="text-[11px] text-gray-250 font-bold leading-relaxed">
                                            (Can't schedule the campaign without saving first)
                                            </span>
                                            : ""}

                                        </span>
                                    </label>

                                    <label
                                        className={`relative flex flex-col p-4 border-2 rounded-lg cursor-pointer transition-all ${campaignData.status === "draft" ? "border-pink-500 bg-pink-50/50" : "border-gray-100 hover:border-gray-200"}`}
                                    >
                                        <input
                                            type="radio"
                                            name="save_draft"
                                            className="absolute top-4 right-4 text-pink-500 focus:ring-pink-500"
                                            checked={campaignData.status === "draft"}
                                            onChange={() =>
                                                setCampaignData((prev) => ({ ...prev, status: "draft", scheduled_at: undefined }))
                                            }
                                        />
                                        <FileText
                                            className={`w-6 h-6 mb-3 ${campaignData.status === "draft" ? "text-pink-500" : "text-gray-400"}`}
                                        />
                                        <span className="font-bold text-gray-900 text-sm">Save Draft</span>
                                        <span className="text-[11px] text-gray-500 mt-1 leading-relaxed">
                                            Save progress without sending
                                        </span>
                                    </label>
                                </div>

                                {campaignData.scheduled_at && (
                                    <div className="pt-6 border-t border-gray-100 animate-in slide-in-from-top-4 duration-300">
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                                            Delivery Date & Time
                                        </label>
                                        <div className="relative max-w-[280px]">
                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                            <input
                                                type="datetime-local"
                                                value={campaignData.scheduled_at.split(".")[0]}
                                                onChange={(e) => setCampaignData((prev) => ({ ...prev, scheduled_at: e.target.value }))}
                                                className="w-full pl-10 bg-white pr-4 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 text-sm font-bold text-gray-700 transition-all"
                                            />
                                        </div>
                                        <p className="mt-3 text-[11px] text-gray-500 flex items-center">
                                            <Info className="w-3 h-3 mr-1 text-blue-500" />
                                            System will automatically begin sending at this time.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b px-6 py-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: theme.fonts.heading }}>
                            {campaign ? "Edit Campaign" : "Create New Campaign"}
                        </h1>
                        <p className="text-gray-600">Build and configure your email marketing campaign</p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={onCancel}
                            className="inline-flex items-center px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-semibold"
                        >
                            <X className="w-4 h-4 mr-2" />
                            Cancel
                        </button>

                        {currentStep === 3 ? (
                            <button
                                onClick={handleSave}
                                disabled={loading}
                                className="inline-flex items-center px-6 py-2 text-white rounded-lg font-bold transition-all disabled:opacity-50 hover:shadow-lg shadow-pink-200 active:scale-95"
                                style={{ backgroundColor: theme.colors.primary }}
                            >
                                {loading ? "Saving..." : "Save Campaign"}
                                <Send className="w-4 h-4 ml-2" />
                            </button>
                        ) : (
                            <button
                                onClick={handleNext}
                                className="inline-flex items-center px-6 py-2 text-white rounded-lg font-bold transition-all hover:shadow-lg shadow-pink-200 active:scale-95"
                                style={{ backgroundColor: theme.colors.primary }}
                            >
                                Next Step
                                <ChevronRight className="w-4 h-4 ml-2" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Progress Steps */}
                <div className="my-10 max-w-4xl mx-auto px-4">
                    <div className="relative flex items-center justify-between">
                        {/* Connecting Line */}
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2" />
                        <div
                            className="absolute top-1/2 left-0 h-0.5 bg-pink-500 -translate-y-1/2 transition-all duration-500 ease-in-out"
                            style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
                        />

                        {[1, 2, 3].map((step) => {
                            const isCompleted = step < currentStep;
                            const isActive = step === currentStep;

                            return (
                                <div key={step} className="relative z-10 flex flex-col items-center">
                                    <div
                                        className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                                            isCompleted
                                                ? "bg-pink-500 border-pink-500 text-white shadow-lg shadow-pink-200"
                                                : isActive
                                                  ? "bg-white border-pink-500 text-pink-500 shadow-md ring-4 ring-pink-50"
                                                  : "bg-white border-gray-200 text-gray-400"
                                        }`}
                                    >
                                        {isCompleted ? <Check className="w-5 h-5 stroke-[3]" /> : step}
                                    </div>
                                    <div
                                        className={`absolute -bottom-7 whitespace-nowrap text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${
                                            isActive ? "text-pink-600" : "text-gray-400"
                                        }`}
                                    >
                                        {step === 1 ? "Campaign Details" : step === 2 ? "Target Users" : "Review & Schedule"}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto p-6">
                {errors.length > 0 && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <ul className="text-sm text-red-600">
                            {errors.map((error, index) => (
                                <li key={index}>• {error}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {renderStepContent()}

                {/* Navigation */}
                <div className="mt-8 flex justify-between items-center bg-white p-4 border border-gray-200 rounded-lg shadow-sm">
                    {currentStep > 1 ? (
                        <button
                            onClick={handlePrevious}
                            className="inline-flex items-center px-5 py-2.5 text-gray-700 font-bold border border-gray-200 rounded-lg hover:bg-gray-50 transition-all active:scale-95"
                        >
                            <ChevronLeft className="w-5 h-5 mr-1" />
                            Previous Step
                        </button>
                    ) : (
                        <div />
                    )}

                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Step {currentStep} of 3</div>

                    {currentStep < 3 ? (
                        <button
                            onClick={handleNext}
                            className="inline-flex items-center px-6 py-2.5 text-white rounded-lg font-bold transition-all shadow-md shadow-pink-100 hover:shadow-lg active:scale-95"
                            style={{ backgroundColor: theme.colors.primary }}
                        >
                            Continue
                            <ChevronRight className="w-5 h-5 ml-1" />
                        </button>
                    ) : (
                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className="inline-flex items-center px-8 py-2.5 text-white rounded-lg font-bold transition-all shadow-md shadow-pink-100 hover:shadow-xl active:scale-95 disabled:opacity-50"
                            style={{ backgroundColor: theme.colors.primary }}
                        >
                            {loading ? "Finalizing..." : "Launch Campaign"}
                            <Send className="w-5 h-5 ml-2" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
