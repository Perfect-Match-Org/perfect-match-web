import React, { useState, useEffect, useCallback } from "react";
import { theme } from "@/styles/themes";
import { Mail, Eye, MousePointer2, Users, TrendingUp, TrendingDown, Calendar, Download, ChevronRight, Target, Loader2 } from "lucide-react";

interface TopCampaignAnalytics {
	sent_count: number;
}

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
		analytics: TopCampaignAnalytics;
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
			if (rate < 2) return "text-emerald-700";
			if (rate < 5) return "text-amber-700";
			return "text-rose-600";
		}

		if (type === "open") {
			if (rate > 25) return "text-emerald-700";
			if (rate > 15) return "text-amber-700";
			return "text-rose-600";
		}

		if (type === "click") {
			if (rate > 3) return "text-emerald-700";
			if (rate > 1) return "text-amber-700";
			return "text-rose-600";
		}

		return "text-gray-600";
	}, []);

	const renderOverviewTab = useCallback(() => {
		if (!analytics) return null;

		return (
			<div className="space-y-6">
				{/* Key Metrics - Consolidated Row */}
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
					<div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm">
						<p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">Campaigns</p>
						<div className="flex items-end justify-between">
							<h3 className="text-2xl font-semibold text-gray-900">{formatNumber(analytics.totals.campaigns)}</h3>
							<div className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-gray-500">
								<Target className="h-5 w-5" />
							</div>
						</div>
					</div>

					<div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm">
						<p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">Total Sent</p>
						<div className="flex items-end justify-between">
							<h3 className="text-2xl font-semibold text-gray-900">{formatNumber(analytics.totals.sent)}</h3>
							<div className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-gray-500">
								<Mail className="h-5 w-5" />
							</div>
						</div>
					</div>

					<div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm">
						<p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">Open Rate</p>
						<div className="flex items-end justify-between">
							<h3
								className={`text-2xl font-semibold ${analytics.rates.open_rate === 0 ? "text-gray-400" : getPerformanceColor(analytics.rates.open_rate, "open")}`}
							>
								{analytics.rates.open_rate}%
							</h3>
							<div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50/70 text-emerald-700">
								<Eye className="h-5 w-5" />
							</div>
						</div>
					</div>

					<div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm">
						<p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">Click Rate</p>
						<div className="flex items-end justify-between">
							<h3
								className={`text-2xl font-semibold ${analytics.rates.click_rate === 0 ? "text-gray-400" : getPerformanceColor(analytics.rates.click_rate, "click")}`}
							>
								{analytics.rates.click_rate}%
							</h3>
							<div className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-100 bg-amber-50/70 text-amber-700">
								<MousePointer2 className="h-5 w-5" />
							</div>
						</div>
					</div>

					<div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm">
						<p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">Bounce Rate</p>
						<div className="flex items-end justify-between">
							<h3
								className={`text-2xl font-semibold ${analytics.rates.bounce_rate === 0 ? "text-gray-400" : getPerformanceColor(analytics.rates.bounce_rate, "bounce")}`}
							>
								{analytics.rates.bounce_rate}%
							</h3>
							<div className="flex h-10 w-10 items-center justify-center rounded-xl border border-rose-100 bg-rose-50/70 text-rose-600">
								<TrendingDown className="h-5 w-5" />
							</div>
						</div>
					</div>

					<div className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm">
						<p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">Unsubscribes</p>
						<div className="flex items-end justify-between">
							<h3 className="text-2xl font-semibold text-gray-900">{analytics.rates.unsubscribe_rate}%</h3>
							<div className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-gray-600">
								<Users className="h-5 w-5" />
							</div>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
					{/* Top Performing Campaigns */}
					<div className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm">
						<div className="flex items-center justify-between border-b border-gray-100 p-5">
							<h3 className="text-base font-semibold text-gray-900">Top Performing Campaigns</h3>
							<button
								type="button"
								className="flex items-center text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
							>
								View all <ChevronRight className="ml-1 h-4 w-4" />
							</button>
						</div>

						<div className="overflow-x-auto">
							<table className="w-full">
								<thead className="bg-gray-50/60">
									<tr>
										<th className="px-5 py-3.5 text-left text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400">
											Campaign
										</th>
										<th className="px-5 py-3.5 text-left text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400">
											Sent
										</th>
										<th className="px-5 py-3.5 text-left text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400">
											Open Rate
										</th>
										<th className="px-5 py-3.5 text-left text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400">
											Click Rate
										</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-100/80">
									{analytics.top_campaigns.map((campaign) => (
										<tr key={campaign._id} className="transition-colors hover:bg-gray-50/60">
											<td className="px-5 py-4">
												<div className="max-w-[200px] truncate text-sm font-semibold text-gray-900">
													{campaign.name}
												</div>
											</td>
											<td className="px-5 py-4 text-sm text-gray-600">
												{formatNumber(campaign.analytics.sent_count)}
											</td>
											<td className="px-5 py-4">
												<span
													className={`inline-flex items-center text-sm font-medium ${getPerformanceColor(campaign.open_rate, "open")}`}
												>
													{campaign.open_rate}%
												</span>
											</td>
											<td className="px-5 py-4">
												<span
													className={`inline-flex items-center text-sm font-medium ${getPerformanceColor(campaign.click_rate, "click")}`}
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
					<div className="flex flex-col rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm">
						<h3 className="mb-5 text-base font-semibold text-gray-900">Performance Trends</h3>
						<div className="flex min-h-[300px] flex-1 items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50/60">
							<div className="p-8 text-center">
								<div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-gray-200 bg-white shadow-sm">
									<TrendingUp className="h-8 w-8 text-gray-300" />
								</div>
								<h4 className="mb-2 text-sm font-semibold text-gray-900">Performance Chart</h4>
								<p className="mx-auto max-w-xs text-sm text-gray-500">
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
		<div className="min-h-screen bg-gray-50/70 p-6 pb-20 lg:p-8">
			<div className="mx-auto max-w-7xl">
				{/* Header */}
				<div className="mb-8">
					<div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
						<div>
							<h1
								className="mb-2 text-3xl font-semibold tracking-tight text-gray-900"
								style={{ fontFamily: theme.fonts.heading }}
							>
								Analytics & Insights
							</h1>
							<p className="text-sm text-gray-500">Deep dive into your campaign performance and user engagement</p>
						</div>

						<div className="flex items-center gap-3">
							<div className="flex items-center rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm transition-all focus-within:border-gray-300 focus-within:ring-2 focus-within:ring-gray-900/5">
								<Calendar className="mr-2 h-4 w-4 text-gray-400" />
								<select
									value={timeRange}
									onChange={(e) => setTimeRange(Number(e.target.value))}
									className="cursor-pointer border-none bg-transparent p-0 pr-8 text-sm font-medium text-gray-700 outline-none focus:ring-0"
								>
									<option value={7}>Last 7 days</option>
									<option value={30}>Last 30 days</option>
									<option value={90}>Last 90 days</option>
									<option value={365}>Last year</option>
								</select>
							</div>

							<button
								type="button"
								className="inline-flex items-center rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
							>
								<Download className="mr-2 h-4 w-4" />
								Export
							</button>
						</div>
					</div>
				</div>

				{/* Main Content Area - Simplified Layout */}
				<div className="relative min-h-[500px]">
					{loading && (
						<div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-50/60 backdrop-blur-sm transition-all duration-300">
							<div className="flex flex-col items-center rounded-xl border border-gray-100 bg-white p-6 shadow-xl">
								<Loader2 className="mb-4 h-10 w-10 animate-spin text-gray-500" />
								<span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Loading Analytics...</span>
							</div>
						</div>
					)}
					<div className={`space-y-6 transition-opacity duration-300 ${loading && !analytics ? "opacity-0" : "opacity-100"}`}>
						{renderOverviewTab()}
					</div>
				</div>
			</div>
		</div>
	);
}
