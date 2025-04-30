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

        const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { name, value } = e.target;
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        };

        const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setSubmitting(true);

            // Backend submission will be added later
            console.log('Form submitted:', formData);

            setTimeout(() => {
                setSubmitting(false);
                setSubmitted(true);
                setFormData({
                    title: '',
                    review: '',
                    name: ''
                });
            }, 1000);
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
                            find their special someone too. Each review brings our community closer together
                            and inspires those still searching.
                        </p>
                        <p className="font:semibold mt-4 mx-[10%] sm:mx-0 sm:text-lg text-pmblue-500 sm:leading-relaxed">
                            Let us know how Perfect Match changed your life, and be part of
                            countless love stories yet to unfold.
                        </p>
                    </div>

                    <div className="bg-pmpink2-500 rounded-lg p-8 min-h-[500px] flex items-center justify-center">
                        {submitted ? (
                            <div className="text-center">
                                <div className="mb-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto text-pmred-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p className="text-4xl sm:text-3xl font-dela-gothic text-pmred-500 lg:text-5xl opacity-100 mb-4">
                                    Thank you for submitting your review!
                                </p>
                                <p className="sm:text-xl text-pmblue-500 mt-8 mb-8 max-w-2xl mx-auto px-4">
                                    Your story will help inspire others in our community.
                                </p>
                                <button
                                    onClick={resetForm}
                                    className="bg-pmpink-500 hover:bg-pmpink-600 text-pmred-500 font-bold py-3 px-6 text-lg rounded-full focus:outline-none focus:ring focus:ring-pmpink-300 transition-colors duration-200"
                                >
                                    Submit Another Review
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="w-full">
                                <div className="mb-6">
                                    <label className="block text-pmred-500 text-xl font-bold mb-2" htmlFor="title">
                                        Title:
                                    </label>
                                    <input
                                        className="shadow appearance-none border border-pmpink-200 bg-white rounded-full w-full py-3 px-4 text-black text-xl leading-relaxed focus:outline-none focus:ring focus:ring-pmpink-300 focus:border-pmpink-500"
                                        id="title"
                                        name="title"
                                        type="text"
                                        placeholder="Give your review a title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                        style={{ fontSize: '1.25rem' }}
                                    />
                                </div>

                                <div className="mb-6">
                                    <label className="block text-pmred-500 text-xl font-bold mb-2" htmlFor="review">
                                        Review:
                                    </label>
                                    <textarea
                                        className="shadow appearance-none border border-pmpink-200 bg-white rounded-lg w-full py-3 px-4 text-black text-xl leading-relaxed focus:outline-none focus:ring focus:ring-pmpink-300 focus:border-pmpink-500 h-40"
                                        id="review"
                                        name="review"
                                        placeholder="Tell us about your experience with Perfect Match"
                                        value={formData.review}
                                        onChange={handleChange}
                                        required
                                        style={{ fontSize: '1.25rem' }}
                                    />
                                </div>

                                <div className="mb-6">
                                    <label className="block text-pmred-500 text-xl font-bold mb-2" htmlFor="name">
                                        Name:
                                    </label>
                                    <input
                                        className="shadow appearance-none border border-pmpink-200 bg-white rounded-full w-full py-3 px-4 text-black text-xl leading-relaxed focus:outline-none focus:ring focus:ring-pmpink-300 focus:border-pmpink-500"
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Your name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        style={{ fontSize: '1.25rem' }}
                                    />
                                </div>

                                <div className="flex items-center justify-center">
                                    <button
                                        className="bg-pmpink-500 hover:bg-pmpink-600 text-pmred-500 font-bold py-4 px-8 text-xl rounded-full focus:outline-none focus:ring focus:ring-pmpink-300 transition-colors duration-200 w-full sm:w-auto"
                                        type="submit"
                                        disabled={submitting}
                                    >
                                        {submitting ? 'Submitting...' : 'Submit Review'}
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
            </section>
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