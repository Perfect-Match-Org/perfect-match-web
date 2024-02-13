import Head from 'next/head';
import type { NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { Footer } from '@/components/footer';
import { GoogleAuth } from '@/components/general';
import { Header } from '@/components/header';
import { fetcher } from '@/utils/fetch';
import useSWR from 'swr';
import styles from '@/styles/Home.module.css';
import Link from 'next/link';
import Script from 'next/script';
import Image from 'next/image';
import BestAlternative from '@/components/analytics/apex-charts/bestAlternative';
import demo from 'public/feedback-demo.gif';
import CountDownSurvey from '@/components/countdownSurvey'
import word from 'public/wordcloud-hq.gif';
import React from 'react';
import Countdown, { CountdownRenderProps } from 'react-countdown';

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
            <div className="bg-pink-100">
                <div className="py-2 px-3 sm:py-3 flex">
                    <div className="flex flex-wrap items-center sm:mx-auto">
                        <div>
                            <p className="ml-2 font-lg text-gray-500 sm:text-xl pb-1">
                                <strong>❗PM24 Special❗</strong>
                                Let us help you {' '}
                                <Link href="/profile">
                                    <strong className="text-rose-400 underline hover:text-rose-500 hover:cursor-pointer">
                                        Nudge Your Crush
                                    </strong>
                                </Link>
                                {' '} with an anonymous hint 💌!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/*
            <div className="bg-pink-100">
                <div className="py-2 px-3 sm:py-3 flex">
                    <div className="flex flex-wrap items-center sm:mx-auto">
                        <div>
                            <p className="ml-2 font-lg text-gray-500 sm:text-xl pb-1">
                                <strong>❗PM24 Special❗</strong>
                                Curious about what others choose? Check out{' '}
                                <Link href="/dashboard">
                                    <strong className="text-rose-400 underline hover:text-rose-500 hover:cursor-pointer">
                                        Live Statistics Dashboard
                                    </strong>
                                </Link>
                                !
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            */}

            <section className="bg-white flex flex-col pr-0 lg:pr-12 lg:flex-row">
                <div className="pb-6 pt-6 sm:pt-20 lg:pt-28 lg:pb-36 lg:w-3/5">
                    <div className="mx-2 max-w-xl text-center lg:text-left sm:mx-auto lg:ml-[17%] mt-8 sm:mt-0 opacity-100">
                        <h1 className="text-3xl text-gray-600 font-extrabold sm:text-4xl lg:text-5xl">
                            Let us find your
                            <strong className="mt-1 lg:mt-2 lg:mt-3 block font-extrabold text-rose-400">
                                Perfect Match💘!
                            </strong>
                        </h1>
                        <div>
                            <CountDownSurvey />
                        </div>
                        <p className="text-lg mx-2 mt-6 lg:max-w-lg sm:mx-auto lg:text-left text-center lg:text-xl text-gray-500 sm:leading-relaxed">
                            It's the last chance to opt in for an unforgettable Valentine's Day with 
                            your perfect matches! Matches are released sometime tonight, with a reminder 
                            email sent to you. Get excited❤️‍🔥!
                        </p>
                        {!error && currentCount && (
                            <p className="text-lg mt-4 mx-2 lg:max-w-lg sm:mx-auto lg:text-left text-center lg:text-xl text-gray-500 sm:leading-relaxed">
                                Join over{' '}
                                <strong className="text-xl text-rose-400 font-extrabold lg:text-2xl">
                                    {currentCount}
                                </strong>{' '}
                                Cornellians getting matched this year!
                            </p>
                        )}
                        <div className="flex lg:contents">
                            <div className="mt-8 flex flex-wrap gap-4 text-center mx-auto">
                                <GoogleAuth login={!props.user} />
                            </div>
                        </div>
                    </div>
                </div>
                <Image priority={true} src={word} alt="Loading..." className="lg:w-2/5"></Image>
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
