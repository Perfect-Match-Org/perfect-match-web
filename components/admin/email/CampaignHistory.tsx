import React, { useState, useEffect } from "react";
import { theme } from "@/styles/themes";
import { Campaign } from "@/types/email";

interface CampaignHistoryProps {
    onEditCampaign?: (campaign: Campaign) => void;
    onViewAnalytics?: (campaign: Campaign) => void;
}

export default function CampaignHistory({ onEditCampaign, onViewAnalytics }: CampaignHistoryProps) {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<string>("all");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchCampaigns();
    }, [page, filter]);

    const fetchCampaigns = async () => {
        try {
            setLoading(true);

            const params = new URLSearchParams({
                page: page.toString(),
                limit: "10",
            });

            if (filter !== "all") {
                params.append("status", filter);
            }

            const response = await fetch(`/api/admin/email/campaigns?${params}`);
            const data = await response.json();

            if (response.ok) {
                setCampaigns(data.campaigns);
                setTotalPages(data.pagination.pages);
            }
        } catch (error) {
            console.error("Failed to fetch campaigns:", error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "completed":
                return "text-green-600 bg-green-100";
            case "sending":
                return "text-blue-600 bg-blue-100";
            case "scheduled":
                return "text-yellow-600 bg-yellow-100";
            case "draft":
                return "text-gray-600 bg-gray-100";
            case "paused":
                return "text-orange-600 bg-orange-100";
            case "failed":
                return "text-red-600 bg-red-100";
            default:
                return "text-gray-600 bg-gray-100";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "completed":
                return "✓";
            case "sending":
                return "⟳";
            case "scheduled":
                return "⏰";
            case "draft":
                return "📝";
            case "paused":
                return "⏸";
            case "failed":
                return "⚠";
            default:
                return "•";
        }
    };

    const calculateOpenRate = (campaign: Campaign) => {
        if (campaign.analytics.delivered_count === 0) return 0;
        return Math.round((campaign.analytics.opened_count / campaign.analytics.delivered_count) * 100);
    };

    const calculateClickRate = (campaign: Campaign) => {
        if (campaign.analytics.delivered_count === 0) return 0;
        return Math.round((campaign.analytics.clicked_count / campaign.analytics.delivered_count) * 100);
    };

    const handleAction = async (campaignId: string, action: string) => {
        try {
            let endpoint = "";
            let method = "POST";

            switch (action) {
                case "send":
                    endpoint = `/api/admin/email/campaigns/${campaignId}/send`;
                    break;
                case "pause":
                    endpoint = `/api/admin/email/campaigns/${campaignId}/pause`;
                    break;
                case "resume":
                    endpoint = `/api/admin/email/campaigns/${campaignId}/resume`;
                    break;
                case "delete":
                    endpoint = `/api/admin/email/campaigns/${campaignId}`;
                    method = "DELETE";
                    break;
            }

            const response = await fetch(endpoint, { method });

            if (response.ok) {
                fetchCampaigns(); // Refresh the list
            }
        } catch (error) {
            console.error(`Failed to ${action} campaign:`, error);
        }
    };

    if (loading) {
        return (
            <div className="p-8">
                <div className="animate-pulse space-y-6">
                    <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-16 bg-gray-200 rounded"></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: theme.fonts.heading }}>
                        Campaign History
                    </h1>
                    <p className="text-gray-600">View and manage your email marketing campaigns</p>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                    <div className="flex flex-wrap gap-2">
                        {[
                            { value: "all", label: "All Campaigns" },
                            { value: "draft", label: "Drafts" },
                            { value: "scheduled", label: "Scheduled" },
                            { value: "sending", label: "Sending" },
                            { value: "completed", label: "Completed" },
                            { value: "paused", label: "Paused" },
                            { value: "failed", label: "Failed" },
                        ].map((filterOption) => (
                            <button
                                key={filterOption.value}
                                onClick={() => {
                                    setFilter(filterOption.value);
                                    setPage(1);
                                }}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    filter === filterOption.value
                                        ? "bg-pink-100 text-pink-700"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                            >
                                {filterOption.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Campaigns Table */}
                <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Campaign
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Recipients
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Performance
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Created
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {campaigns.map((campaign) => (
                                    <tr key={campaign._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="font-medium text-gray-900">{campaign.name}</div>
                                                <div className="text-sm text-gray-500">
                                                    {campaign.template?.name || "Template not found"}
                                                </div>
                                                <div className="text-xs text-gray-400 capitalize">
                                                    {campaign.campaign_type.replace("_", " ")}
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(campaign.status)}`}
                                            >
                                                <span className="mr-1">{getStatusIcon(campaign.status)}</span>
                                                {campaign.status}
                                            </span>
                                            {campaign.scheduled_at && campaign.status === "scheduled" && (
                                                <div className="text-xs text-gray-500 mt-1">
                                                    {new Date(campaign.scheduled_at).toLocaleString()}
                                                </div>
                                            )}
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {campaign.analytics.sent_count > 0 ? (
                                                    <>
                                                        <div className="font-medium">{campaign.analytics.sent_count.toLocaleString()}</div>
                                                        <div className="text-xs text-gray-500">
                                                            {campaign.analytics.delivered_count.toLocaleString()} delivered
                                                        </div>
                                                    </>
                                                ) : (
                                                    <span className="text-gray-500">Not sent</span>
                                                )}
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {campaign.analytics.delivered_count > 0 ? (
                                                <div className="text-sm">
                                                    <div className="flex items-center space-x-4">
                                                        <div>
                                                            <span className="font-medium text-gray-900">
                                                                {calculateOpenRate(campaign)}%
                                                            </span>
                                                            <span className="text-xs text-gray-500 ml-1">open</span>
                                                        </div>
                                                        <div>
                                                            <span className="font-medium text-gray-900">
                                                                {calculateClickRate(campaign)}%
                                                            </span>
                                                            <span className="text-xs text-gray-500 ml-1">click</span>
                                                        </div>
                                                    </div>
                                                    {campaign.analytics.bounced_count > 0 && (
                                                        <div className="text-xs text-red-600 mt-1">
                                                            {campaign.analytics.bounced_count} bounced
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <span className="text-sm text-gray-500">-</span>
                                            )}
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(campaign.created_at).toLocaleDateString()}
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <div className="flex space-x-2">
                                                {campaign.status === "draft" && (
                                                    <>
                                                        <button
                                                            onClick={() => onEditCampaign?.(campaign)}
                                                            className="text-blue-600 hover:text-blue-800"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleAction(campaign._id, "send")}
                                                            className="text-green-600 hover:text-green-800"
                                                        >
                                                            Send
                                                        </button>
                                                        <button
                                                            onClick={() => handleAction(campaign._id, "delete")}
                                                            className="text-red-600 hover:text-red-800"
                                                        >
                                                            Delete
                                                        </button>
                                                    </>
                                                )}

                                                {campaign.status === "sending" && (
                                                    <button
                                                        onClick={() => handleAction(campaign._id, "pause")}
                                                        className="text-orange-600 hover:text-orange-800"
                                                    >
                                                        Pause
                                                    </button>
                                                )}

                                                {campaign.status === "paused" && (
                                                    <button
                                                        onClick={() => handleAction(campaign._id, "resume")}
                                                        className="text-green-600 hover:text-green-800"
                                                    >
                                                        Resume
                                                    </button>
                                                )}

                                                {campaign.status === "completed" && (
                                                    <button
                                                        onClick={() => onViewAnalytics?.(campaign)}
                                                        className="text-blue-600 hover:text-blue-800"
                                                    >
                                                        Analytics
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {campaigns.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-gray-500 mb-4">
                                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8l-4 4m0 0l-4-4m4 4V3"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns found</h3>
                            <p className="text-gray-500">
                                {filter === "all"
                                    ? "You haven't created any campaigns yet."
                                    : `No campaigns found with status "${filter}".`}
                            </p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-6 flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                            Page {page} of {totalPages}
                        </div>

                        <div className="flex space-x-2">
                            <button
                                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                                disabled={page === 1}
                                className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>

                            <button
                                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                                disabled={page === totalPages}
                                className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
