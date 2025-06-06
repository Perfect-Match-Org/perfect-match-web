import { useState, useEffect } from 'react';
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
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [reviewTab, setReviewTab] = useState<'pending' | 'existing'>('pending');    // Fetch reviews data
    const fetchReviews = async () => {
        try {
            setReviewsLoading(true);
            setReviewsError(null);

            const [pendingRes, existingRes] = await Promise.all([
                fetch('/api/reviews?status=pending'),
                fetch('/api/reviews?status=existing')
            ]);

            if (!pendingRes.ok || !existingRes.ok) {
                throw new Error('Failed to fetch reviews');
            }

            const [pendingData, existingData] = await Promise.all([
                pendingRes.json(),
                existingRes.json()
            ]);

            setPendingReviews(pendingData);
            setExistingReviews(existingData);
        } catch (err) {
            setReviewsError(err instanceof Error ? err.message : 'Unknown error occurred');
        } finally {
            setReviewsLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    // Handler functions
    const handleTabChange = (tab: 'pending' | 'existing') => {
        setReviewTab(tab);
        setCurrentReviewIndex(0);
    }; const handleApproveReview = async (id: string) => {
        try {
            setActionLoading(id);
            const response = await fetch(`/api/reviews/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ action: 'approve' })
            });

            if (!response.ok) {
                throw new Error('Failed to approve review');
            }

            // Remove from pending and add to existing
            const approvedReview = pendingReviews.find(r => r.id === id);
            if (approvedReview) {
                setPendingReviews(prev => prev.filter(r => r.id !== id));
                setExistingReviews(prev => [...prev, approvedReview]);

                // Adjust current index if needed
                if (currentReviewIndex >= pendingReviews.length - 1) {
                    setCurrentReviewIndex(Math.max(0, pendingReviews.length - 2));
                }
            }
        } catch (err) {
            setReviewsError(err instanceof Error ? err.message : 'Failed to approve review');
        } finally {
            setActionLoading(null);
        }
    }; const handleRejectReview = async (id: string) => {
        try {
            setActionLoading(id);
            const response = await fetch(`/api/reviews/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ action: 'reject' })
            });

            if (!response.ok) {
                throw new Error('Failed to reject review');
            }

            // Remove from pending
            setPendingReviews(prev => prev.filter(r => r.id !== id));

            // Adjust current index if needed
            if (currentReviewIndex >= pendingReviews.length - 1) {
                setCurrentReviewIndex(Math.max(0, pendingReviews.length - 2));
            }
        } catch (err) {
            setReviewsError(err instanceof Error ? err.message : 'Failed to reject review');
        } finally {
            setActionLoading(null);
        }
    }; const handleDeleteReview = async (id: string) => {
        try {
            setActionLoading(id);
            const response = await fetch(`/api/reviews/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete review');
            }

            // Remove from existing
            setExistingReviews(prev => prev.filter(r => r.id !== id));
        } catch (err) {
            setReviewsError(err instanceof Error ? err.message : 'Failed to delete review');
        } finally {
            setActionLoading(null);
        }
    };

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
    if (reviewsLoading) {
        return (
            <section className="pt-6 pb-8 sm:pt-10 sm:pb-12 bg-pmpink2-500 min-h-[calc(100vh-110px)]">
                <Container>
                    <div className="flex justify-center items-center min-h-[50vh]">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pmred-500"></div>
                    </div>
                </Container>
            </section>
        );
    }

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
                    onTabChange={handleTabChange}
                    pendingCount={pendingReviews.length}
                    existingCount={existingReviews.length}
                />

                <div className="mt-10">
                    {reviewTab === 'pending' ? (
                        <PendingReviewsSection
                            pendingReviews={pendingReviews}
                            currentReviewIndex={currentReviewIndex}
                            actionLoading={actionLoading}
                            onApprove={handleApproveReview}
                            onReject={handleRejectReview}
                            onNext={handleNextReview}
                            onPrevious={handlePreviousReview}
                            onRefresh={handleRefreshReviews}
                        />
                    ) : (
                        <ExistingReviewsSection
                            existingReviews={existingReviews}
                            actionLoading={actionLoading}
                            onDelete={handleDeleteReview}
                            onRefresh={handleRefreshReviews}
                        />
                    )}
                </div>
            </Container>
        </section>
    );
}
