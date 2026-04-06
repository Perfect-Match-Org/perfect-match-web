import { useState, useCallback, useMemo } from "react";
import { AlertTriangle, Trash2, X, Loader2 } from "lucide-react";

interface ExistingReview {
    id: string;
    title: string;
    body: string;
    author: string;
}

interface ExistingReviewsSectionProps {
    existingReviews: ExistingReview[];
    onRefresh: () => void;
    // Pagination props
    currentPage: number;
    totalPages: number;
    totalCount: number;
    onPageChange: (page: number) => void;
    loading: boolean;
}

export default function ExistingReviewsSection({
    existingReviews,
    onRefresh,
    currentPage,
    totalPages,
    totalCount,
    onPageChange,
    loading,
}: ExistingReviewsSectionProps) {
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
    const selectedReview = useMemo(
        () => existingReviews.find((review) => review.id === confirmDeleteId) ?? null,
        [confirmDeleteId, existingReviews]
    );

    const handleDeleteReview = useCallback(async (id: string) => {
        try {
            setActionLoading(id);
            const response = await fetch(`/api/reviews/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete review");
            }

            setConfirmDeleteId(null);
            onRefresh();
        } catch (err) {
            console.error(err instanceof Error ? err.message : "Failed to delete review");
        } finally {
            setActionLoading(null);
        }
    }, [onRefresh]);

    if (existingReviews.length === 0 && !loading) {
        return (
            <div className="text-center">
                <p className="text-xl text-gray-700 mb-4">No approved reviews found.</p>
                <p className="text-gray-600 mb-4">Approved reviews are visible on the testimonials page.</p>
                <button onClick={onRefresh} className="px-4 py-2 bg-pmblue-500 text-white rounded-md hover:bg-blue-600">
                    Refresh
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm">
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Approved Reviews</p>
                    <p className="mt-1 text-sm font-medium text-gray-600">
                        Showing {existingReviews.length.toLocaleString()} of {totalCount.toLocaleString()} approved testimonials.
                    </p>
                </div>
                <button
                    onClick={onRefresh}
                    disabled={loading || !!actionLoading}
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest text-gray-600 transition-all hover:border-gray-300 hover:bg-gray-50 disabled:opacity-40"
                >
                    {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
                    Refresh
                </button>
            </div>

            {/* Pagination controls */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center space-x-6 rounded-xl border border-gray-200 bg-white px-6 py-3 shadow-sm">
                    <button
                        className={`rounded-md bg-gray-50 px-5 py-2 text-xs font-bold uppercase tracking-widest text-gray-700 transition-all ${currentPage === 1 || !!actionLoading ? "cursor-not-allowed opacity-30" : "active:scale-95 hover:bg-gray-100/80"
                            }`}
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1 || !!actionLoading}
                    >
                        Previous
                    </button>

                    <span className="text-gray-400 font-bold text-xs uppercase tracking-widest">
                        Page <span className="text-pink-600">{currentPage}</span> of {totalPages}
                    </span>

                    <button
                        className={`rounded-md bg-gray-50 px-5 py-2 text-xs font-bold uppercase tracking-widest text-gray-700 transition-all ${currentPage === totalPages || !!actionLoading ? "cursor-not-allowed opacity-30" : "active:scale-95 hover:bg-gray-100/80"
                            }`}
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages || !!actionLoading}
                    >
                        Next
                    </button>
                </div>
            )}
            <div className="relative min-h-[320px]">
                {loading && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 backdrop-blur-sm transition-all duration-300">
                        <div className="flex flex-col items-center rounded-xl border border-gray-100 bg-white p-6 shadow-xl">
                            <Loader2 className="mb-4 h-10 w-10 animate-spin text-pink-500" />
                            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Refreshing Reviews...</span>
                        </div>
                    </div>
                )}

                <div className={`space-y-6 transition-opacity duration-300 ${loading && existingReviews.length === 0 ? "opacity-0" : "opacity-100"}`}>
                    {existingReviews.map((review) => (
                        <div
                            key={review.id}
                            className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:border-pink-200"
                        >
                            <div className="flex items-start justify-between p-6">
                                <div className="min-w-0 flex-1 pr-4">
                                    <div className="mb-4">
                                        <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">Subject</p>
                                        <p className="overflow-wrap-anywhere break-all whitespace-pre-wrap text-xl font-bold text-gray-900">
                                            {review.title}
                                        </p>
                                    </div>

                                    <div className="mb-4">
                                        <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">Testimonial</p>
                                        <p className="overflow-wrap-anywhere break-all whitespace-pre-wrap text-sm font-medium leading-relaxed text-gray-600">
                                            {review.body}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Author</p>
                                        <p className="text-xs font-bold text-pink-600">{review.author}</p>
                                    </div>
                                </div>

                                <div className="ml-6 flex-shrink-0">
                                    <button
                                        className="inline-flex items-center gap-2 rounded-md bg-rose-50 px-3 py-2 text-rose-600 transition-all hover:bg-rose-100 active:scale-95 disabled:opacity-50"
                                        onClick={() => setConfirmDeleteId(review.id)}
                                        disabled={actionLoading === review.id}
                                        title="Delete Testimonial"
                                    >
                                        {actionLoading === review.id ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <Trash2 className="h-4 w-4" />
                                        )}
                                        <span className="text-xs font-bold uppercase tracking-widest">Delete</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {confirmDeleteId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/60 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-xl border border-white/10 bg-white shadow-2xl">
                        <div className="flex items-start justify-between border-b border-gray-100 p-6">
                            <div className="flex items-start gap-3">
                                <div className="rounded-xl bg-rose-50 p-3">
                                    <AlertTriangle className="h-5 w-5 text-rose-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">Delete approved review?</h3>
                                    <p className="mt-1 text-sm font-medium text-gray-500">
                                        This will permanently remove the testimonial from the approved list.
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setConfirmDeleteId(null)}
                                className="rounded-md p-2 text-gray-400 transition-all hover:bg-gray-50 hover:text-gray-700"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="space-y-4 p-6">
                            {selectedReview && (
                                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Selected Review</p>
                                    <p className="mt-2 text-sm font-bold text-gray-900">{selectedReview.title}</p>
                                    <p className="mt-1 text-xs font-medium text-gray-500">By {selectedReview.author}</p>
                                </div>
                            )}

                            <div className="rounded-xl border border-rose-100 bg-rose-50 p-4 text-sm font-medium text-rose-700">
                                This action cannot be undone.
                            </div>

                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setConfirmDeleteId(null)}
                                    className="rounded-md border border-gray-200 px-4 py-2 text-sm font-bold text-gray-600 transition-all hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleDeleteReview(confirmDeleteId)}
                                    disabled={actionLoading === confirmDeleteId}
                                    className="inline-flex items-center gap-2 rounded-md bg-rose-600 px-4 py-2 text-sm font-bold text-white transition-all hover:bg-rose-700 disabled:opacity-50"
                                >
                                    {actionLoading === confirmDeleteId ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Trash2 className="h-4 w-4" />
                                    )}
                                    Confirm Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
