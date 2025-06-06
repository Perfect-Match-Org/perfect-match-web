interface PendingReview {
    id: string;
    title: string;
    body: string;
    author: string;
}

interface PendingReviewsSectionProps {
    pendingReviews: PendingReview[];
    currentReviewIndex: number;
    actionLoading: string | null;
    onApprove: (id: string) => void;
    onReject: (id: string) => void;
    onNext: () => void;
    onPrevious: () => void;
    onRefresh: () => void;
    // Pagination props
    currentPage: number;
    totalPages: number;
    totalCount: number;
    onPageChange: (page: number) => void;
}

export default function PendingReviewsSection({
    pendingReviews,
    currentReviewIndex,
    actionLoading,
    onApprove,
    onReject,
    onNext,
    onPrevious,
    onRefresh,
    currentPage,
    totalPages,
    totalCount,
    onPageChange
}: PendingReviewsSectionProps) {
    if (pendingReviews.length === 0) {
        return (
            <div className="text-center">
                <p className="text-xl text-gray-700 mb-4">No pending reviews.</p>
                <button
                    onClick={onRefresh}
                    className="px-4 py-2 bg-pmblue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Refresh
                </button>
            </div>
        );
    }

    const currentReview = pendingReviews[currentReviewIndex];

    return (
        <div className="flex flex-col items-center space-y-8">
            {/* Review counter */}
            <p className="text-xl text-gray-700 font-semibold">
                Review {currentReviewIndex + 1} of {pendingReviews.length}
            </p>

            {/* Current review card */}
            <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8 border-2 border-pmblue-500">
                <div className="mb-6">
                    <p className="text-2xl font-bold mb-3 text-gray-900">Title:</p>
                    <p className="text-xl text-gray-800 break-words whitespace-pre-wrap">{currentReview.title}</p>
                </div>

                <div className="mb-6">
                    <p className="text-2xl font-bold mb-3 text-gray-900">Review:</p>
                    <p className="text-xl text-gray-800 break-words whitespace-pre-wrap">{currentReview.body}</p>
                </div>

                <div className="mb-6">
                    <p className="text-2xl font-bold mb-3 text-gray-900">Name:</p>
                    <p className="text-xl text-gray-800 break-words whitespace-pre-wrap">{currentReview.author}</p>
                </div>

                <div className="flex justify-center space-x-6 mt-6">
                    <button
                        className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition w-32 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => onApprove(currentReview.id)}
                        disabled={!!actionLoading}
                    >
                        {actionLoading === currentReview.id ? 'Loading...' : 'Approve'}
                    </button>
                    <button
                        className="px-6 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition w-32 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => onReject(currentReview.id)}
                        disabled={!!actionLoading}
                    >
                        {actionLoading === currentReview.id ? 'Loading...' : 'Reject'}
                    </button>                </div>
            </div>

            {/* Pagination controls */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-4 my-6">
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

            {/* Navigation buttons */}
            <div className="flex justify-center space-x-6">
                <button
                    className={`px-6 py-3 bg-pmblue-500 text-white font-bold rounded-lg transition w-32 ${currentReviewIndex === 0 || !!actionLoading
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-blue-600'
                        }`}
                    onClick={onPrevious}
                    disabled={currentReviewIndex === 0 || !!actionLoading}
                >
                    Previous
                </button>
                <button
                    className={`px-6 py-3 bg-pmblue-500 text-white font-bold rounded-lg transition w-32 ${currentReviewIndex === pendingReviews.length - 1 || !!actionLoading
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-blue-600'
                        }`}
                    onClick={onNext}
                    disabled={currentReviewIndex === pendingReviews.length - 1 || !!actionLoading}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
