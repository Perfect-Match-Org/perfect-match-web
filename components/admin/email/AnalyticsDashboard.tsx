import React, { useState, useEffect } from "react";
import { theme } from "@/styles/themes";

interface AnalyticsOverview {
    period: string;
    totals: {
        campaigns: number;
        sent: number;
        delivered: number;
        opened: number;
        clicked: number;
        bounced: number;
        unsubscribed: number;
    };
    rates: {
        delivery_rate: number;
        open_rate: number;
        click_rate: number;
        bounce_rate: number;
        unsubscribe_rate: number;
    };
    top_campaigns: Array<{
        _id: string;
        name: string;
        analytics: any;
        open_rate: number;
        click_rate: number;
    }>;
    daily_performance: Array<{
        date: string;
        campaigns: number;
        sent: number;
        delivered: number;
        opened: number;
        clicked: number;
        open_rate: number;
        click_rate: number;
    }>;
}

export default function AnalyticsDashboard() {
    const [analytics, setAnalytics] = useState<AnalyticsOverview | null>(null);
    const [loading, setLoading] = useState(true);
    const [timeRange, setTimeRange] = useState(30);
    const [activeTab, setActiveTab] = useState<"overview" | "campaigns" | "templates" | "trends">("overview");

    useEffect(() => {
        fetchAnalytics();
    }, [timeRange]);

    const fetchAnalytics = async () => {
        try {
            setLoading(true);

            const response = await fetch(`/api/admin/email/analytics/overview?days=${timeRange}`);
            const data = await response.json();

            if (response.ok) {
                setAnalytics(data);
            }
        } catch (error) {
            console.error("Failed to fetch analytics:", error);
        } finally {
            setLoading(false);
        }
    };

    const formatNumber = (num: number) => {
        return num.toLocaleString();
    };

    const getPerformanceColor = (rate: number, type: "open" | "click" | "bounce") => {
        if (type === "bounce") {
            if (rate < 2) return "text-green-600";
            if (rate < 5) return "text-yellow-600";
            return "text-red-600";
        }

        if (type === "open") {
            if (rate > 25) return "text-green-600";
            if (rate > 15) return "text-yellow-600";
            return "text-red-600";
        }

        if (type === "click") {
            if (rate > 3) return "text-green-600";
            if (rate > 1) return "text-yellow-600";
            return "text-red-600";
        }

        return "text-gray-600";
    };

    const renderOverviewTab = () => {
        if (!analytics) return null;

        return (
            <div className="space-y-6">
                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Total Campaigns</p>
                                <p className="text-2xl font-bold text-gray-900">{formatNumber(analytics.totals.campaigns)}</p>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                <span className="text-xl">📊</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Emails Sent</p>
                                <p className="text-2xl font-bold text-gray-900">{formatNumber(analytics.totals.sent)}</p>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                                <span className="text-xl">📧</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Open Rate</p>
                                <p className={`text-2xl font-bold ${getPerformanceColor(analytics.rates.open_rate, "open")}`}>
                                    {analytics.rates.open_rate}%
                                </p>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                                <span className="text-xl">👁</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Click Rate</p>
                                <p className={`text-2xl font-bold ${getPerformanceColor(analytics.rates.click_rate, "click")}`}>
                                    {analytics.rates.click_rate}%
                                </p>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                                <span className="text-xl">👆</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Performance Rates */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900 mb-1">{analytics.rates.delivery_rate}%</div>
                            <div className="text-sm text-gray-600">Delivery Rate</div>
                        </div>

                        <div className="text-center">
                            <div className={`text-2xl font-bold mb-1 ${getPerformanceColor(analytics.rates.open_rate, "open")}`}>
                                {analytics.rates.open_rate}%
                            </div>
                            <div className="text-sm text-gray-600">Open Rate</div>
                        </div>

                        <div className="text-center">
                            <div className={`text-2xl font-bold mb-1 ${getPerformanceColor(analytics.rates.click_rate, "click")}`}>
                                {analytics.rates.click_rate}%
                            </div>
                            <div className="text-sm text-gray-600">Click Rate</div>
                        </div>

                        <div className="text-center">
                            <div className={`text-2xl font-bold mb-1 ${getPerformanceColor(analytics.rates.bounce_rate, "bounce")}`}>
                                {analytics.rates.bounce_rate}%
                            </div>
                            <div className="text-sm text-gray-600">Bounce Rate</div>
                        </div>

                        <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900 mb-1">{analytics.rates.unsubscribe_rate}%</div>
                            <div className="text-sm text-gray-600">Unsubscribe Rate</div>
                        </div>
                    </div>
                </div>

                {/* Top Performing Campaigns */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Campaigns</h3>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-2 text-sm font-medium text-gray-600">Campaign</th>
                                    <th className="text-left py-2 text-sm font-medium text-gray-600">Sent</th>
                                    <th className="text-left py-2 text-sm font-medium text-gray-600">Open Rate</th>
                                    <th className="text-left py-2 text-sm font-medium text-gray-600">Click Rate</th>
                                </tr>
                            </thead>
                            <tbody>
                                {analytics.top_campaigns.map((campaign) => (
                                    <tr key={campaign._id} className="border-b border-gray-100">
                                        <td className="py-3">
                                            <div className="font-medium text-gray-900">{campaign.name}</div>
                                        </td>
                                        <td className="py-3 text-gray-600">{formatNumber(campaign.analytics.sent_count)}</td>
                                        <td className="py-3">
                                            <span className={`font-medium ${getPerformanceColor(campaign.open_rate, "open")}`}>
                                                {campaign.open_rate}%
                                            </span>
                                        </td>
                                        <td className="py-3">
                                            <span className={`font-medium ${getPerformanceColor(campaign.click_rate, "click")}`}>
                                                {campaign.click_rate}%
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Daily Performance Chart Placeholder */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Performance</h3>

                    <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                            <div className="text-gray-400 mb-2">
                                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                    />
                                </svg>
                            </div>
                            <p className="text-gray-600">Performance chart would be rendered here</p>
                            <p className="text-sm text-gray-500 mt-1">
                                {analytics.daily_performance.length} data points over {analytics.period.toLowerCase()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
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
                    <div className="h-64 bg-gray-200 rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: theme.fonts.heading }}>
                                Email Analytics
                            </h1>
                            <p className="text-gray-600">Track your email marketing performance and insights</p>
                        </div>

                        {/* Time Range Selector */}
                        <div className="flex items-center space-x-2">
                            <label className="text-sm text-gray-600">Time Range:</label>
                            <select
                                value={timeRange}
                                onChange={(e) => setTimeRange(parseInt(e.target.value))}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                            >
                                <option value={7}>Last 7 days</option>
                                <option value={30}>Last 30 days</option>
                                <option value={90}>Last 90 days</option>
                                <option value={365}>Last year</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-lg shadow-sm border mb-6">
                    <div className="border-b border-gray-200">
                        <div className="flex">
                            {[
                                { id: "overview", label: "Overview" },
                                { id: "campaigns", label: "Campaigns" },
                                { id: "templates", label: "Templates" },
                                { id: "trends", label: "Trends" },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                                        activeTab === tab.id
                                            ? "border-pink-500 text-pink-600"
                                            : "border-transparent text-gray-500 hover:text-gray-700"
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="p-6">
                        {activeTab === "overview" && renderOverviewTab()}

                        {activeTab === "campaigns" && (
                            <div className="text-center py-12">
                                <p className="text-gray-600">Campaign analytics view would be implemented here</p>
                            </div>
                        )}

                        {activeTab === "templates" && (
                            <div className="text-center py-12">
                                <p className="text-gray-600">Template performance view would be implemented here</p>
                            </div>
                        )}

                        {activeTab === "trends" && (
                            <div className="text-center py-12">
                                <p className="text-gray-600">Trends analysis view would be implemented here</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Export Options */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Data</h3>

                    <div className="flex flex-wrap gap-3">
                        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                            Export Overview (CSV)
                        </button>
                        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                            Export Campaigns (CSV)
                        </button>
                        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                            Export Templates (CSV)
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
