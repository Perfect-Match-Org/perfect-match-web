import Head from 'next/head';
import type { NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { Footer } from '@/components/footer';
import PhotoGallery from '@/components/photos';
import ValentinesCountdown from '@/components/valentines_countdown';
import { GoogleAuth } from '@/components/general';
import { Header } from '@/components/header';
import { fetcher } from '@/utils/fetch';
import useSWR from 'swr';
import Link from 'next/link';


const galleryPhotos = [
    {
        src: "/levelb/image1.jpg",
        alt: "Level B x Perfect Match Party"
    },
    {
        src: "/levelb/image2.jpg",

        alt: "Level B x Perfect Match Party"
    },
    {
        src: "/levelb/image3.jpg",
        alt: "Level B x Perfect Match Party"
    },
    {
        src: "/levelb/image4.jpg",
        alt: "Level B x Perfect Match Party"
    },
    {
        src: "/levelb/image5.jpg",
        alt: "Level B x Perfect Match Party"
    },
    {
        src: "/levelb/image6.jpg",
        alt: "Level B x Perfect Match Party"
    }
    ,
    {
        src: "/levelb/image7.jpg",
        alt: "Level B x Perfect Match Party"
    }
];

const Home: NextPage = (props: any) => {
    const { data: currentCount, error } = useSWR('/api/count', fetcher, {
        refreshInterval: 60000,
    });
    return (
        <div>
            <Head>
                <title>Perfect Match</title>
                <meta name="description" content="Find your Perfect Match" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            {/*
            <div className="bg-pink-100">
                <div className="py-2 px-3 sm:py-3 flex">
                    <div className="flex flex-wrap items-center sm:mx-auto">
                        <div>
                            <p className="ml-2 font-lg text-gray-500 sm:text-xl pb-1">
                                <strong>❗PM24 Special❗</strong>
                                Let us help you{' '}
                                <Link href="/profile#crushes">
                                    <strong className="text-rose-400 underline hover:text-rose-500 hover:cursor-pointer">
                                        Nudge Your Crush
                                    </strong>
                                </Link>{' '}
                                with an anonymous hint 💌!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            */}



            <section className="bg-white flex flex-col pr-0 lg:pr-32 xl:pr-40 xl:pl-8 lg:flex-row">

                <div className="lg:mt-16 mt-0 mb-8 mx-auto hidden sm:block">
                    <ValentinesCountdown />
                </div>
                <div className="mt-0 mb-8 mx-auto sm:hidden">
                    <ValentinesCountdown />
                </div>
                <div className="pb-6 pt-8 sm:pt-20 lg:pt-44 lg:pb-36 lg:w-2/3 lg:pr-3">
                    <div className="container mx-auto px-4">
                        <PhotoGallery
                            photos={galleryPhotos}
                            autoPlayInterval={4000}
                        />
                    </div>
                </div>
            </section>
            <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-extrabold text-rose-400 mb-6 text-center">
                        What is Perfect Match?
                    </h2>
                    <div className="bg-white shadow-lg rounded-lg p-8">
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Perfect Match is a matchmaking service exclusively for Cornell students.
                            Our unique approach leverages sophisticated machine learning algorithms to create
                            meaningful connections based on comprehensive survey responses.
                        </p>
                        <div className="mt-6 space-y-4">
                            <div className="flex items-start">
                                <svg className="h-6 w-6 text-rose-500 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <p className="text-gray-700">
                                    The survey opens in early February each year, attracting thousands of participants
                                    eager to find their Perfect Match.
                                </p>
                            </div>
                            <div className="flex items-start">
                                <svg className="h-6 w-6 text-rose-500 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                </svg>
                                <p className="text-gray-700">
                                    Matches are revealed by Valentine Day and participants are encouraged to reach out to their matches.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <Footer />
        </div>
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
