import { useState } from "react";
import { AlertTriangle, Trash2, X, Loader2 } from "lucide-react";

const ExistingReviewsSkeleton: React.FC = () => {
    return (
        <div className="space-y-6">
            {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6 border-2 border-gray-200 animate-pulse">
                    <div className="flex justify-between items-start">
                        <div className="flex-1 pr-4 min-w-0">
                            <div className="mb-4">
                                <div className="h-5 bg-gray-300 rounded mb-2 w-16"></div>
                                <div className="h-4 bg-gray-300 rounded w-3/4 mb-1"></div>
                                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                            </div>

                            <div className="mb-4">
                                <div className="h-5 bg-gray-300 rounded mb-2 w-20"></div>
                                <div className="h-4 bg-gray-300 rounded w-full mb-1"></div>
                                <div className="h-4 bg-gray-300 rounded w-5/6 mb-1"></div>
                                <div className="h-4 bg-gray-300 rounded w-4/5"></div>
                            </div>

                            <div className="mb-4">
                                <div className="h-5 bg-gray-300 rounded mb-2 w-16"></div>
                                <div className="h-4 bg-gray-300 rounded w-32"></div>
                            </div>
                        </div>

                        <div className="ml-6 flex-shrink-0">
                            <div className="h-10 bg-gray-300 rounded-lg w-20"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

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

    const handleDeleteReview = async (id: string) => {
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
    };

    if (loading) {
        return <ExistingReviewsSkeleton />;
    }

    if (existingReviews.length === 0) {
        return (
            <div className="text-center">
                <p className="text-xl text-gray-700 mb-4">No approved reviews found.</p>
                <p className="text-gray-600 mb-4">Approved reviews are visible on the testimonials page.</p>
                <button onClick={onRefresh} className="px-4 py-2 bg-pmblue-500 text-white rounded-lg hover:bg-blue-600">
                    Refresh
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Pagination controls */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-6 bg-white py-2 px-6 rounded-xl border border-gray-200 shadow-sm">
                    <button
                        className={`px-5  bg-gray-50 text-gray-700 font-bold text-xs uppercase tracking-widest rounded-lg transition-all ${currentPage === 1 || !!actionLoading ? "opacity-30 cursor-not-allowed" : "hover:bg-gray-100/80 active:scale-95"
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
                        className={`px-5 bg-gray-50 text-gray-700 font-bold text-xs uppercase tracking-widest rounded-lg transition-all ${currentPage === totalPages || !!actionLoading ? "opacity-30 cursor-not-allowed" : "hover:bg-gray-100/80 active:scale-95"
                            }`}
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages || !!actionLoading}
                    >
                        Next
                    </button>
                </div>
            )}
            {existingReviews.map((review) => (
                <div key={review.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group hover:border-pink-200 transition-all duration-300">
                    <div className="flex justify-between items-start p-6">
                        <div className="flex-1 pr-4 min-w-0">
                            <div className="mb-4">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Subject</p>
                                <p className="text-xl font-bold text-gray-900 break-all overflow-wrap-anywhere whitespace-pre-wrap">{review.title}</p>
                            </div>

                            <div className="mb-4">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Testimonial</p>
                                <p className="text-sm font-medium text-gray-600 break-all overflow-wrap-anywhere whitespace-pre-wrap leading-relaxed">{review.body}</p>
                            </div>

                            <div className="flex items-center gap-2">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Author</p>
                                <p className="text-xs font-bold text-pink-600">{review.author}</p>
                            </div>
                        </div>

                        <div className="ml-6 flex-shrink-0">
                            <button
                                className="px-3 py-1 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition-all active:scale-95 disabled:opacity-50"
                                onClick={() => handleDeleteReview(review.id)}
                                disabled={actionLoading === review.id}
                                title="Delete Testimonial"
                            >
                                <span className="text-xs font-bold uppercase tracking-widest">{actionLoading === review.id ? "..." : "Delete"}</span>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
