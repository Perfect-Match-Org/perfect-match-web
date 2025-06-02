import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Header } from '@/components/header';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { isAdmin } from '@/utils/admins';
import { Container } from '@/components/testimonials/Container'

interface ExistingReview {
    id: string;
    title: string;
    body: string;
    author: string;
}

export default function ExistingReviews() {
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [existingReviews, setExistingReviews] = useState<ExistingReview[]>([]);
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const router = useRouter();
    const navItems = [["Dashboard", "/admin"], ["API-Docs", "/api-docs"], ["Pending Reviews", "/pending-reviews"], ["Existing Reviews", "/existing-reviews"]];

    // Admin check
    useEffect(() => {
        if (session) {
            if (!isAdmin(session.user?.email!)) {
                router.push('/');
            }
        }
    }, [session, router]);

    // Fetch existing reviews from backend
    useEffect(() => {
        if (status === 'authenticated') {
            fetchExistingReviews();
        }
    }, [status]);

    const fetchExistingReviews = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch('/api/reviews/approved');
            if (!response.ok) {
                throw new Error(`Failed to fetch reviews: ${response.statusText}`);
            }
            const reviews = await response.json();
            setExistingReviews(reviews);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch existing reviews');
        } finally {
            setLoading(false);
        }
    };

    const deleteApprovedReview = async (id: string) => {
        try {
            setActionLoading(id); // Set loading for this specific review
            setError(null);

            const response = await fetch('/api/reviews/delete-review', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });

            if (!response.ok) {
                throw new Error(`Failed to delete review: ${response.statusText}`);
            }

            // Remove the deleted review from the list
            setExistingReviews(reviews => reviews.filter(review => review.id !== id));

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete review');
        } finally {
            setActionLoading(null);
        }
    };

    if (loading) {
        return (
            <div className='bg-gray-50 min-h-screen'>
                <Header />
                <div className="flex justify-center items-center min-h-[50vh]">
                    <div className="text-xl text-gray-700">Loading reviews...</div>
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
                id="existing-reviews"
                aria-labelledby="existing-reviews-title"
                className="pt-6 pb-8 sm:pt-10 sm:pb-12 bg-pmpink2-500 min-h-[calc(100vh-110px)]"
            >
                <Container>
                    <h1
                        id="existing-reviews-title"
                        className="text-4xl text-pmred-500 font-extrabold sm:text-4xl sm:text-center font-dela-gothic mb-8"
                    >
                        Existing Reviews ({existingReviews.length})
                    </h1>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                            {error}
                        </div>
                    )}

                    <div className="space-y-6">
                        {existingReviews.length === 0 ? (
                            <div className="text-center">
                                <p className="text-xl text-gray-700 mb-4">No existing reviews found.</p>
                                <button
                                    onClick={fetchExistingReviews}
                                    className="px-4 py-2 bg-pmblue-500 text-white rounded-lg hover:bg-blue-600"
                                >
                                    Refresh
                                </button>
                            </div>
                        ) : (
                            existingReviews.map((review) => (
                                <div
                                    key={review.id}
                                    className="bg-white rounded-xl shadow-lg p-6 border-2 border-pmblue-500"
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <div className="mb-4">
                                                <p className="text-lg font-bold mb-2 text-gray-900">Title:</p>
                                                <p className="text-gray-800">{review.title}</p>
                                            </div>

                                            <div className="mb-4">
                                                <p className="text-lg font-bold mb-2 text-gray-900">Review:</p>
                                                <p className="text-gray-800">{review.body}</p>
                                            </div>

                                            <div className="mb-4">
                                                <p className="text-lg font-bold mb-2 text-gray-900">Author:</p>
                                                <p className="text-gray-800">{review.author}</p>
                                            </div>
                                        </div>

                                        <div className="ml-6">
                                            <button
                                                className="px-4 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                                onClick={() => deleteApprovedReview(review.id)}
                                                disabled={actionLoading === review.id}
                                            >
                                                {actionLoading === review.id ? 'Deleting...' : 'Delete'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </Container>
            </section>
        </div>
    );
}