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

            <section className="grid grid-cols-2">

                <div className="bg-white">
                    <div className="mt-6 mb-6 sm:mt-24 sm:mb-6">
                        <div className="text-center sm:text-left sm:ml-[8%] sm:mr-[6%]">
                            <h1 className="text-lg text-gray-600 font-extrabold sm:text-3xl">Want an extra <span className="text-rose-400">Perfect Match? </span></h1>
                            <p className="mt-6 sm:text-lg text-gray-500">
                                <strong className="font-extrabold text-rose-400">NEW: </strong>Give us feedback on your matches this year and recieve an additional match in 2024❣️
                            </p>
                            <p className="mt-2 sm:text-lg text-gray-500">
                                Sign in to complete the <strong className="font-extrabold text-rose-400">feedback survey</strong>:
                            </p>

                            <div className="flex sm:contents">
                                <div className="mt-4 flex flex-wrap text-center mx-auto">
                                    <GoogleAuth login={!props.user} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div >

                <div className="bg-pink-100">
                    <div className="mt-6 mb-6 sm:my-24 sm:mb-6">
                        <div className="text-center sm:text-left sm:ml-[8%] sm:mr-[6%]">
                            <h1 className="text-lg text-gray-600 font-extrabold sm:text-3xl">Curious about the results of <span className="text-rose-400">PM23? </span></h1>
                            <ul className="mt-6 sm:text-lg text-gray-500">
                                <li>🐻 4500+ Cornellians matched this year</li>
                                <li>💌 22,000+ Perfect Matches</li>
                            </ul>
                            <div className="mt-6 sm:text-lg">
                                <p className="text-rose-400 font-extrabold">For example, we asked:</p>
                                <p className="my-2 text-gray-500">Choose the <strong>best alternative</strong>. Your match is a 10, but they ____.</p>
                                <p className="text-rose-400 font-extrabold">You responded:</p>

                                <div className="content-center">
                                    <div className="max-w-lg mx-auto">
                                        <BestAlternative />
                                    </div>
                                </div>
                                <p className="text-gray-500 mt-2 sm:text-base">
                                    Huh, so you can still enjoy studying in the Olin Basement but don't ever let you perfect matches
                                    know you got matched with their roommates on Hinge...
                                </p>
                            </div>

                        </div>
                    </div>
                </div >

            </section>
            <Footer />
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
