import React, { useState, useEffect } from "react";
import { theme } from "@/styles/themes";
import TestAuth from "./TestAuth";

interface DashboardStats {
    totalTemplates: number;
    activeCampaigns: number;
    totalSent: number;
    avgOpenRate: number;
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

export default function EmailDashboard({ 
  onCreateTemplate, 
  onCreateCampaign, 
  onViewAnalytics,
  onViewCampaigns 
}: EmailDashboardProps) {
    const [stats, setStats] = useState<DashboardStats>({
        totalTemplates: 0,
        activeCampaigns: 0,
        totalSent: 0,
        avgOpenRate: 0,
    });

    const [recentCampaigns, setRecentCampaigns] = useState<RecentCampaign[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);

            // Fetch campaign stats
            const campaignResponse = await fetch("/api/admin/email/campaigns/stats");
            if (campaignResponse.ok) {
                const campaignData = await campaignResponse.json();
                setStats({
                    totalTemplates: campaignData.total_templates || 0,
                    activeCampaigns: campaignData.status_counts?.sending || 0,
                    totalSent: campaignData.total_sent || 0,
                    avgOpenRate: campaignData.average_open_rate || 0,
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
                activeCampaigns: 3,
                totalSent: 15420,
                avgOpenRate: 24.5,
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
            case "failed":
                return "text-red-600 bg-red-100";
            default:
                return "text-gray-600 bg-gray-100";
        }
    };

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
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: theme.fonts.heading }}>
                        Email Marketing Dashboard
                    </h1>
                    <p className="text-gray-600">Manage your email campaigns and templates</p>
                </div>

                {/* Authentication Test */}
                <TestAuth />

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Total Templates</p>
                                <p className="text-2xl font-bold" style={{ color: theme.colors.primary }}>
                                    {stats.totalTemplates}
                                </p>
                            </div>
                            <div
                                className="w-12 h-12 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: `${theme.colors.primary}20` }}
                            >
                                <span className="text-xl">📧</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Active Campaigns</p>
                                <p className="text-2xl font-bold" style={{ color: theme.colors.primary }}>
                                    {stats.activeCampaigns}
                                </p>
                            </div>
                            <div
                                className="w-12 h-12 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: `${theme.colors.primary}20` }}
                            >
                                <span className="text-xl">🚀</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Total Sent</p>
                                <p className="text-2xl font-bold" style={{ color: theme.colors.primary }}>
                                    {stats.totalSent.toLocaleString()}
                                </p>
                            </div>
                            <div
                                className="w-12 h-12 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: `${theme.colors.primary}20` }}
                            >
                                <span className="text-xl">📊</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Avg Open Rate</p>
                                <p className="text-2xl font-bold" style={{ color: theme.colors.primary }}>
                                    {stats.avgOpenRate}%
                                </p>
                            </div>
                            <div
                                className="w-12 h-12 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: `${theme.colors.primary}20` }}
                            >
                                <span className="text-xl">📈</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
                    <h2 className="text-lg font-semibold mb-4" style={{ fontFamily: theme.fonts.main }}>
                        Quick Actions
                    </h2>
                    <div className="flex flex-wrap gap-4">
                        <button
                            onClick={onCreateTemplate}
                            className="px-6 py-3 rounded-lg text-white font-medium transition-all duration-200 hover:shadow-lg"
                            style={{
                                backgroundColor: theme.colors.primary,
                                fontFamily: theme.fonts.main,
                            }}
                        >
                            Create New Template
                        </button>
                        <button
                            onClick={onCreateCampaign}
                            className="px-6 py-3 rounded-lg border-2 font-medium transition-all duration-200 hover:shadow-lg"
                            style={{
                                borderColor: theme.colors.primary,
                                color: theme.colors.primary,
                                fontFamily: theme.fonts.main,
                            }}
                        >
                            New Campaign
                        </button>
                        <button
                            onClick={onViewAnalytics}
                            className="px-6 py-3 rounded-lg bg-gray-100 text-gray-700 font-medium transition-all duration-200 hover:bg-gray-200"
                            style={{ fontFamily: theme.fonts.main }}
                        >
                            View Analytics
                        </button>
                    </div>
                </div>

                {/* Recent Campaigns */}
                <div className="bg-white rounded-lg shadow-sm border">
                    <div className="p-6 border-b">
                        <h2 className="text-lg font-semibold" style={{ fontFamily: theme.fonts.main }}>
                            Recent Campaigns
                        </h2>
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
