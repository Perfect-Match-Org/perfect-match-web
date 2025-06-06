import { useState } from 'react';

const ExistingReviewsSkeleton: React.FC = () => {
    return (
        <div className="space-y-6">
            {Array.from({ length: 5 }).map((_, index) => (
                <div
                    key={index}
                    className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200 animate-pulse"
                >
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
    loading
}: ExistingReviewsSectionProps) {
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    const handleDeleteReview = async (id: string) => {
        try {
            setActionLoading(id);
            const response = await fetch(`/api/reviews/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete review');
            }

            onRefresh();
        } catch (err) {
            console.error(err instanceof Error ? err.message : 'Failed to delete review');
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
                <button
                    onClick={onRefresh}
                    className="px-4 py-2 bg-pmblue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Refresh
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {existingReviews.map((review) => (
                <div
                    key={review.id}
                    className="bg-white rounded-xl shadow-lg p-6 border-2 border-pmblue-500 overflow-hidden"
                >
                    <div className="flex justify-between items-start">
                        <div className="flex-1 pr-4 min-w-0">
                            <div className="mb-4">
                                <p className="text-lg font-bold mb-2 text-gray-900">Title:</p>
                                <p className="text-gray-800 break-all overflow-wrap-anywhere whitespace-pre-wrap">
                                    {review.title}
                                </p>
                            </div>

                            <div className="mb-4">
                                <p className="text-lg font-bold mb-2 text-gray-900">Review:</p>
                                <p className="text-gray-800 break-all overflow-wrap-anywhere whitespace-pre-wrap">
                                    {review.body}
                                </p>
                            </div>

                            <div className="mb-4">
                                <p className="text-lg font-bold mb-2 text-gray-900">Author:</p>
                                <p className="text-gray-800 break-all overflow-wrap-anywhere whitespace-pre-wrap">
                                    {review.author}
                                </p>
                            </div>
                        </div>

                        <div className="ml-6 flex-shrink-0">
                            <button
                                className="px-4 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={() => handleDeleteReview(review.id)}
                                disabled={actionLoading === review.id}
                            >
                                {actionLoading === review.id ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>))}

            {/* Pagination controls */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-4 mt-8">
                    <button
                        className={`px-4 py-2 bg-pmblue-500 text-white rounded-lg transition ${currentPage === 1 || !!actionLoading
                                ? 'opacity-50 cursor-not-allowed'
                                : 'hover:bg-blue-600'
                            }`}
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1 || !!actionLoading}
                    >
                        Previous Page
                    </button>

                    <span className="text-gray-700 font-medium">
                        Page {currentPage} of {totalPages} ({totalCount} total reviews)
                    </span>

                    <button
                        className={`px-4 py-2 bg-pmblue-500 text-white rounded-lg transition ${currentPage === totalPages || !!actionLoading
                                ? 'opacity-50 cursor-not-allowed'
                                : 'hover:bg-blue-600'
                            }`}
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages || !!actionLoading}
                    >
                        Next Page
                    </button>
                </div>
            )}
        </div>
    );
}
