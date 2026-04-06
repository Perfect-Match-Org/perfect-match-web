import { useState, useEffect, useCallback } from "react";
import { Container } from "@/components/testimonials/Container";
import ReviewTabs from "./reviewTabs";
import PendingReviewsSection from "./pendingReview";
import ExistingReviewsSection from "./existingReviews";
import { theme } from "@/styles/themes";

interface PendingReview {
    id: string;
    title: string;
    body: string;
    author: string;
}

interface ExistingReview {
    id: string;
    title: string;
    body: string;
    author: string;
}

export default function ReviewManagement() {
    const [pendingReviews, setPendingReviews] = useState<PendingReview[]>([]);
    const [existingReviews, setExistingReviews] = useState<ExistingReview[]>([]);
    const [reviewsLoading, setReviewsLoading] = useState(true);
    const [reviewsError, setReviewsError] = useState<string | null>(null);
    const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
    const [reviewTab, setReviewTab] = useState<"pending" | "existing">("pending");

    // Pagination state
    const [pendingPage, setPendingPage] = useState(1);
    const [existingPage, setExistingPage] = useState(1);
    const [pendingTotal, setPendingTotal] = useState(0);
    const [existingTotal, setExistingTotal] = useState(0);
    const reviewsPerPage = 10; // Fetch reviews data
    const fetchReviews = useCallback(
        async (pendingPageNum?: number, existingPageNum?: number) => {
            try {
                setReviewsLoading(true);
                setReviewsError(null);

                const pendingPageToFetch = pendingPageNum ?? pendingPage;
                const existingPageToFetch = existingPageNum ?? existingPage;

                const [pendingRes, existingRes, pendingCountRes, existingCountRes] = await Promise.all([
                    fetch(`/api/reviews?status=pending&page=${pendingPageToFetch}&limit=${reviewsPerPage}`),
                    fetch(`/api/reviews?status=existing&page=${existingPageToFetch}&limit=${reviewsPerPage}`),
                    fetch("/api/reviews/count?status=pending"),
                    fetch("/api/reviews/count?status=approved"),
                ]);

                if (!pendingRes.ok || !existingRes.ok || !pendingCountRes.ok || !existingCountRes.ok) {
                    throw new Error("Failed to fetch reviews");
                }

                const [pendingData, existingData, pendingCount, existingCount] = await Promise.all([
                    pendingRes.json(),
                    existingRes.json(),
                    pendingCountRes.json(),
                    existingCountRes.json(),
                ]);

                setPendingReviews(pendingData);
                setExistingReviews(existingData);
                setPendingTotal(pendingCount);
                setExistingTotal(existingCount);
            } catch (err) {
                setReviewsError(err instanceof Error ? err.message : "Unknown error occurred");
            } finally {
                setReviewsLoading(false);
            }
        },
        [pendingPage, existingPage, reviewsPerPage],
    );
    useEffect(() => {
        fetchReviews();
    }, [fetchReviews]);

    // Pagination handlers
    const handlePendingPageChange = (newPage: number) => {
        setPendingPage(newPage);
        setCurrentReviewIndex(0); // Reset to first review on page change
    };

    const handleExistingPageChange = (newPage: number) => {
        setExistingPage(newPage);
    };

    // Handler functions
    const handleNextReview = () => {
        if (reviewTab === "pending" && currentReviewIndex < pendingReviews.length - 1) {
            setCurrentReviewIndex((prev) => prev + 1);
        }
    };

    const handlePreviousReview = () => {
        if (currentReviewIndex > 0) {
            setCurrentReviewIndex((prev) => prev - 1);
        }
    };

    const handleRefreshReviews = () => {
        fetchReviews();
    };

    return (
        <section className="py-10 bg-gray-50 min-h-screen">
            <Container>
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: theme.fonts.heading }}>Review Management</h1>
                    <p className="text-gray-600">Moderate and manage user testimonials and feedback</p>
                </div>
                {reviewsError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6 font-medium">{reviewsError}</div>
                )}
                <ReviewTabs
                    activeTab={reviewTab}
                    onTabChange={setReviewTab}
                    pendingCount={pendingTotal}
                    existingCount={existingTotal}
                    setCurrentReviewIndex={setCurrentReviewIndex}
                />
                <div className="mt-10">
                    {reviewTab === "pending" ? (
                        <PendingReviewsSection
                            pendingReviews={pendingReviews}
                            currentReviewIndex={currentReviewIndex}
                            onNext={handleNextReview}
                            onPrevious={handlePreviousReview}
                            onRefresh={handleRefreshReviews}
                            currentPage={pendingPage}
                            totalPages={Math.ceil(pendingTotal / reviewsPerPage)}
                            totalCount={pendingTotal}
                            onPageChange={handlePendingPageChange}
                            loading={reviewsLoading}
                        />
                    ) : (
                        <ExistingReviewsSection
                            existingReviews={existingReviews}
                            onRefresh={handleRefreshReviews}
                            currentPage={existingPage}
                            totalPages={Math.ceil(existingTotal / reviewsPerPage)}
                            totalCount={existingTotal}
                            onPageChange={handleExistingPageChange}
                            loading={reviewsLoading}
                        />
                    )}
                </div>
            </Container>
        </section>
    );
}
