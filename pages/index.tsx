import Head from 'next/head';
import type { NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { Footer } from '../components/footer';
import { GoogleAuth } from '../components/general';
import { Header } from '../components/header';
import { fetcher } from '../utils/fetch';
import useSWR from 'swr';
import styles from '../styles/Home.module.css';

import Link from 'next/link';
import Script from 'next/script';
import Image from 'next/image';
import BestAlternative from '../components/analytics/apex-charts/bestAlternative';
import demo from '../public/feedback-demo.gif';

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

            <section className="grid lg:grid-cols-2">

                <div className="bg-white">
                    <div className="mt-12 lg:my-24 lg:mb-10">
                        <div className="text-center lg:text-left mx-[3%] md:mx-[10%] lg:ml-[8%] lg:mr-[6%]">
                            <h1 className="text-xl text-gray-600 font-extrabold md:text-3xl">Want an <span className="text-rose-400">extra match </span>next year?</h1>
                            <p className="mt-6 lg:mt-10 text-base md:text-lg text-gray-500">
                                <strong className="font-bold text-rose-400">NEW: </strong>Give us feedback on your matches this year and recieve an additional match in 2024❣️
                            </p>
                            <p className="mt-2 md:text-lg text-gray-500">
                                Head to your <Link href="/profile" className="underline font-bold">Profile</Link> to complete the <strong className="font-bold text-rose-400">feedback survey</strong>.
                            </p>
                        </div>
                    </div>
                    <div className="lg:mt-6 mt-4 mb-10">
                        <Image priority={true} src={demo} alt="Loading..."></Image>
                    </div>
                </div >

                <div className="bg-pink-100">
                    <div className="my-12 lg:my-24">
                        <div className="text-center lg:text-left mx-[3%] md:mx-[10%] lg:ml-[8%] lg:mr-[6%]">
                            <h1 className="text-xl text-gray-600 font-extrabold md:text-3xl">Curious about the results of <span className="text-rose-400">PM23? </span></h1>
                            <ul className="mt-6 lg:mt-10 md:text-lg text-gray-500">
                                <li>🐻 4500+ Cornellians matched this year</li>
                                <li>💌 22,000+ Perfect Matches</li>
                                <li>📊 Visit the <Link href="/statistics" className="underline font-bold">Statistics</Link> page for more about the results!</li>
                            </ul>
                            <div className="mt-6 lg:mt-12 md:text-lg">
                                <p className="text-rose-400 font-bold">For example, we asked:</p>
                                <p className="my-2 lg:my-4 text-gray-500">Choose the <strong>best alternative</strong>. Your match is a 10, but they ____.</p>
                                <p className="text-rose-400 font-bold">You chose:</p>

                                <div className="content-center my-3">
                                    <div className="max-w-xl mx-auto">
                                        <BestAlternative />
                                    </div>
                                </div>
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
