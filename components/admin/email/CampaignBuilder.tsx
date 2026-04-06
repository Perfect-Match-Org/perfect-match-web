import React, { useState, useEffect } from "react";
import { theme } from "@/styles/themes";
import { Template, Campaign, FilterCriteria } from "@/types/email";
import UserSelector from "./UserSelector";

// Using shared types from @/types/email

interface CampaignBuilderProps {
    campaign?: Campaign;
    onSave: (campaign: Campaign) => void;
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
            filters: {}
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
            filters: {}
        } as FilterCriteria 
    });
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);

    useEffect(() => {
        fetchTemplates();
    }, []);

    const fetchTemplates = async () => {
        try {
            const response = await fetch("/api/admin/email/templates");
            const data = await response.json();

            if (response.ok) {
                setTemplates(data.templates);
            }
        } catch (error) {
            console.error("Failed to fetch templates:", error);
        }
    };

    const validateStep = (step: number): string[] => {
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
    };

    const handleNext = () => {
        const stepErrors = validateStep(currentStep);
        setErrors(stepErrors);

        if (stepErrors.length === 0) {
            setCurrentStep((prev) => Math.min(prev + 1, 3));
        }
    };

    const handlePrevious = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

    const handleSave = async () => {
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

            await onSave(finalCampaign);
        } catch (error) {
            setErrors(["Failed to save campaign. Please try again."]);
        } finally {
            setLoading(false);
        }
    };

    const handleUserSelection = (criteria: FilterCriteria, count: number) => {
        setSelectedUsers({ criteria, count });
    };

    const getSelectedTemplate = () => {
        return templates.find((t) => t._id === campaignData.template_id);
    };

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
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                    placeholder="e.g., Welcome Series March 2026"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Type</label>
                                <select
                                    value={campaignData.campaign_type}
                                    onChange={(e) => setCampaignData((prev) => ({ ...prev, campaign_type: e.target.value as any }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
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
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                placeholder="Brief description of this campaign"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Select Template *</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {templates.map((template) => (
                                    <div
                                        key={template._id}
                                        onClick={() => setCampaignData((prev) => ({ ...prev, template_id: template._id }))}
                                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                                            campaignData.template_id === template._id
                                                ? "border-pink-500 bg-pink-50"
                                                : "border-gray-200 hover:border-gray-300"
                                        }`}
                                    >
                                        {template.thumbnail && (
                                            <img
                                                src={template.thumbnail}
                                                alt={template.name}
                                                className="w-full h-32 object-cover rounded mb-3"
                                            />
                                        )}
                                        <h3 className="font-medium text-gray-900 mb-1">{template.name}</h3>
                                        <p className="text-sm text-gray-500 mb-2">{template.description}</p>
                                    <p className="text-xs text-gray-400">
                                        {template.created_at && `Created ${new Date(template.created_at).toLocaleDateString()}`}
                                    </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-gray-900" style={{ fontFamily: theme.fonts.main }}>
                            Select Target Users
                        </h2>

                        {/* UserSelector Component */}
                        <UserSelector
                            onSelectionChange={handleUserSelection}
                            initialCriteria={{
                                year: "2025",
                                natural_query: "",
                                filters: {}
                            }}
                        />
                    </div>
                );

            case 3:
                return (
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-gray-900" style={{ fontFamily: theme.fonts.main }}>
                            Schedule & Review
                        </h2>

                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h3 className="font-medium text-gray-900 mb-4">Campaign Summary</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">Campaign Details</h4>
                                    <dl className="space-y-1 text-sm">
                                        <div className="flex justify-between">
                                            <dt className="text-gray-500">Name:</dt>
                                            <dd className="text-gray-900">{campaignData.name}</dd>
                                        </div>
                                        <div className="flex justify-between">
                                            <dt className="text-gray-500">Type:</dt>
                                            <dd className="text-gray-900 capitalize">{campaignData.campaign_type.replace("_", " ")}</dd>
                                        </div>
                                        <div className="flex justify-between">
                                            <dt className="text-gray-500">Template:</dt>
                                            <dd className="text-gray-900">{getSelectedTemplate()?.name}</dd>
                                        </div>
                                    </dl>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">Target Audience</h4>
                                    <dl className="space-y-1 text-sm">
                                        <div className="flex justify-between">
                                            <dt className="text-gray-500">Recipients:</dt>
                                            <dd className="text-gray-900 font-medium">{selectedUsers.count.toLocaleString()}</dd>
                                        </div>
                                        <div className="flex justify-between">
                                            <dt className="text-gray-500">Estimated Cost:</dt>
                                            <dd className="text-gray-900">${(selectedUsers.count * 0.001).toFixed(2)}</dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h3 className="font-medium text-gray-900 mb-4">Scheduling Options</h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="flex items-center">
                                        <input type="radio" name="scheduling" value="immediate" className="mr-2" defaultChecked />
                                        <span className="text-sm text-gray-700">Send immediately after saving</span>
                                    </label>
                                </div>

                                <div>
                                    <label className="flex items-center">
                                        <input type="radio" name="scheduling" value="scheduled" className="mr-2" />
                                        <span className="text-sm text-gray-700">Schedule for later</span>
                                    </label>

                                    <div className="ml-6 mt-2">
                                        <input
                                            type="datetime-local"
                                            value={campaignData.scheduled_at || ""}
                                            onChange={(e) => setCampaignData((prev) => ({ ...prev, scheduled_at: e.target.value }))}
                                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="flex items-center">
                                        <input type="radio" name="scheduling" value="draft" className="mr-2" />
                                        <span className="text-sm text-gray-700">Save as draft (don't send yet)</span>
                                    </label>
                                </div>
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
                            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>

                        {currentStep === 3 ? (
                            <button
                                onClick={handleSave}
                                disabled={loading}
                                className="px-6 py-2 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                                style={{ backgroundColor: theme.colors.primary }}
                            >
                                {loading ? "Saving..." : "Save Campaign"}
                            </button>
                        ) : (
                            <button
                                onClick={handleNext}
                                className="px-6 py-2 text-white rounded-lg font-medium transition-colors"
                                style={{ backgroundColor: theme.colors.primary }}
                            >
                                Next Step
                            </button>
                        )}
                    </div>
                </div>

                {/* Progress Steps */}
                <div className="mt-6">
                    <div className="flex items-center">
                        {[1, 2, 3].map((step) => (
                            <React.Fragment key={step}>
                                <div
                                    className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                                        step <= currentStep ? "bg-pink-500 text-white" : "bg-gray-200 text-gray-500"
                                    }`}
                                >
                                    {step}
                                </div>

                                {step < 3 && <div className={`flex-1 h-1 mx-4 ${step < currentStep ? "bg-pink-500" : "bg-gray-200"}`} />}
                            </React.Fragment>
                        ))}
                    </div>

                    <div className="flex justify-between mt-2 text-sm text-gray-600">
                        <span>Campaign Details</span>
                        <span>Target Users</span>
                        <span>Schedule & Review</span>
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
                {currentStep > 1 && (
                    <div className="mt-8 flex justify-between">
                        <button
                            onClick={handlePrevious}
                            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Previous
                        </button>
                        <div /> {/* Spacer */}
                    </div>
                )}
            </div>
        </div>
    );
}
