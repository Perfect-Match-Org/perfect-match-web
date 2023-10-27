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
import DescribeYou from '../components/analytics/apex-charts/describeYou';
import DescribePartner from '../components/analytics/apex-charts/describePartner';
import Year from '../components/analytics/apex-charts/year';
import Height from '../components/analytics/apex-charts/height';
import LongestRelation from '../components/analytics/apex-charts/longestRelation';
import NumDatedGender from '../components/analytics/apex-charts/numDated';
import NumDatedCollege from '../components/analytics/apex-charts/numDatedCollege';

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
            <section
                className="lg:mx-[3%]"
                style={{
                    marginBottom: '30px',
                    marginTop: '10px',
                    marginRight: '10px',
                    backgroundImage: 'url("front-page-demo.mp4")',
                    height: '10%',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right top',
                }}
            >
                <div className="mx-auto max-w-screen-xl pt-[70%] pb-10 lg:items-center lg:pt-60 lg:pb-36">
                    <div className="text-center lg:text-left lg:ml-[8%] mt-8 lg:mt-0">
                        <h1 className="text-xl text-gray-600 font-extrabold sm:text-4xl">
                            Want an extra{' '}
                            <strong className="mt-1 lg:mt-2 lg:mt-3 block font-extrabold text-rose-400">
                                Perfect Match?{' '}
                            </strong>
                        </h1>
                        <p className="mt-4 mx-[5%] lg:max-w-lg sm:mx-[10%] lg:mx-0 sm:text-xl text-gray-500 sm:leading-relaxed">
                            <strong className="mt-1 lg:mt-2 lg:mt-3  font-extrabold text-rose-400">NEW: </strong>Give us
                            feedback on your matches and recieve an additional match in 2024!
                        </p>

                        <p className="mx-[5%] sm:mx-[10%] lg:max-w-lg lg:mx-0 mt-4 sm:text-xl text-gray-500 sm:leading-relaxed">
                            Over <strong className="mt-1 lg:mt-2 lg:mt-3  font-extrabold text-rose-400">4500+</strong>{' '}
                            Cornellians matched this year!{' '}
                        </p>
                        <p className="mx-[5%] sm:mx-[10%] lg:max-w-lg lg:mx-0 mt-4 sm:text-xl text-gray-500 sm:leading-relaxed"></p>

                        <div className="flex lg:contents">
                            <div className="mt-8 flex flex-wrap gap-4 text-center mx-auto">
                                <GoogleAuth login={!props.user} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section
                className="lg:mx-[3%]"
                style={{
                    // marginBottom: '30px',
                    // marginTop: '10px',
                    // marginRight: '10px',
                    // height: '10%',
                    backgroundColor: 'white',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right top',
                }}
            >
                <div className="lg:items-center sm:pt-60 sm:pb-36 ">
                    <div className="max-w-xl text-center sm:text-left sm:ml-[8%] mt-8 sm:mt-0">
                        <h1 className="text-3xl font-extrabold text-rose-400 sm:text-5xl">
                            We&apos;ve crunched the numbers and here&apos;s what we found...
                        </h1>
                    </div>
                    <div className="display: flex;">
                        <div className="text-center lg:text-left lg:ml-[8%] mt-8 lg:mt-0">
                            <div className="my-8 sm:my-12">
                                <p className="my-4 sm:lg-7 lg:my-10 max-w-4xl sm:text-lg text-gray-500 mx-[5%] sm:mx-[10%] lg:mx-[20%]">
                                    We asked participants to give the length of their longest relationship. The results
                                    indicate that <strong className="text-rose-400">AAP and ILR </strong>
                                    students tend to be in longer relationships.
                                </p>
                                <div className="-mb-2 sm:mx-[10%] lg:mx-[20%]">
                                    <h3 className="mx-[5%] text-sm sm:mx-0 font-bold mt-6 -mb-4 text-rose-400 sm:mb-0 sm:mt-8 sm:text-base">
                                        Longest Relationship (in Months), by College
                                    </h3>
                                    <LongestRelation />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="my-8 sm:my-12">
                        <p className="my-4 sm:lg-7 lg:my-10 max-w-4xl sm:text-lg text-gray-500 mx-[5%] sm:mx-[10%] lg:mx-[20%]">
                            We also asked participants to give the number of people they had dated in the last five
                            years. It is interesting to observe how female and male participants, and students in
                            different colleges, gave different numbers.
                        </p>

                        <div className="-mb-2 sm:mx-[10%] lg:mx-[20%]">
                            <h3 className="mx-[5%] text-sm sm:mx-0 font-bold mt-6 -mb-4 text-rose-400 sm:text-base sm:mt-8 sm:mb-0">
                                Number of People one Had Dated, by College
                            </h3>
                            <NumDatedCollege />
                        </div>
                    </div>
                    <div className="flex justify-center items-center mb-5">
                        <Link
                            href="/statistics"
                            className="bg-red-400 content-center hover:bg-rose-400 font-bold py-2 px-4 rounded-full"
                        >
                            View the Full 2022 Statisical Analysis
                        </Link>
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
