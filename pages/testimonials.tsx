import Head from 'next/head';
import { useState } from 'react';
import type { NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import Image from 'next/image';

const Home: NextPage = (props: any) => {
    const ReviewSection = () => {
        const [formData, setFormData] = useState({
            title: '',
            review: '',
            name: ''
        });
        const [submitting, setSubmitting] = useState(false);
        const [submitted, setSubmitted] = useState(false);

        const firstInitial = [
            "Mighty", "Ferocious", "Rapid", "Sweet", "Passionate", "Tender", "Wild", "Gentle",
            "Fierce", "Loving", "Bold", "Dreamy", "Speedy", "Charming", "Smooth", "Dashing", "Sultry",
            "Blazing", "Magnetic", "Steamy", "Divine", "Silky", "Electric", "Velvet", "Golden",
            "Sparkling", "Enchanting", "Quickshot", "Shit-Worthy",
        ];

        const lastInitial = [
            "Lover", "Mistress", "Partner", "Sweetheart", "Darling", "Beau", "Flame", "Cupid",
            "Romeo", "Juliet", "Valentine", "Heartthrob", "Soulmate", "Casanova", "Goddess",
            "Charmer", "Temptress", "Seducer", "Enchantress", "Dreamboat", "Hottie", "Stunner",
            "Knockout", "Bombshell", "Heartbreaker", "Dazzler", "Aphrodite", "Venus"
        ];

        const generateRandomName = () => {
            const firstName = firstInitial[Math.floor(Math.random() * firstInitial.length)];
            const lastName = lastInitial[Math.floor(Math.random() * lastInitial.length)];

            const combinedName = `${firstName} ${lastName}`;

            setFormData(prev => ({
                ...prev,
                name: combinedName
            }));
        };
        const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { name, value } = e.target;

            // Character limits
            const limits = {
                title: 250,
                review: 3000,
                name: 75
            };

            // Enforce character limits
            if (value.length <= limits[name as keyof typeof limits]) {
                setFormData(prev => ({
                    ...prev,
                    [name]: value
                }));
            }
        };

        const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setSubmitting(true);
            try {
                const apiData = {
                    title: formData.title,
                    body: formData.review,
                    author: formData.name
                };

                console.log('Submitting data:', apiData); const response = await fetch('/api/reviews', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(apiData)
                });

                console.log('Response status:', response.status);

                const data = await response.json();
                console.log('Response data:', data);

                if (!response.ok) {
                    throw new Error(data.message || 'Error submitting testimonial');
                }

                setSubmitting(false);
                setSubmitted(true);
                setFormData({
                    title: '',
                    review: '',
                    name: ''
                });

            } catch (error) {
                console.error('Error submitting testimonial:', error);
                alert('Failed to submit your testimonial. Please try again.');
                setSubmitting(false);
            }
        };

        const resetForm = () => {
            setSubmitted(false);
        };

        return (
            <section className="py-12 px-4 bg-pmpink2-500">
                <div className="max-w-4xl mx-auto">

                    <div className="text-center mb-10">
                        <h2 className="text-4xl sm:text-3xl font-dela-gothic text-pmblue-500 lg:text-5xl opacity-100">Share Your Perfect Match Story</h2>
                        <p className="font:semibold mt-4 mx-[10%] sm:mx-0 sm:text-lg text-pmblue-500 sm:leading-relaxed">
                            Your experience matters! By sharing your Perfect Match journey, you help others
                            find their special someone too. Each testimonial brings our community closer together
                            and inspires those still searching.
                        </p>
                        <p className="font:semibold mt-4 mx-[10%] sm:mx-0 sm:text-lg text-pmblue-500 sm:leading-relaxed">
                            Let us know how Perfect Match changed your life, and be part of
                            countless love stories yet to unfold.
                        </p>
                    </div>

                    <div className="bg-pmpink2-500 rounded-lg p-4 sm:p-6 lg:p-8 min-h-[400px] sm:min-h-[500px] flex items-center justify-center">
                        {submitted ? (
                            <div className="text-center">
                                <div className="mb-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto text-pmred-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p className="text-4xl sm:text-3xl font-dela-gothic text-pmred-500 lg:text-5xl opacity-100 mb-4">
                                    Thank you for submitting your testimonial!
                                </p>
                                <p className="sm:text-xl text-pmblue-500 mt-8 mb-8 max-w-2xl mx-auto px-4">
                                    Your story will help inspire others in our community.
                                </p>
                                <button
                                    onClick={resetForm}
                                    className="bg-pmpink-500 hover:bg-pmpink-600 text-pmred-500 font-bold py-3 px-6 text-lg rounded-full focus:outline-none focus:ring focus:ring-pmpink-300 transition-colors duration-200"
                                >
                                    Submit Another Testimonial
                                </button>
                            </div>
                        ) : (

                            <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
                                <div className="mb-4 sm:mb-6">
                                    <label className="block text-pmred-500 text-lg sm:text-xl font-bold mb-2" htmlFor="title">
                                        Title: <span className="text-xs sm:text-sm font-normal">({formData.title.length}/250 characters)</span>
                                    </label>
                                    <input
                                        className="shadow appearance-none border border-pmpink-200 bg-white rounded-full w-full py-2 sm:py-3 px-3 sm:px-4 text-black text-lg sm:text-xl leading-relaxed focus:outline-none focus:ring focus:ring-pmpink-300 focus:border-pmpink-500 min-h-[44px]"
                                        id="title"
                                        name="title"
                                        type="text"
                                        placeholder="Give your testimonial a title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                        maxLength={250}
                                    />
                                </div>

                                <div className="mb-4 sm:mb-6">
                                    <label className="block text-pmred-500 text-lg sm:text-xl font-bold mb-2" htmlFor="review">
                                        Testimonial: <span className="text-xs sm:text-sm font-normal">({formData.review.length}/3000 characters)</span>
                                    </label>
                                    <textarea
                                        className="shadow appearance-none border border-pmpink-200 bg-white rounded-lg w-full py-2 sm:py-3 px-3 sm:px-4 text-black text-lg sm:text-xl leading-relaxed focus:outline-none focus:ring focus:ring-pmpink-300 focus:border-pmpink-500 h-32 sm:h-40 min-h-[120px] resize-y"
                                        id="review"
                                        name="review"
                                        placeholder="Tell us about your experience with Perfect Match"
                                        value={formData.review}
                                        onChange={handleChange}
                                        required
                                        maxLength={3000}
                                    />
                                </div>

                                <div className="mb-4 sm:mb-6">
                                    <label className="block text-pmred-500 text-lg sm:text-xl font-bold mb-2" htmlFor="name">
                                        Name: <span className="text-xs sm:text-sm font-normal">({formData.name.length}/75 characters)</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            className="shadow appearance-none border border-pmpink-200 bg-white rounded-full w-full py-2 sm:py-3 px-3 sm:px-4 pr-12 sm:pr-14 text-black text-lg sm:text-xl leading-relaxed focus:outline-none focus:ring focus:ring-pmpink-300 focus:border-pmpink-500 min-h-[44px]"
                                            id="name"
                                            name="name"
                                            type="text"
                                            placeholder="Your name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            maxLength={75}
                                        />
                                        <button
                                            type="button"
                                            onClick={generateRandomName}
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-pmred-500 hover:bg-red-600 text-white rounded-full px-3 py-1.5 sm:px-4 sm:py-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pmred-300 shadow-md text-xs sm:text-sm font-semibold whitespace-nowrap"
                                            title="Generate random name"
                                        >
                                            Random Name

                                        </button>
                                    </div>
                                </div>

                                {/* Responsive consent notice */}
                                <div className="mb-6 sm:mb-8 p-3 sm:p-4 bg-gradient-to-r from-pmpink-100 to-pmpink2-200 border-2 border-pmpink-300 rounded-xl">
                                    <div className="flex items-start space-x-2 sm:space-x-3">
                                        <div className="flex-shrink-0 mt-0.5 sm:mt-1">
                                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-pmred-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-pmblue-500 text-sm sm:text-base leading-relaxed break-words">
                                                <span className="font-semibold">Please note:</span> By submitting a testimonial, you consent to Perfect Match displaying your testimonial on the home page. All testimonials are subject to review and approval before being published.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-center">
                                    <button
                                        className="bg-pmpink-500 hover:bg-pmpink-600 text-pmred-500 font-bold py-3 sm:py-4 px-6 sm:px-8 text-lg sm:text-xl rounded-full focus:outline-none focus:ring focus:ring-pmpink-300 transition-colors duration-200 w-full sm:w-auto max-w-sm min-h-[48px]"
                                        type="submit"
                                        disabled={submitting}
                                    >
                                        {submitting ? 'Submitting...' : 'Submit Testimonial'}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>

                {/* Add the wavy separator that matches your existing design */}
                <div className="left-0 w-full overflow-hidden mt-12">
                    <svg className="relative block w-full h-[60px] md:hidden"
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none">
                        <path
                            d="M0,60 C40,40 80,80 120,60 C160,40 200,80 240,60 C280,40 320,80 360,60 C400,40 440,80 480,60 C520,40 560,80 600,60 C640,40 680,80 720,60 C760,40 800,80 840,60 C880,40 920,80 960,60 C1000,40 1040,80 1080,60 C1120,40 1160,80 1200,60 V120 H0 Z"
                            fill="#f7a4af"
                        ></path>
                    </svg>
                    <svg className="relative hidden w-full h-[60px] md:block"
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none">
                        <path
                            d="M0,60 C16.67,40 33.33,40 50,60 C66.67,80 83.33,80 100,60 C116.67,40 133.33,40 150,60 C166.67,80 183.33,80 200,60 C216.67,40 233.33,40 250,60 C266.67,80 283.33,80 300,60 C316.67,40 333.33,40 350,60 C366.67,80 383.33,80 400,60 C416.67,40 433.33,40 450,60 C466.67,80 483.33,80 500,60 C516.67,40 533.33,40 550,60 C566.67,80 583.33,80 600,60 C616.67,40 633.33,40 650,60 C666.67,80 683.33,80 700,60 C716.67,40 733.33,40 750,60 C766.67,80 783.33,80 800,60 C816.67,40 833.33,40 850,60 C866.67,80 883.33,80 900,60 C916.67,40 933.33,40 950,60 C966.67,80 983.33,80 1000,60 C1016.67,40 1033.33,40 1050,60 C1066.67,80 1083.33,80 1100,60 C1116.67,40 1133.33,40 1150,60 C1166.67,80 1183.33,80 1200,60 V120 H0 Z"
                            fill="#f7a4af"
                        ></path>
                    </svg>
                </div>
            </section >
        );
    };

    return (
        <div>
            <Head>
                <title>Perfect Match</title>
                <meta name="description" content="Find your Perfect Match" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className="bg-pmpink-500">
                <div className="w-full bg-pmpink-500"></div>
                <div className="left-0 w-full overflow-hidden">
                    <svg className="relative block w-full h-[60px] md:hidden" // Adjust height as needed
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none">
                        <path
                            d="M0,60 C40,40 80,80 120,60 C160,40 200,80 240,60 C280,40 320,80 360,60 C400,40 440,80 480,60 C520,40 560,80 600,60 C640,40 680,80 720,60 C760,40 800,80 840,60 C880,40 920,80 960,60 C1000,40 1040,80 1080,60 C1120,40 1160,80 1200,60 V120 H0 Z"
                            fill="#f7a4af"
                        ></path>
                    </svg>
                    <svg className="relative hidden w-full h-[60px] md:block" // Adjust height as needed
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none">
                        <path
                            d="M0,60 C16.67,40 33.33,40 50,60 C66.67,80 83.33,80 100,60 C116.67,40 133.33,40 150,60 C166.67,80 183.33,80 200,60 C216.67,40 233.33,40 250,60 C266.67,80 283.33,80 300,60 C316.67,40 333.33,40 350,60 C366.67,80 383.33,80 400,60 C416.67,40 433.33,40 450,60 C466.67,80 483.33,80 500,60 C516.67,40 533.33,40 550,60 C566.67,80 583.33,80 600,60 C616.67,40 633.33,40 650,60 C666.67,80 683.33,80 700,60 C716.67,40 733.33,40 750,60 C766.67,80 783.33,80 800,60 C816.67,40 833.33,40 850,60 C866.67,80 883.33,80 900,60 C916.67,40 933.33,40 950,60 C966.67,80 983.33,80 1000,60 C1016.67,40 1033.33,40 1050,60 C1066.67,80 1083.33,80 1100,60 C1116.67,40 1133.33,40 1150,60 C1166.67,80 1183.33,80 1200,60 V120 H0 Z"
                            fill="#f7a4af"
                        ></path>
                    </svg>
                </div>
            </div>
            <div className="absolute left-[-3vw] top-12 h-screen w-[18vw] hidden lg:block z-20 pointer-events-none">
                <Image src="/left_hearts.svg" alt="left hearts" layout='fill' priority={true} draggable='false' />
            </div>
            <div className="absolute right-0 top-0 translate-y-[200px] h-screen w-[8vw] hidden lg:block z-20 pointer-events-none">
                <Image src="/right_hearts.svg" alt="right hearts" layout='fill' priority={true} draggable='false' />
            </div>



            <div className="min-h-screen mt-0">
                <ReviewSection />
            </div>

            <div className="w-full overflow-hidden bg-pmpink2-500 mt-[-1px]">
                <svg className="w-full h-[60px] md:hidden block"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none">
                    <path
                        d="M0,60 C40,40 80,80 120,60 C160,40 200,80 240,60 C280,40 320,80 360,60 C400,40 440,80 480,60 C520,40 560,80 600,60 C640,40 680,80 720,60 C760,40 800,80 840,60 C880,40 920,80 960,60 C1000,40 1040,80 1080,60 C1120,40 1160,80 1200,60 V120 H0 Z"
                        fill="#fce5f3"
                    ></path>
                </svg>
                <svg className="hidden w-full h-[60px] md:block"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none">
                    <path
                        d="M0,60 C16.67,40 33.33,40 50,60 C66.67,80 83.33,80 100,60 C116.67,40 133.33,40 150,60 C166.67,80 183.33,80 200,60 C216.67,40 233.33,40 250,60 C266.67,80 283.33,80 300,60 C316.67,40 333.33,40 350,60 C366.67,80 383.33,80 400,60 C416.67,40 433.33,40 450,60 C466.67,80 483.33,80 500,60 C516.67,40 533.33,40 550,60 C566.67,80 583.33,80 600,60 C616.67,40 633.33,40 650,60 C666.67,80 683.33,80 700,60 C716.67,40 733.33,40 750,60 C766.67,80 783.33,80 800,60 C816.67,40 833.33,40 850,60 C866.67,80 883.33,80 900,60 C916.67,40 933.33,40 950,60 C966.67,80 983.33,80 1000,60 C1016.67,40 1033.33,40 1050,60 C1066.67,80 1083.33,80 1100,60 C1116.67,40 1133.33,40 1150,60 C1166.67,80 1183.33,80 1200,60 V120 H0 Z"
                        fill="#fce5f3"
                    ></path>
                </svg>
            </div>

            <div className="bg-[#fce5f3]">
                <Footer />
            </div>
        </div >
    );
};

export async function getServerSideProps(context: any) {
    const session = await getSession(context);
    return {
        props: {
            user: session?.user || null,
        },
    };
}

export default Home;