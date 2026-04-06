import { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, CheckCircle2, XCircle, Loader2 } from "lucide-react";

interface PendingReview {
	id: string;
	title: string;
	body: string;
	author: string;
}

interface PendingReviewsSectionProps {
	pendingReviews: PendingReview[];
	currentReviewIndex: number;
	onNext: () => void;
	onPrevious: () => void;
	onRefresh: () => void;
	// Pagination props
	currentPage: number;
	totalPages: number;
	totalCount: number;
	onPageChange: (page: number) => void;
	loading: boolean;
}

export default function PendingReviewsSection({
	pendingReviews,
	currentReviewIndex,
	onNext,
	onPrevious,
	onRefresh,
	currentPage,
	totalPages,
	totalCount,
	onPageChange,
	loading,
}: PendingReviewsSectionProps) {
	const [actionLoading, setActionLoading] = useState<string | null>(null);

	const handleApproveReview = useCallback(
		async (id: string) => {
			try {
				setActionLoading(id);
				const response = await fetch(`/api/reviews/${id}`, {
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ action: "approve" }),
				});

				if (!response.ok) {
					throw new Error("Failed to approve review");
				}

				onRefresh();
			} catch (err) {
				console.error(err instanceof Error ? err.message : "Failed to approve review");
			} finally {
				setActionLoading(null);
			}
		},
		[onRefresh],
	);

	const handleRejectReview = useCallback(
		async (id: string) => {
			if (!confirm("Are you sure you want to reject this testimonial?")) return;

			try {
				setActionLoading(id);
				const response = await fetch(`/api/reviews/${id}`, {
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ action: "reject" }),
				});

				if (!response.ok) {
					throw new Error("Failed to reject review");
				}

				onRefresh();
			} catch (err) {
				console.error(err instanceof Error ? err.message : "Failed to reject review");
			} finally {
				setActionLoading(null);
			}
		},
		[onRefresh],
	);

	if (pendingReviews.length === 0 && !loading) {
		return (
			<div className="text-center">
				<p className="text-xl text-gray-700 mb-4">No pending reviews.</p>
				<button onClick={onRefresh} className="px-4 py-2 bg-pmblue-500 text-white rounded-md hover:bg-blue-600">
					Refresh
				</button>
			</div>
		);
	}

	const currentReview = pendingReviews[currentReviewIndex];

	return (
		<div className="relative flex min-h-[420px] flex-col space-y-4">
			{loading && (
				<div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 backdrop-blur-sm transition-all duration-300">
					<div className="flex flex-col items-center rounded-xl border border-gray-100 bg-white p-6 shadow-xl">
						<Loader2 className="mb-4 h-10 w-10 animate-spin text-pink-500" />
						<span className="text-xs font-bold uppercase tracking-widest text-gray-400">Refreshing Reviews...</span>
					</div>
				</div>
			)}

			<div
				className={`space-y-4 transition-opacity duration-300 ${loading && pendingReviews.length === 0 ? "opacity-0" : "opacity-100"}`}
			>
				{/* Review counter */}
				<div className="flex items-center justify-start space-x-8">
					<p className="text-xl font-semibold text-gray-700">
						Review {currentReviewIndex + 1} of {pendingReviews.length}
					</p>
					{/* Pagination controls */}
					{totalPages > 1 && (
						<div className="my-10 flex items-center justify-center space-x-6 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
							<button
								className={`rounded-md border-2 border-gray-100 bg-gray-50/80 px-6 py-2 text-xs font-bold uppercase tracking-widest text-gray-700 transition-all ${
									currentPage === 1 || !!actionLoading
										? "cursor-not-allowed opacity-30"
										: "active:scale-95 hover:bg-gray-100"
								}`}
								onClick={() => onPageChange(currentPage - 1)}
								disabled={currentPage === 1 || !!actionLoading}
							>
								Previous Page
							</button>

							<span className="text-xs font-bold uppercase tracking-widest text-gray-400">
								Page <span className="text-pink-600">{currentPage}</span> of {totalPages}
							</span>

							<button
								className={`rounded-md border-2 border-gray-100 bg-gray-50/80 px-6 py-2 text-xs font-bold uppercase tracking-widest text-gray-700 transition-all ${
									currentPage === totalPages || !!actionLoading
										? "cursor-not-allowed opacity-30"
										: "active:scale-95 hover:bg-gray-100"
								}`}
								onClick={() => onPageChange(currentPage + 1)}
								disabled={currentPage === totalPages || !!actionLoading}
							>
								Next Page
							</button>
						</div>
					)}
					{/* Navigation buttons */}
					<div className="flex items-center justify-center gap-4">
						<button
							className={`rounded-xl border-2 border-pink-100 bg-pink-600/80 px-6 py-2 text-white shadow-sm transition-all ${
								currentReviewIndex === 0 || !!actionLoading
									? "cursor-not-allowed opacity-30"
									: "active:scale-95 hover:bg-pink-700"
							}`}
							onClick={onPrevious}
							disabled={currentReviewIndex === 0 || !!actionLoading}
							title="Previous Testimonial"
						>
							<ChevronLeft className="h-6 w-6" />
						</button>
						<button
							className={`rounded-xl border-2 border-pink-100 bg-pink-600/80 px-6 py-2 text-white shadow-sm transition-all ${
								currentReviewIndex === pendingReviews.length - 1 || !!actionLoading
									? "cursor-not-allowed opacity-30"
									: "active:scale-95 hover:bg-pink-700"
							}`}
							onClick={onNext}
							disabled={currentReviewIndex === pendingReviews.length - 1 || !!actionLoading}
							title="Next Testimonial"
						>
							<ChevronRight className="h-6 w-6" />
						</button>
					</div>
				</div>

				<div className="w-full rounded-xl border-2 border-pink-500 bg-white px-6 py-8 shadow-xl">
					<div className="mb-6">
						<p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">Subject</p>
						<p className="whitespace-pre-wrap break-words text-2xl font-black text-gray-900">{currentReview?.title}</p>
					</div>

					<div className="mb-6">
						<p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">Testimonial</p>
						<p className="whitespace-pre-wrap break-words text-lg font-medium leading-relaxed text-gray-700">
							{currentReview?.body}
						</p>
					</div>

					<div className="mb-6">
						<p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">Author</p>
						<p className="text-lg font-bold text-pink-600">{currentReview?.author}</p>
					</div>

					<div className="mt-4 flex justify-center gap-4">
						<button
							className="inline-flex items-center gap-2 rounded-md bg-emerald-500 px-8 py-3 font-bold text-white shadow-lg shadow-emerald-100 transition-all hover:bg-emerald-600 active:scale-95 disabled:opacity-50"
							onClick={() => handleApproveReview(currentReview?.id)}
							disabled={!!actionLoading}
						>
							{actionLoading === currentReview?.id ? (
								<Loader2 className="h-4 w-4 animate-spin" />
							) : (
								<CheckCircle2 className="h-4 w-4" />
							)}
							{actionLoading === currentReview?.id ? "Working..." : "Approve"}
						</button>
						<button
							className="inline-flex items-center gap-2 rounded-md bg-rose-500 px-8 py-3 font-bold text-white shadow-lg shadow-rose-100 transition-all hover:bg-rose-600 active:scale-95 disabled:opacity-50"
							onClick={() => handleRejectReview(currentReview?.id)}
							disabled={!!actionLoading}
						>
							{actionLoading === currentReview?.id ? (
								<Loader2 className="h-4 w-4 animate-spin" />
							) : (
								<XCircle className="h-4 w-4" />
							)}
							{actionLoading === currentReview?.id ? "Working..." : "Reject"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
