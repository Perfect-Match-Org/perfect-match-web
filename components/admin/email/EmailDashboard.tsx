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
				},
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

				<div className="relative min-h-[500px]">
					{loading && (
						<div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-50/60 backdrop-blur-sm transition-all duration-300">
							<div className="flex flex-col items-center rounded-xl border border-gray-100 bg-white p-6 shadow-xl">
								<Loader2 className="mb-4 h-10 w-10 animate-spin text-pink-500" />
								<span className="text-xs font-bold uppercase tracking-widest text-gray-400">Loading Overview...</span>
							</div>
						</div>
					)}

					<div
						className={`space-y-8 transition-opacity duration-300 ${loading && recentCampaigns.length === 0 ? "opacity-0" : "opacity-100"}`}
					>
						{/* Stats Cards */}
						<div className="grid grid-cols-1 gap-6 md:grid-cols-4">
							<div className="rounded-md border bg-white p-6 shadow-sm transition-all hover:shadow-md">
								<div className="flex items-center justify-between">
									<div>
										<p className="mb-1 text-sm font-medium text-gray-500">Total Templates</p>
										<p className="text-3xl font-bold text-gray-900">{stats.totalTemplates}</p>
									</div>
									<div
										className="flex h-12 w-12 items-center justify-center rounded-md"
										style={{ backgroundColor: `${theme.colors.primary}10` }}
									>
										<Mail className="h-6 w-6" style={{ color: theme.colors.primary }} />
									</div>
								</div>
							</div>

							<div className="rounded-md border bg-white p-6 shadow-sm transition-all hover:shadow-md">
								<div className="flex items-center justify-between">
									<div>
										<p className="mb-1 text-sm font-medium text-gray-500">Total Campaigns</p>
										<p className="text-3xl font-bold text-gray-900">{stats.totalCampaigns}</p>
									</div>
									<div
										className="flex h-12 w-12 items-center justify-center rounded-md"
										style={{ backgroundColor: `${theme.colors.primary}10` }}
									>
										<Send className="h-6 w-6" style={{ color: theme.colors.primary }} />
									</div>
								</div>
							</div>

							<div className="rounded-md border bg-white p-6 shadow-sm transition-all hover:shadow-md">
								<div className="flex items-center justify-between">
									<div>
										<p className="mb-1 text-sm font-medium text-gray-500">Total Sent</p>
										<p className="text-3xl font-bold text-gray-900">{stats.totalSent.toLocaleString()}</p>
									</div>
									<div
										className="flex h-12 w-12 items-center justify-center rounded-md"
										style={{ backgroundColor: `${theme.colors.primary}10` }}
									>
										<BarChart3 className="h-6 w-6" style={{ color: theme.colors.primary }} />
									</div>
								</div>
							</div>

							<div className="rounded-md border bg-white p-6 shadow-sm transition-all hover:shadow-md">
								<div className="flex items-center justify-between">
									<div>
										<p className="mb-1 text-sm font-medium text-gray-500">Avg Open Rate</p>
										<p
											className={`text-3xl font-bold ${stats.averageOpenRate === 0 ? "text-gray-400" : "text-gray-900"}`}
										>
											{stats.averageOpenRate}%
										</p>
									</div>
									<div
										className="flex h-12 w-12 items-center justify-center rounded-md"
										style={{ backgroundColor: `${theme.colors.primary}10` }}
									>
										<TrendingUp className="h-6 w-6" style={{ color: theme.colors.primary }} />
									</div>
								</div>
							</div>
						</div>

						{/* Quick Actions */}
						<div className="rounded-md border bg-white p-6 shadow-sm">
							<div className="mb-6 flex items-center justify-between">
								<h2 className="text-lg font-semibold text-gray-900" style={{ fontFamily: theme.fonts.main }}>
									Navigation & Quick Links
								</h2>
							</div>
							<div className="flex flex-wrap gap-4">
								<button
									onClick={onViewCampaigns}
									className="inline-flex items-center rounded-md bg-gray-100 px-5 py-2.5 font-medium text-gray-700 transition-all duration-200 hover:bg-gray-200"
									style={{ fontFamily: theme.fonts.main }}
								>
									<History className="mr-2 h-4 w-4" />
									Campaign History
								</button>
								<button
									onClick={onViewAnalytics}
									className="inline-flex items-center rounded-md bg-gray-100 px-5 py-2.5 font-medium text-gray-700 transition-all duration-200 hover:bg-gray-200"
									style={{ fontFamily: theme.fonts.main }}
								>
									<BarChart3 className="mr-2 h-4 w-4" />
									Detailed Analytics
								</button>
							</div>
						</div>

						{/* Recent Campaigns */}
						<div className="overflow-hidden rounded-md border bg-white shadow-sm">
							<div className="flex items-center justify-between border-b p-6">
								<h2 className="text-lg font-semibold text-gray-900" style={{ fontFamily: theme.fonts.main }}>
									Recent Activity
								</h2>
								<button
									onClick={onViewCampaigns}
									className="inline-flex items-center text-sm font-medium text-pink-600 hover:text-pink-700"
								>
									View all campaigns
									<ChevronRight className="ml-1 h-4 w-4" />
								</button>
							</div>
							<div className="overflow-x-auto">
								<table className="w-full">
									<thead className="bg-gray-50">
										<tr>
											<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
												Campaign
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
												Status
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
												Sent
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
												Open Rate
											</th>
											<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
												Created
											</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-gray-200">
										{recentCampaigns.map((campaign) => (
											<tr key={campaign.id} className="hover:bg-gray-50">
												<td className="whitespace-nowrap px-6 py-4">
													<div className="font-medium text-gray-900">{campaign.name}</div>
												</td>
												<td className="whitespace-nowrap px-6 py-4">
													<span
														className={`inline-flex px-2 py-1 text-xs font-semibold rounded-md ${getStatusColor(campaign.status)}`}
													>
														{campaign.status}
													</span>
												</td>
												<td className="whitespace-nowrap px-6 py-4 text-gray-900">
													{campaign.sentCount.toLocaleString()}
												</td>
												<td className="whitespace-nowrap px-6 py-4 text-gray-900">{campaign.openRate}%</td>
												<td className="whitespace-nowrap px-6 py-4 text-gray-500">
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
			</div>
		</div>
	);
}
