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
    const router = useRouter();
    const navItems = [["Dashboard", "/admin"], ["API-Docs", "/api-docs"], ["Pending Reviews", "/pending-reviews"]];

    // A lot of stuff is related to backend yet which hasn't been implemented
    // So I commented out the backend related stuff and just hardcoded in
    // Examples of what should happen and whatnot.
    const [pendingReviews, setPendingReviews] = useState<PendingReview[]>([
        { id: '1', title: 'Great app!', body: 'Loved it.', author: 'John' },
        {
            "id": "2",
            "title": "Amazing experience",
            "body": "Found my soulmate on this platform after months of trying other dating apps with no success! From the moment we matched, I knew there was something different about our connection. Our first conversation flowed effortlessly for hours, discussing everything from childhood memories to future dreams. When we finally met in person at a cozy downtown café, it felt like reuniting with an old friend rather than meeting a stranger. The butterflies in my stomach confirmed what I already suspected—this was special. Six months later, we're planning our future together and I couldn't be happier. The algorithm on this app truly works! Unlike other platforms that seem to match based solely on superficial traits, this one captured something deeper about our personalities and values. What I appreciate most is how the interface encouraged meaningful conversation from the start, rather than the shallow small talk that dominates other apps. For anyone feeling discouraged in their search for genuine connection, don't give up! Sometimes the right person comes along when you least expect it. Forever grateful that I gave this platform one last try before deleting dating apps altogether. Worth every penny of the subscription fee!",
            "author": "Jane"
        },
        { id: '3', title: 'Life changing platform', body: 'Met my perfect match in just 2 weeks. The algorithm is amazing!', author: 'Mike S.' },
        {
            id: '4', title: 'Best dating app ever', body: 'I was skeptical at first but now I am getting married to someone I met here!', author: 'Sarah'
        },
        { id: '5', title: 'Thank you Perfect Match!', body: 'After years of failed relationships, I finally found someone who truly understands me.', author: 'Alex P.' },
    ]);

    // Add state to track the current review index
    const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

    // Admin check
    useEffect(() => {
        if (session) {
            if (!isAdmin(session.user?.email!)) {
                router.push('/');
            }
        }
    }, [session, router]);

    // Loading state
    useEffect(() => {
        if (status === 'authenticated') {
            // In future, fetch reviews from backend here
            setLoading(false);
        }
    }, [status]);

    async function approveReview(id: string) {
        console.log("Approved review with ID:", id);
        //commented out as backend endpoints aren't set yet
        // await fetch(`/api/approve-review?id=${id}`, { method: 'POST' });

        //Simulation code to remove it from list. To be removed
        setPendingReviews((reviews) => reviews.filter((r) => r.id !== id));
        alert(`Review by ${pendingReviews.find(r => r.id === id)?.author} approved!`);

        // Reset index if we're at the end and there are still reviews left
        if (currentReviewIndex >= pendingReviews.length - 1 && pendingReviews.length > 1) {
            setCurrentReviewIndex(0);
        }
    }

    async function rejectReview(id: string) {
        console.log("Denied review with ID:", id);
        //commented out as backend endpoints aren't set yet
        // await fetch(`api/reject-review?id=${id}`, {method: 'POST'});

        //Removes review from list
        setPendingReviews((reviews) => reviews.filter((r) => r.id !== id));
        alert(`Review by ${pendingReviews.find(r => r.id === id)?.author} rejected.`);

        if (currentReviewIndex >= pendingReviews.length - 1 && pendingReviews.length > 1) {
            setCurrentReviewIndex(0);
        }
    }

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
                    {error}
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

            {/* Content section with the new background color */}
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
                            <p className="text-xl text-gray-700">No pending reviews.</p>
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
                                            className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition w-32"
                                            onClick={() => approveReview(pendingReviews[currentReviewIndex].id)}
                                        >
                                            Approve
                                        </button>
                                        <button
                                            className="px-6 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition w-32"
                                            onClick={() => rejectReview(pendingReviews[currentReviewIndex].id)}
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </div>

                                {/* Navigation buttons */}
                                <div className="flex justify-center space-x-6 mt-6">
                                    <button
                                        className={`px-6 py-3 bg-pmblue-500 text-white font-bold rounded-lg transition w-32 ${currentReviewIndex === 0
                                            ? 'opacity-50 cursor-not-allowed'
                                            : 'hover:bg-blue-600'
                                            }`}
                                        onClick={previousReview}
                                        disabled={currentReviewIndex === 0}
                                    >
                                        Previous
                                    </button>
                                    <button
                                        className={`px-6 py-3 bg-pmblue-500 text-white font-bold rounded-lg transition w-32 ${currentReviewIndex === pendingReviews.length - 1
                                            ? 'opacity-50 cursor-not-allowed'
                                            : 'hover:bg-blue-600'
                                            }`}
                                        onClick={nextReview}
                                        disabled={currentReviewIndex === pendingReviews.length - 1}
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