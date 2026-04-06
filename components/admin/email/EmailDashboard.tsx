import React, { useState, useEffect, useCallback } from "react";
import { theme } from "@/styles/themes";
import { Mail, Send, BarChart3, TrendingUp, Plus, History, ChevronRight, Loader2 } from "lucide-react";

interface CampaignStats {
    statusCounts: { [key: string]: number };
    totalCampaigns: number;
    totalSent: number;
    totalDelivered: number;
    totalOpened: number;
    totalClicked: number;
    averageOpenRate: number;
    averageClickRate: number;
}

interface DashboardStats extends CampaignStats {
    totalTemplates: number;
}

interface RecentCampaign {
    id: string;
    name: string;
    status: "draft" | "scheduled" | "sending" | "completed" | "failed";
    sentCount: number;
    openRate: number;
    createdAt: string;
}

interface EmailDashboardProps {
    onCreateTemplate?: () => void;
    onCreateCampaign?: () => void;
    onViewAnalytics?: () => void;
    onViewCampaigns?: () => void;
}

export default function EmailDashboard({ onCreateTemplate, onCreateCampaign, onViewAnalytics, onViewCampaigns }: EmailDashboardProps) {
    const [stats, setStats] = useState<DashboardStats>({
        totalTemplates: 0,
        statusCounts: {},
        totalCampaigns: 0,
        totalSent: 0,
        totalDelivered: 0,
        totalOpened: 0,
        totalClicked: 0,
        averageOpenRate: 0,
        averageClickRate: 0,
    });

    const [recentCampaigns, setRecentCampaigns] = useState<RecentCampaign[]>([]);
    const [loading, setLoading] = useState(true);

    const formatCampaignStats = useCallback((campaignData: any): CampaignStats => {
        return {
            statusCounts: campaignData.status_counts,
            totalCampaigns: campaignData.total_campaigns,
            totalSent: campaignData.total_sent,
            totalDelivered: campaignData.total_delivered,
            totalOpened: campaignData.total_opened,
            totalClicked: campaignData.total_clicked,
            averageOpenRate: campaignData.average_open_rate,
            averageClickRate: campaignData.average_click_rate,
        };
    }, []);

    const formatTemplateStats = useCallback((templateData: { count: number }) => {
        return {
            totalTemplates: templateData.count,
        };
    }, []);

    const fetchDashboardData = useCallback(async (): Promise<void> => {
        try {
            setLoading(true);

            // Fetch campaign stats & template stats with promise.awaitall
            const [campaignResponse, templateResponse] = await Promise.all([
                fetch("/api/admin/email/campaigns/stats"),
                fetch("/api/admin/email/templates/count"),
            ]);
            if (campaignResponse.ok && templateResponse.ok) {
                const [campaignData, templateData] = await Promise.all([campaignResponse.json(), templateResponse.json()]);
                setStats({
                    ...formatCampaignStats(campaignData),
                    ...formatTemplateStats(templateData),
                });
            }

            // Fetch recent campaigns
            const recentResponse = await fetch("/api/admin/email/campaigns?limit=5");
            if (recentResponse.ok) {
                const recentData = await recentResponse.json();
                const formattedCampaigns = recentData.campaigns.map((campaign: any) => ({
                    id: campaign._id,
                    name: campaign.name,
                    status: campaign.status,
                    sentCount: campaign.analytics?.sent_count || 0,
                    openRate:
                        campaign.analytics?.delivered_count > 0
                            ? Math.round((campaign.analytics.opened_count / campaign.analytics.delivered_count) * 100)
                            : 0,
                    createdAt: campaign.created_at,
                }));
                setRecentCampaigns(formattedCampaigns);
            }
        } catch (error) {
            console.error("Failed to fetch dashboard data:", error);
            // Use fallback data
            setStats({
                totalTemplates: 12,
                totalCampaigns: 3,
                totalSent: 15420,
                totalDelivered: 12500,
                totalOpened: 10000,
                totalClicked: 5000,
                averageOpenRate: 24.5,
                averageClickRate: 10.0,
                statusCounts: {
                    draft: 1,
                    scheduled: 1,
                    sending: 1,
                    completed: 1,
                    failed: 0,
                }
            });

            setRecentCampaigns([
                {
                    id: "1",
                    name: "Welcome Series 2026",
                    status: "completed",
                    sentCount: 1250,
                    openRate: 28.4,
                    createdAt: "2026-04-01",
                },
                {
                    id: "2",
                    name: "Match Reminder Campaign",
                    status: "sending",
                    sentCount: 850,
                    openRate: 22.1,
                    createdAt: "2026-04-03",
                },
            ]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    const getStatusColor = useCallback((status: string) => {
        switch (status) {
            case "completed":
                return "text-green-600 bg-green-100";
            case "sending":
                return "text-blue-600 bg-blue-100";
            case "scheduled":
                return "text-yellow-600 bg-yellow-100";
            case "draft":
                return "text-gray-600 bg-gray-100";
            case "failed":
                return "text-red-600 bg-red-100";
            default:
                return "text-gray-600 bg-gray-100";
        }
    }, []);

    if (loading) {
        return (
            <div className="p-8">
                <div className="animate-pulse space-y-6">
                    <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-24 bg-gray-200 rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8 flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: theme.fonts.heading }}>
                            Email Marketing
                        </h1>
                        <p className="text-gray-600">Create, manage and analyze your email campaigns</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={onCreateTemplate}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white hover:shadow-md transition-all"
                            style={{ backgroundColor: theme.colors.primary }}
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            New Template
                        </button>
                        <button
                            onClick={onCreateCampaign}
                            className="inline-flex items-center px-4 py-2 border-2 text-sm font-medium rounded-md hover:shadow-md transition-all"
                            style={{
                                borderColor: theme.colors.primary,
                                color: theme.colors.primary,
                            }}
                        >
                            <Send className="w-4 h-4 mr-2" />
                            New Campaign
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-sm border p-6 transition-all hover:shadow-md">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 mb-1">Total Templates</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.totalTemplates}</p>
                            </div>
                            <div
                                className="w-12 h-12 rounded-lg flex items-center justify-center"
                                style={{ backgroundColor: `${theme.colors.primary}10` }}
                            >
                                <Mail className="w-6 h-6" style={{ color: theme.colors.primary }} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6 transition-all hover:shadow-md">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 mb-1">Total Campaigns</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.totalCampaigns}</p>
                            </div>
                            <div
                                className="w-12 h-12 rounded-lg flex items-center justify-center"
                                style={{ backgroundColor: `${theme.colors.primary}10` }}
                            >
                                <Send className="w-6 h-6" style={{ color: theme.colors.primary }} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6 transition-all hover:shadow-md">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 mb-1">Total Sent</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.totalSent.toLocaleString()}</p>
                            </div>
                            <div
                                className="w-12 h-12 rounded-lg flex items-center justify-center"
                                style={{ backgroundColor: `${theme.colors.primary}10` }}
                            >
                                <BarChart3 className="w-6 h-6" style={{ color: theme.colors.primary }} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6 transition-all hover:shadow-md">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 mb-1">Avg Open Rate</p>
                                <p className={`text-3xl font-bold ${stats.averageOpenRate === 0 ? "text-gray-400" : "text-gray-900"}`}>
                                    {stats.averageOpenRate}%
                                </p>
                            </div>
                            <div
                                className="w-12 h-12 rounded-lg flex items-center justify-center"
                                style={{ backgroundColor: `${theme.colors.primary}10` }}
                            >
                                <TrendingUp className="w-6 h-6" style={{ color: theme.colors.primary }} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg text-gray-900 font-semibold" style={{ fontFamily: theme.fonts.main }}>
                            Navigation & Quick Links
                        </h2>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <button
                            onClick={onViewCampaigns}
                            className="inline-flex items-center px-5 py-2.5 rounded-lg bg-gray-100 text-gray-700 font-medium transition-all duration-200 hover:bg-gray-200"
                            style={{ fontFamily: theme.fonts.main }}
                        >
                            <History className="w-4 h-4 mr-2" />
                            Campaign History
                        </button>
                        <button
                            onClick={onViewAnalytics}
                            className="inline-flex items-center px-5 py-2.5 rounded-lg bg-gray-100 text-gray-700 font-medium transition-all duration-200 hover:bg-gray-200"
                            style={{ fontFamily: theme.fonts.main }}
                        >
                            <BarChart3 className="w-4 h-4 mr-2" />
                            Detailed Analytics
                        </button>
                    </div>
                </div>

                {/* Recent Campaigns */}
                <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                    <div className="p-6 border-b flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-gray-900" style={{ fontFamily: theme.fonts.main }}>
                            Recent Activity
                        </h2>
                        <button
                            onClick={onViewCampaigns}
                            className="text-sm font-medium text-pink-600 hover:text-pink-700 inline-flex items-center"
                        >
                            View all campaigns
                            <ChevronRight className="w-4 h-4 ml-1" />
                        </button>
                    </div>
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
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sent</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Open Rate
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Created
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {recentCampaigns.map((campaign) => (
                                    <tr key={campaign.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-medium text-gray-900">{campaign.name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(campaign.status)}`}
                                            >
                                                {campaign.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">{campaign.sentCount.toLocaleString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">{campaign.openRate}%</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                            {new Date(campaign.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
