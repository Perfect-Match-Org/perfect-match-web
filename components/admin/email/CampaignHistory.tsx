import React, { useState, useEffect, useCallback, useMemo } from "react";
import { theme } from "@/styles/themes";
import { Campaign, CampaignActionResponse, CampaignListResponse } from "@/types/email";
import {
	AlertTriangle,
	BarChart3,
	CheckCircle2,
	Clock3,
	Edit2,
	FileText,
	Loader2,
	Pause,
	Play,
	Send,
	Target,
	Trash2,
	TrendingUp,
	Users,
} from "lucide-react";

interface CampaignHistoryProps {
	onEditCampaign?: (campaign: Campaign) => void;
	onViewAnalytics?: (campaign: Campaign) => void;
}

type CampaignFilter = "all" | Campaign["status"];

export default function CampaignHistory({ onEditCampaign, onViewAnalytics }: CampaignHistoryProps) {
	const [campaigns, setCampaigns] = useState<Campaign[]>([]);
	const [loading, setLoading] = useState(true);
	const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
	const [error, setError] = useState<string>("");
	const [filter, setFilter] = useState<CampaignFilter>("all");
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	const filterOptions = useMemo(
		(): Array<{ value: CampaignFilter; label: string }> => [
			{ value: "all", label: "All Campaigns" },
			{ value: "draft", label: "Drafts" },
			{ value: "scheduled", label: "Scheduled" },
			{ value: "sending", label: "Sending" },
			{ value: "completed", label: "Completed" },
			{ value: "paused", label: "Paused" },
			{ value: "failed", label: "Failed" },
		],
		[]
	);

	const fetchCampaigns = useCallback(async () => {
		try {
			setLoading(true);
			setError("");

			const params = new URLSearchParams({
				page: page.toString(),
				limit: "10",
			});

			if (filter !== "all") {
				params.append("status", filter);
			}

			const response = await fetch(`/api/admin/email/campaigns?${params.toString()}`);
			const data = (await response.json()) as CampaignListResponse;

			if (!response.ok) {
				throw new Error(data.error || "Failed to fetch campaigns");
			}

			setCampaigns(data.campaigns ?? []);
			setTotalPages(data.pagination?.pages ?? 1);
		} catch (error) {
			console.error("Failed to fetch campaigns:", error);
			setError(error instanceof Error ? error.message : "Failed to load campaigns");
			setCampaigns([]);
			setTotalPages(1);
		} finally {
			setLoading(false);
		}
	}, [filter, page]);

	useEffect(() => {
		fetchCampaigns();
	}, [fetchCampaigns]);

	const getStatusColor = useCallback((status: Campaign["status"]) => {
		switch (status) {
			case "completed":
				return "border-emerald-100 bg-emerald-50 text-emerald-700";
			case "sending":
				return "border-sky-100 bg-sky-50 text-sky-700";
			case "scheduled":
				return "border-amber-100 bg-amber-50 text-amber-700";
			case "draft":
				return "border-gray-200 bg-gray-100 text-gray-700";
			case "paused":
				return "border-orange-100 bg-orange-50 text-orange-700";
			case "failed":
				return "border-rose-100 bg-rose-50 text-rose-700";
			default:
				return "border-gray-200 bg-gray-100 text-gray-700";
		}
	}, []);

	const getStatusIcon = useCallback((status: Campaign["status"]) => {
		switch (status) {
			case "completed":
				return <CheckCircle2 className="h-3.5 w-3.5" />;
			case "sending":
				return <Send className="h-3.5 w-3.5" />;
			case "scheduled":
				return <Clock3 className="h-3.5 w-3.5" />;
			case "draft":
				return <FileText className="h-3.5 w-3.5" />;
			case "paused":
				return <Pause className="h-3.5 w-3.5" />;
			case "failed":
				return <AlertTriangle className="h-3.5 w-3.5" />;
			default:
				return <FileText className="h-3.5 w-3.5" />;
		}
	}, []);

	const calculateOpenRate = useCallback((campaign: Campaign) => {
		if (!campaign.analytics || campaign.analytics.delivered_count === 0) {
			return 0;
		}

		return Math.round((campaign.analytics.opened_count / campaign.analytics.delivered_count) * 100);
	}, []);

	const calculateClickRate = useCallback((campaign: Campaign) => {
		if (!campaign.analytics || campaign.analytics.delivered_count === 0) {
			return 0;
		}

		return Math.round((campaign.analytics.clicked_count / campaign.analytics.delivered_count) * 100);
	}, []);

	const handleAction = useCallback(
		async (campaignId: string, action: "send" | "pause" | "resume" | "delete") => {
			if (action === "delete" && !window.confirm("Delete this campaign? This action cannot be undone.")) {
				return;
			}

			try {
				setActionLoadingId(campaignId);

				const endpoint =
					action === "send"
						? `/api/admin/email/campaigns/${campaignId}/send`
						: action === "pause"
							? `/api/admin/email/campaigns/${campaignId}/pause`
							: action === "resume"
								? `/api/admin/email/campaigns/${campaignId}/resume`
								: `/api/admin/email/campaigns/${campaignId}`;

				const method = action === "delete" ? "DELETE" : "POST";
				// Send both keys so the UI works with either backend payload shape.
				const body = action === "send" ? JSON.stringify({ send_immediately: true, status: true }) : undefined;

				const response = await fetch(endpoint, {
					method,
					headers: body ? { "Content-Type": "application/json" } : undefined,
					body,
				});

				if (!response.ok) {
					const data = (await response.json()) as CampaignActionResponse;
					throw new Error(data.error || `Failed to ${action} campaign`);
				}

				await fetchCampaigns();
			} catch (error) {
				console.error(`Failed to ${action} campaign:`, error);
				window.alert(error instanceof Error ? error.message : `Failed to ${action} campaign`);
			} finally {
				setActionLoadingId(null);
			}
		},
		[fetchCampaigns]
	);

	return (
		<div className="min-h-screen bg-gray-50 p-8">
			<div className="mx-auto max-w-7xl">
				<div className="mb-8 flex flex-col gap-4 lg:flex-col lg:items-end lg:justify-between">
					<div>
						<h1 className="mb-2 text-3xl font-bold text-gray-900" style={{ fontFamily: theme.fonts.heading }}>
							Campaign History
						</h1>
						<p className="text-gray-600">Track delivery status, performance, and next actions for every send</p>
					</div>

					<div className="flex flex-wrap gap-2">
						{filterOptions.map((option) => (
							<button
								key={option.value}
								onClick={() => {
									setFilter(option.value);
									setPage(1);
								}}
								className={`rounded-md border px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all ${filter === option.value
									? "border-pink-200 bg-pink-50 text-pink-600 shadow-sm"
									: "border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:text-gray-900"
									}`}
							>
								{option.label}
							</button>
						))}
					</div>
				</div>

				{error && (
					<div className="mb-6 flex items-start gap-3 rounded-xl border border-rose-100 bg-rose-50 p-4">
						<AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-rose-600" />
						<div>
							<p className="text-sm font-bold text-rose-700">Campaign data could not be refreshed</p>
							<p className="mt-1 text-sm font-medium text-rose-600">{error}</p>
						</div>
					</div>
				)}

				<div className="relative min-h-[420px]">
					{loading && (
						<div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-50/60 backdrop-blur-sm transition-all duration-300">
							<div className="flex flex-col items-center rounded-xl border border-gray-100 bg-white p-6 shadow-xl">
								<Loader2 className="mb-4 h-10 w-10 animate-spin text-pink-500" />
								<span className="text-xs font-bold uppercase tracking-widest text-gray-400">Loading Campaigns...</span>
							</div>
						</div>
					)}

					<div className={`overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-opacity duration-300 ${loading && campaigns.length === 0 ? "opacity-0" : "opacity-100"}`}>
						<div className="overflow-x-auto">
							<table className="w-full">
								<thead className="bg-gray-50/80">
									<tr>
										<th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400">Campaign</th>
										<th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400">Status</th>
										<th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400">Reach</th>
										<th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400">Performance</th>
										<th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400">Created</th>
										<th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400">Actions</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-100">
									{campaigns.map((campaign) => {
										const openRate = calculateOpenRate(campaign);
										const clickRate = calculateClickRate(campaign);
										const campaignId = campaign._id;
										const isBusy = actionLoadingId === campaignId;

										return (
											<tr key={campaign._id ?? campaign.name} className="align-top transition-colors hover:bg-gray-50/70">
												<td className="px-6 py-5">
													<div className="space-y-1">
														<div className="font-bold text-gray-900">{campaign.name}</div>
														<div className="text-sm font-medium text-gray-500">{campaign.template?.name || "Template not found"}</div>
														<div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
															{campaign.campaign_type.replace("_", " ")}
														</div>
													</div>
												</td>

												<td className="px-6 py-5">
													<div className={`inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest ${getStatusColor(campaign.status)}`}>
														{getStatusIcon(campaign.status)}
														<span>{campaign.status}</span>
													</div>
													{campaign.scheduled_at && campaign.status === "scheduled" && (
														<div className="mt-2 text-xs font-medium text-gray-500">
															{new Date(campaign.scheduled_at).toLocaleString()}
														</div>
													)}
												</td>

												<td className="px-6 py-5">
													<div className="space-y-2 text-sm">
														<div className="flex items-center gap-2 font-bold text-gray-900">
															<Users className="h-4 w-4 text-gray-400" />
															<span>{campaign.analytics?.sent_count?.toLocaleString() ?? "0"}</span>
														</div>
														<div className="text-xs font-medium text-gray-500">
															{campaign.analytics?.delivered_count
																? `${campaign.analytics.delivered_count.toLocaleString()} delivered`
																: "Delivery has not started"}
														</div>
													</div>
												</td>

												<td className="px-6 py-5">
													{campaign.analytics && campaign.analytics.delivered_count > 0 ? (
														<div className="space-y-2">
															<div className="flex items-center gap-4 text-sm">
																<div className="flex items-center gap-2 font-bold text-gray-900">
																	<TrendingUp className="h-4 w-4 text-emerald-500" />
																	<span>{openRate}% open</span>
																</div>
																<div className="flex items-center gap-2 font-bold text-gray-900">
																	<Target className="h-4 w-4 text-pink-500" />
																	<span>{clickRate}% click</span>
																</div>
															</div>
															{campaign.analytics.bounced_count > 0 && (
																<div className="text-xs font-medium text-rose-600">
																	{campaign.analytics.bounced_count} bounced
																</div>
															)}
														</div>
													) : (
														<span className="text-sm font-medium text-gray-400">No analytics yet</span>
													)}
												</td>

												<td className="px-6 py-5 text-sm font-medium text-gray-500">
													{campaign.created_at ? new Date(campaign.created_at).toLocaleDateString() : "Recently"}
												</td>

												<td className="px-6 py-5">
													<div className="flex flex-wrap gap-2">
														{(campaign.status === "draft" || campaign.status === "scheduled") && (
															<button
																onClick={() => onEditCampaign?.(campaign)}
																disabled={isBusy}
																className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-xs font-bold uppercase tracking-widest text-gray-600 transition-all hover:border-pink-200 hover:text-pink-600 disabled:opacity-40"
															>
																<Edit2 className="h-3.5 w-3.5" />
																Edit
															</button>
														)}

														{campaign.status === "draft" && campaignId && (
															<button
																onClick={() => handleAction(campaignId, "send")}
																disabled={isBusy}
																className="inline-flex items-center gap-2 rounded-md bg-pink-600 px-3 py-2 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-pink-700 disabled:opacity-40"
															>
																<Send className="h-3.5 w-3.5" />
																Send
															</button>
														)}

														{(campaign.status === "draft" || campaign.status === "scheduled") && campaignId && (
															<button
																onClick={() => handleAction(campaignId, "delete")}
																disabled={isBusy}
																className="inline-flex items-center gap-2 rounded-md border border-rose-100 bg-rose-50 px-3 py-2 text-xs font-bold uppercase tracking-widest text-rose-600 transition-all hover:bg-rose-100 disabled:opacity-40"
															>
																{isBusy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
																Delete
															</button>
														)}

														{campaign.status === "sending" && campaignId && (
															<button
																onClick={() => handleAction(campaignId, "pause")}
																disabled={isBusy}
																className="inline-flex items-center gap-2 rounded-md border border-orange-100 bg-orange-50 px-3 py-2 text-xs font-bold uppercase tracking-widest text-orange-700 transition-all hover:bg-orange-100 disabled:opacity-40"
															>
																<Pause className="h-3.5 w-3.5" />
																Pause
															</button>
														)}

														{campaign.status === "paused" && campaignId && (
															<button
																onClick={() => handleAction(campaignId, "resume")}
																disabled={isBusy}
																className="inline-flex items-center gap-2 rounded-md border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs font-bold uppercase tracking-widest text-emerald-700 transition-all hover:bg-emerald-100 disabled:opacity-40"
															>
																<Play className="h-3.5 w-3.5" />
																Resume
															</button>
														)}

														{campaign.status === "completed" && (
															<button
																onClick={() => onViewAnalytics?.(campaign)}
																className="inline-flex items-center gap-2 rounded-md border border-sky-100 bg-sky-50 px-3 py-2 text-xs font-bold uppercase tracking-widest text-sky-700 transition-all hover:bg-sky-100"
															>
																<BarChart3 className="h-3.5 w-3.5" />
																Analytics
															</button>
														)}
													</div>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>

						{campaigns.length === 0 && !loading && (
							<div className="py-20 text-center">
								<div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-md bg-gray-50">
									<FileText className="h-8 w-8 text-gray-300" />
								</div>
								<h3 className="mb-2 text-lg font-bold text-gray-900">No campaigns found</h3>
								<p className="text-sm font-medium text-gray-500">
									{filter === "all" ? "You have not created any campaigns yet." : `No campaigns found for the "${filter}" status.`}
								</p>
								{filter !== "all" && (
									<div className="mt-6 flex justify-center gap-3">
										<button
											onClick={() => {
												setFilter("all");
												setPage(1);
											}}
											className="rounded-md border border-gray-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest text-gray-600 transition-all hover:border-gray-300 hover:bg-gray-50"
										>
											Clear Filters
										</button>
									</div>
								)}
							</div>
						)}
					</div>
				</div>

				{totalPages > 1 && (
					<div className="mt-6 flex items-center justify-between rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm">
						<div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
							Page <span className="text-pink-600">{page}</span> of {totalPages}
						</div>

						<div className="flex gap-2">
							<button
								onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
								disabled={page === 1 || loading}
								className="rounded-md border border-gray-200 px-4 py-2 text-xs font-bold uppercase tracking-widest text-gray-600 transition-all hover:border-gray-300 hover:bg-gray-50 disabled:opacity-40"
							>
								Previous
							</button>
							<button
								onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
								disabled={page === totalPages || loading}
								className="rounded-md border border-gray-200 px-4 py-2 text-xs font-bold uppercase tracking-widest text-gray-600 transition-all hover:border-gray-300 hover:bg-gray-50 disabled:opacity-40"
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
