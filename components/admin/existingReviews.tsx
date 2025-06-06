interface ExistingReview {
    id: string;
    title: string;
    body: string;
    author: string;
}

interface ExistingReviewsSectionProps {
    existingReviews: ExistingReview[];
    actionLoading: string | null;
    onDelete: (id: string) => void;
    onRefresh: () => void;
}

export default function ExistingReviewsSection({
    existingReviews,
    actionLoading,
    onDelete,
    onRefresh
}: ExistingReviewsSectionProps) {
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
                                onClick={() => onDelete(review.id)}
                                disabled={actionLoading === review.id}
                            >
                                {actionLoading === review.id ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
