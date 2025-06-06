import { useState, useEffect, useCallback } from 'react';
import { Container } from '@/components/testimonials/Container';
import ReviewTabs from './reviewTabs';
import PendingReviewsSection from './pendingReview';
import ExistingReviewsSection from './existingReviews';

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
    const [reviewTab, setReviewTab] = useState<'pending' | 'existing'>('pending');

    // Pagination state
    const [pendingPage, setPendingPage] = useState(1);
    const [existingPage, setExistingPage] = useState(1);
    const [pendingTotal, setPendingTotal] = useState(0);
    const [existingTotal, setExistingTotal] = useState(0);
    const reviewsPerPage = 10;    // Fetch reviews data
    const fetchReviews = useCallback(async (pendingPageNum?: number, existingPageNum?: number) => {
        try {
            setReviewsLoading(true);
            setReviewsError(null);

            const pendingPageToFetch = pendingPageNum ?? pendingPage;
            const existingPageToFetch = existingPageNum ?? existingPage;

            const [pendingRes, existingRes, pendingCountRes, existingCountRes] = await Promise.all([
                fetch(`/api/reviews?status=pending&page=${pendingPageToFetch}&limit=${reviewsPerPage}`),
                fetch(`/api/reviews?status=existing&page=${existingPageToFetch}&limit=${reviewsPerPage}`),
                fetch('/api/reviews/count?status=pending'),
                fetch('/api/reviews/count?status=approved')
            ]);

            if (!pendingRes.ok || !existingRes.ok || !pendingCountRes.ok || !existingCountRes.ok) {
                throw new Error('Failed to fetch reviews');
            }

            const [pendingData, existingData, pendingCount, existingCount] = await Promise.all([
                pendingRes.json(),
                existingRes.json(),
                pendingCountRes.json(),
                existingCountRes.json()
            ]);

            setPendingReviews(pendingData);
            setExistingReviews(existingData);
            setPendingTotal(pendingCount);
            setExistingTotal(existingCount);
        } catch (err) {
            setReviewsError(err instanceof Error ? err.message : 'Unknown error occurred');
        } finally {
            setReviewsLoading(false);
        }
    }, [pendingPage, existingPage, reviewsPerPage]); useEffect(() => {
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
        if (reviewTab === 'pending' && currentReviewIndex < pendingReviews.length - 1) {
            setCurrentReviewIndex(prev => prev + 1);
        }
    };

    const handlePreviousReview = () => {
        if (currentReviewIndex > 0) {
            setCurrentReviewIndex(prev => prev - 1);
        }
    };

    const handleRefreshReviews = () => {
        fetchReviews();
    };

    return (
        <section className="pt-6 pb-8 sm:pt-10 sm:pb-12 bg-pmpink2-500 min-h-[calc(100vh-110px)]">
            <Container>
                <h1 className="text-4xl text-pmred-500 font-extrabold sm:text-4xl sm:text-center font-dela-gothic mb-8">
                    Review Management
                </h1>

                {reviewsError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                        {reviewsError}
                    </div>
                )}                <ReviewTabs
                    activeTab={reviewTab}
                    onTabChange={setReviewTab}
                    pendingCount={pendingTotal}
                    existingCount={existingTotal}
                    setCurrentReviewIndex={setCurrentReviewIndex}
                />

                <div className="mt-10">                    {reviewTab === 'pending' ? (
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
                ) : (<ExistingReviewsSection
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
