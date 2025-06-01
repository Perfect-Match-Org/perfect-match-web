import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Header } from '@/components/header';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { isAdmin } from '@/utils/admins';
import { Container } from '@/components/testimonials/Container'
interface PendingReview {
    id: string;
    title: string;
    body: string;
    author: string;
}

export default function PendingReviews() {
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [pendingReviews, setPendingReviews] = useState<PendingReview[]>([]);
    const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
    const [actionLoading, setActionLoading] = useState(false);
    const router = useRouter();
    const navItems = [["Dashboard", "/admin"], ["API-Docs", "/api-docs"], ["Pending Reviews", "/pending-reviews"]];

    // Admin check
    useEffect(() => {
        if (session) {
            if (!isAdmin(session.user?.email!)) {
                router.push('/');
            }
        }
    }, [session, router]);

    // Fetch pending reviews from backend
    useEffect(() => {
        if (status === 'authenticated') {
            fetchPendingReviews();
        }
    }, [status]);

    const fetchPendingReviews = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch('/api/reviews/pending-review');

            if (!response.ok) {
                throw new Error(`Failed to fetch reviews: ${response.statusText}`);
            }

            const reviews = await response.json();
            setPendingReviews(reviews);
            setCurrentReviewIndex(0);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch pending reviews');
        } finally {
            setLoading(false);
        }
    };


    const approveReview = async (id: string) => {
        try {
            setActionLoading(true);
            setError(null);

            const response = await fetch(`/api/reviews/approve-review`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });

            if (!response.ok) {
                throw new Error(`Failed to approve review: ${response.statusText}`);
            }

            // Remove the approved review from the list
            setPendingReviews((reviews) => reviews.filter((r) => r.id !== id));

            // Adjust current index if needed
            if (currentReviewIndex >= pendingReviews.length - 1 && pendingReviews.length > 1) {
                setCurrentReviewIndex(0);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to approve review');
        } finally {
            setActionLoading(false);
        }
    };

    const rejectReview = async (id: string) => {
        try {
            setActionLoading(true);
            setError(null);

            const response = await fetch(`/api/reviews/reject-review`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });

            if (!response.ok) {
                throw new Error(`Failed to reject review: ${response.statusText}`);
            }

            // Remove the rejected review from the list
            setPendingReviews((reviews) => reviews.filter((r) => r.id !== id));

            // Adjust current index if needed
            if (currentReviewIndex >= pendingReviews.length - 1 && pendingReviews.length > 1) {
                setCurrentReviewIndex(0);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to reject review');
        } finally {
            setActionLoading(false);
        }
    };

    // Function to navigate to next review
    const nextReview = () => {
        if (currentReviewIndex < pendingReviews.length - 1) {
            setCurrentReviewIndex(currentReviewIndex + 1);
        }
    };

    // Function to navigate to previous review
    const previousReview = () => {
        if (currentReviewIndex > 0) {
            setCurrentReviewIndex(currentReviewIndex - 1);
        }
    };

    // Ensure index is valid when reviews change
    useEffect(() => {
        if (currentReviewIndex >= pendingReviews.length && pendingReviews.length > 0) {
            setCurrentReviewIndex(pendingReviews.length - 1);
        }
    }, [pendingReviews.length, currentReviewIndex]);

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pmred-500"></div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 p-4">
                <div className="bg-red-50 text-pmred-500 p-4 rounded-lg">
                    <p className="font-semibold">Error:</p>
                    <p>{error}</p>
                    <button
                        onClick={fetchPendingReviews}
                        className="mt-2 px-4 py-2 bg-pmred-500 text-white rounded hover:bg-red-600"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className='bg-gray-50 min-h-screen'>
            <Header />
            {/* Admin navigation section */}
            <nav className="bg-rose-50 shadow-sm">
                <ul className='flex gap-8 py-4 px-4 md:px-8 lg:px-12 text-gray-700'>
                    {navItems.map(([name, path], index) => (
                        <li key={index}>
                            <Link href={path}>
                                <a className='hover:text-rose-400 transition-all duration-300 ease-in-out 
                                relative hover:after:w-full after:content-[""] after:bg-text-rose-400 after:absolute after:bottom-0 after:left-0 
                                after:h-[2px] after:w-0 after:transition-all after:duration-300'>{name}</a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Content section */}
            <section
                id="approvals"
                aria-labelledby="approvals-title"
                className="pt-6 pb-8 sm:pt-10 sm:pb-12 bg-pmpink2-500 min-h-[calc(100vh-110px)]"
            >
                <Container>
                    <h1
                        id="approvals-title"
                        className="text-4xl text-pmred-500 font-extrabold sm:text-4xl sm:text-center font-dela-gothic mb-8"
                    >
                        Pending Reviews
                    </h1>

                    <div className="flex flex-col items-center mt-10 space-y-8">
                        {pendingReviews.length === 0 ? (
                            <div className="text-center">
                                <p className="text-xl text-gray-700 mb-4">No pending reviews.</p>
                                <button
                                    onClick={fetchPendingReviews}
                                    className="px-4 py-2 bg-pmblue-500 text-white rounded-lg hover:bg-blue-600"
                                >
                                    Refresh
                                </button>
                            </div>
                        ) : (
                            <>
                                {/* Review counter */}
                                <p className="text-xl text-gray-700 font-semibold mb-4">
                                    Review {currentReviewIndex + 1} of {pendingReviews.length}
                                </p>

                                {/* Current review card */}
                                <div
                                    key={pendingReviews[currentReviewIndex].id}
                                    className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8 border-2 border-pmblue-500"
                                >
                                    <div className="mb-6">
                                        <p className="text-2xl font-bold mb-3 text-gray-900">Title:</p>
                                        <p className="text-xl text-gray-800">{pendingReviews[currentReviewIndex].title}</p>
                                    </div>

                                    <div className="mb-6">
                                        <p className="text-2xl font-bold mb-3 text-gray-900">Review:</p>
                                        <p className="text-xl text-gray-800">{pendingReviews[currentReviewIndex].body}</p>
                                    </div>

                                    <div className="mb-6">
                                        <p className="text-2xl font-bold mb-3 text-gray-900">Name:</p>
                                        <p className="text-xl text-gray-800">{pendingReviews[currentReviewIndex].author}</p>
                                    </div>

                                    <div className="flex justify-center space-x-6 mt-6">
                                        <button
                                            className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition w-32 disabled:opacity-50 disabled:cursor-not-allowed"
                                            onClick={() => approveReview(pendingReviews[currentReviewIndex].id)}
                                            disabled={actionLoading}
                                        >
                                            {actionLoading ? 'Loading...' : 'Approve'}
                                        </button>
                                        <button
                                            className="px-6 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition w-32 disabled:opacity-50 disabled:cursor-not-allowed"
                                            onClick={() => rejectReview(pendingReviews[currentReviewIndex].id)}
                                            disabled={actionLoading}
                                        >
                                            {actionLoading ? 'Loading...' : 'Reject'}
                                        </button>
                                    </div>
                                </div>

                                {/* Navigation buttons */}
                                <div className="flex justify-center space-x-6 mt-6">
                                    <button
                                        className={`px-6 py-3 bg-pmblue-500 text-white font-bold rounded-lg transition w-32 ${currentReviewIndex === 0 || actionLoading
                                            ? 'opacity-50 cursor-not-allowed'
                                            : 'hover:bg-blue-600'
                                            }`}
                                        onClick={previousReview}
                                        disabled={currentReviewIndex === 0 || actionLoading}
                                    >
                                        Previous
                                    </button>
                                    <button
                                        className={`px-6 py-3 bg-pmblue-500 text-white font-bold rounded-lg transition w-32 ${currentReviewIndex === pendingReviews.length - 1 || actionLoading
                                            ? 'opacity-50 cursor-not-allowed'
                                            : 'hover:bg-blue-600'
                                            }`}
                                        onClick={nextReview}
                                        disabled={currentReviewIndex === pendingReviews.length - 1 || actionLoading}
                                    >
                                        Next
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </Container>
            </section>
        </div>
    );
}