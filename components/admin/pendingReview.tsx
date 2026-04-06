import { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, CheckCircle2, XCircle, Loader2 } from "lucide-react";

const PendingReviewSkeleton: React.FC = () => {
    return (
        <div className="flex flex-col space-y-4">
            <div className="h-6 bg-gray-300 rounded w-32 animate-pulse"></div>

            <div className="w-full bg-white rounded-lg shadow-lg py-8 px-6 border-2 border-gray-200 animate-pulse">
                <div className="mb-6">
                    <div className="h-6 bg-gray-300 rounded mb-3 w-16"></div>
                    <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-5 bg-gray-300 rounded w-1/2"></div>
                </div>

                <div className="mb-6">
                    <div className="h-6 bg-gray-300 rounded mb-3 w-20"></div>
                    <div className="h-5 bg-gray-300 rounded w-full mb-2"></div>
                    <div className="h-5 bg-gray-300 rounded w-5/6 mb-2"></div>
                    <div className="h-5 bg-gray-300 rounded w-4/5 mb-2"></div>
                    <div className="h-5 bg-gray-300 rounded w-3/4"></div>
                </div>

                <div className="mb-6">
                    <div className="h-6 bg-gray-300 rounded mb-3 w-16"></div>
                    <div className="h-5 bg-gray-300 rounded w-32"></div>
                </div>

                <div className="flex justify-center space-x-6 mt-6">
                    <div className="h-12 bg-gray-300 rounded-lg w-32"></div>
                    <div className="h-12 bg-gray-300 rounded-lg w-32"></div>
                </div>
            </div>
        </div>
    );
};

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

    const handleApproveReview = useCallback(async (id: string) => {
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
    }, [onRefresh]);

    const handleRejectReview = useCallback(async (id: string) => {
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
    }, [onRefresh]);

    if (loading) {
        return <PendingReviewSkeleton />;
    }

    if (pendingReviews.length === 0) {
        return (
            <div className="text-center">
                <p className="text-xl text-gray-700 mb-4">No pending reviews.</p>
                <button onClick={onRefresh} className="px-4 py-2 bg-pmblue-500 text-white rounded-lg hover:bg-blue-600">
                    Refresh
                </button>
            </div>
        );
    }

    const currentReview = pendingReviews[currentReviewIndex];

    return (
        <div className="flex flex-col space-y-4">
            {/* Review counter */}
            <div className="flex justify-start items-center space-x-8">
                <p className="text-xl text-gray-700 font-semibold">
                    Review {currentReviewIndex + 1} of {pendingReviews.length}
                </p>
                {/* Pagination controls */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center space-x-6 my-10 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                        <button
                            className={`py-1 px-6 bg-gray-50/80 border-2 border-gray-100 text-gray-700 font-bold text-xs uppercase tracking-widest rounded-lg transition-all ${currentPage === 1 || !!actionLoading ? "opacity-30 cursor-not-allowed" : "hover:bg-gray-100 active:scale-95"
                                }`}
                            onClick={() => onPageChange(currentPage - 1)}
                            disabled={currentPage === 1 || !!actionLoading}
                        >
                            Previous Page
                        </button>

                        <span className="text-gray-400 font-bold text-xs uppercase tracking-widest">
                            Page <span className="text-pink-600">{currentPage}</span> of {totalPages}
                        </span>

                        <button
                            className={`py-1 px-6 bg-gray-50/80 border-2 border-gray-100 text-gray-700 font-bold text-xs uppercase tracking-widest rounded-lg transition-all ${currentPage === totalPages || !!actionLoading ? "opacity-30 cursor-not-allowed" : "hover:bg-gray-100 active:scale-95"
                                }`}
                            onClick={() => onPageChange(currentPage + 1)}
                            disabled={currentPage === totalPages || !!actionLoading}
                        >
                            Next Page
                        </button>
                    </div>
                )}
                {/* Navigation buttons */}
                <div className="flex justify-center items-center gap-4">
                    <button
                        className={`py-1 px-6 bg-pink-600/80 border-2 border-pink-100 text-white rounded-xl transition-all shadow-sm ${currentReviewIndex === 0 || !!actionLoading ? "opacity-30 cursor-not-allowed" : "hover:bg-pink-700 active:scale-95"
                            }`}
                        onClick={onPrevious}
                        disabled={currentReviewIndex === 0 || !!actionLoading}
                        title="Previous Testimonial"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        className={`py-1 px-6 bg-pink-600/80 border-2 border-pink-100 text-white rounded-xl transition-all shadow-sm ${currentReviewIndex === pendingReviews.length - 1 || !!actionLoading
                            ? "opacity-30 cursor-not-allowed"
                            : "hover:bg-pink-700 active:scale-95"
                            }`}
                        onClick={onNext}
                        disabled={currentReviewIndex === pendingReviews.length - 1 || !!actionLoading}
                        title="Next Testimonial"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            </div>

            <div className="w-full bg-white rounded-xl shadow-xl py-8 px-6 border-2 border-pink-500">
                <div className="mb-6">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Subject</p>
                    <p className="text-2xl font-black text-gray-900 break-words whitespace-pre-wrap">{currentReview.title}</p>
                </div>

                <div className="mb-6">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Testimonial</p>
                    <p className="text-lg font-medium text-gray-700 break-words whitespace-pre-wrap leading-relaxed">{currentReview.body}</p>
                </div>

                <div className="mb-6">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Author</p>
                    <p className="text-lg font-bold text-pink-600">{currentReview.author}</p>
                </div>

                <div className="flex justify-center gap-4 mt-4">
                    <button
                        className="px-8 py-3 bg-emerald-400 text-white font-bold rounded-lg hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-100 active:scale-95 disabled:opacity-50"
                        onClick={() => handleApproveReview(currentReview.id)}
                        disabled={!!actionLoading}
                    >
                        {actionLoading === currentReview.id ? "Working..." : "Approve"}
                    </button>
                    <button
                        className="px-8 py-3 bg-rose-400 text-white font-bold rounded-lg hover:bg-rose-600 transition-all shadow-lg shadow-rose-100 active:scale-95 disabled:opacity-50"
                        onClick={() => handleRejectReview(currentReview.id)}
                        disabled={!!actionLoading}
                    >
                        {actionLoading === currentReview.id ? "Working..." : "Reject"}
                    </button>
                </div>
            </div>
        </div>
    );
}
