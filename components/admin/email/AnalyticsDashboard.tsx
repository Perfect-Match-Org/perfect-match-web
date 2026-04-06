import React, { useState, useEffect, useCallback } from "react";
import { theme } from "@/styles/themes";
import { Mail, Eye, MousePointer2, Users, TrendingUp, TrendingDown, Calendar, Download, ChevronRight, Target, Loader2 } from "lucide-react";

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

    const fetchAnalytics = useCallback(async () => {
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
    }, [timeRange]);

    useEffect(() => {
        fetchAnalytics();
    }, [fetchAnalytics]);

    const formatNumber = useCallback((num: number) => {
        return num.toLocaleString();
    }, []);

    const getPerformanceColor = useCallback((rate: number, type: "open" | "click" | "bounce") => {
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
    }, []);

    const renderOverviewTab = useCallback(() => {
        if (!analytics) return null;

        return (
            <div className="space-y-8">
                {/* Key Metrics - Consolidated Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                    <div className="bg-white rounded-lg shadow-sm border p-5 transition-all hover:shadow-md">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Campaigns</p>
                        <div className="flex items-end justify-between">
                            <h3 className="text-2xl font-bold text-gray-900">{formatNumber(analytics.totals.campaigns)}</h3>
                            <div className="p-2 bg-blue-50 rounded-lg">
                                <Target className="w-5 h-5 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-5 transition-all hover:shadow-md">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Total Sent</p>
                        <div className="flex items-end justify-between">
                            <h3 className="text-2xl font-bold text-gray-900">{formatNumber(analytics.totals.sent)}</h3>
                            <div className="p-2 bg-indigo-50 rounded-lg">
                                <Mail className="w-5 h-5 text-indigo-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-5 transition-all hover:shadow-md">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Open Rate</p>
                        <div className="flex items-end justify-between">
                            <h3
                                className={`text-2xl font-bold ${analytics.rates.open_rate === 0 ? "text-gray-400" : getPerformanceColor(analytics.rates.open_rate, "open")}`}
                            >
                                {analytics.rates.open_rate}%
                            </h3>
                            <div className="p-2 bg-emerald-50 rounded-lg">
                                <Eye className="w-5 h-5 text-emerald-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-5 transition-all hover:shadow-md">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Click Rate</p>
                        <div className="flex items-end justify-between">
                            <h3
                                className={`text-2xl font-bold ${analytics.rates.click_rate === 0 ? "text-gray-400" : getPerformanceColor(analytics.rates.click_rate, "click")}`}
                            >
                                {analytics.rates.click_rate}%
                            </h3>
                            <div className="p-2 bg-amber-50 rounded-lg">
                                <MousePointer2 className="w-5 h-5 text-amber-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-5 transition-all hover:shadow-md">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Bounce Rate</p>
                        <div className="flex items-end justify-between">
                            <h3
                                className={`text-2xl font-bold ${analytics.rates.bounce_rate === 0 ? "text-gray-400" : getPerformanceColor(analytics.rates.bounce_rate, "bounce")}`}
                            >
                                {analytics.rates.bounce_rate}%
                            </h3>
                            <div className="p-2 bg-rose-50 rounded-lg">
                                <TrendingDown className="w-5 h-5 text-rose-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-5 transition-all hover:shadow-md">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Unsubscribes</p>
                        <div className="flex items-end justify-between">
                            <h3 className="text-2xl font-bold text-gray-900">{analytics.rates.unsubscribe_rate}%</h3>
                            <div className="p-2 bg-gray-50 rounded-lg">
                                <Users className="w-5 h-5 text-gray-600" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Top Performing Campaigns */}
                    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                        <div className="p-6 border-b flex justify-between items-center">
                            <h3 className="text-lg font-bold text-gray-900">Top Performing Campaigns</h3>
                            <button className="text-sm font-medium text-pink-600 hover:text-pink-700 flex items-center">
                                View all <ChevronRight className="w-4 h-4 ml-1" />
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50/50">
                                    <tr>
                                        <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            Campaign
                                        </th>
                                        <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            Sent
                                        </th>
                                        <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            Open Rate
                                        </th>
                                        <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            Click Rate
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {analytics.top_campaigns.map((campaign) => (
                                        <tr key={campaign._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-semibold text-gray-900 truncate max-w-[200px]">{campaign.name}</div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {formatNumber(campaign.analytics.sent_count)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-flex items-center text-sm font-bold ${getPerformanceColor(campaign.open_rate, "open")}`}
                                                >
                                                    {campaign.open_rate}%
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-flex items-center text-sm font-bold ${getPerformanceColor(campaign.click_rate, "click")}`}
                                                >
                                                    {campaign.click_rate}%
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Daily Performance Chart */}
                    <div className="bg-white rounded-lg shadow-sm border p-6 flex flex-col">
                        <h3 className="text-lg font-bold text-gray-900 mb-6">Performance Trends</h3>
                        <div className="flex-1 bg-gray-50 rounded-lg border border-dashed border-gray-300 flex items-center justify-center min-h-[300px]">
                            <div className="text-center p-8">
                                <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-4">
                                    <TrendingUp className="w-8 h-8 text-gray-300" />
                                </div>
                                <h4 className="font-semibold text-gray-900 mb-2">Performance Chart</h4>
                                <p className="text-sm text-gray-500 max-w-xs mx-auto">
                                    Visual trend data for the last {timeRange} days will be plotted here.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }, [analytics, formatNumber, getPerformanceColor, timeRange]);

    return (
        <div className="p-8 bg-gray-50 min-h-screen pb-20">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: theme.fonts.heading }}>
                                Analytics & Insights
                            </h1>
                            <p className="text-gray-600">Deep dive into your campaign performance and user engagement</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-pink-500/20 transition-all">
                                <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                                <select
                                    value={timeRange}
                                    onChange={(e) => setTimeRange(parseInt(e.target.value))}
                                    className="bg-transparent border-none text-sm font-medium text-gray-700 focus:ring-0 p-0 pr-8 cursor-pointer outline-none"
                                >
                                    <option value={7}>Last 7 days</option>
                                    <option value={30}>Last 30 days</option>
                                    <option value={90}>Last 90 days</option>
                                    <option value={365}>Last year</option>
                                </select>
                            </div>

                            <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-lg hover:bg-gray-50 transition-colors shadow-sm active:scale-95">
                                <Download className="w-4 h-4 mr-2" />
                                Export
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content Area - Simplified Layout */}
                <div className="relative min-h-[500px]">
                    {loading && (
                        <div className="absolute inset-0 bg-gray-50/60 backdrop-blur-sm z-10 flex items-center justify-center transition-all duration-300">
                            <div className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                                <Loader2 className="w-10 h-10 text-pink-500 animate-spin mb-4" />
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Loading Analytics...</span>
                            </div>
                        </div>
                    )}
                    <div className={`transition-opacity duration-300 space-y-8 ${loading && !analytics ? 'opacity-0' : 'opacity-100'}`}>
                        {renderOverviewTab()}
                    </div>
                </div>
            </div>
        </div>
    );
}
