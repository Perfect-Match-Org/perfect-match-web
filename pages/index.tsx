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
import Countdown from '@/components/countdown';

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



            <Countdown />
            <section className='bg-rose-100'>
                <div className="mx-[10%] lg:mx-[15%]">
                    <ol className="hidden sm:block sm:border-xl-0 sm:border-t-2 border-rose-300 sm:flex sm:gap-6">
                        <li>
                            <div className="flex sm:block flex-start items-center pt-2 sm:pt-0">
                                <div className="sm:-mt-5 text-3xl -ml-1">💓</div>
                                <p className="text-rose-400 text-l my-2 font-bold">Feb. 5th, Monday, @ 5 PM</p>
                            </div>
                            <div className="mt-0.5 ml-4 sm:ml-0 pb-5">
                                <h4 className="text-gray-700 font-semibold text-lg mb-1.5">PM24 is Launched!</h4>
                                <p className="text-gray-500 mb-3">
                                    Start filling out your profile and the survey! For
                                    updates on PM24, follow us on{' '}
                                    <a
                                        className="underline"
                                        href="https://www.instagram.com/cornellperfectmatch/"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        IG
                                    </a>
                                    .
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="flex sm:block flex-start items-center pt-2 sm:pt-0">
                                <div className="sm:-mt-5 text-3xl">💘</div>
                                <p className="text-rose-400 text-l my-2 font-bold">Feb. 13th, @ Noon</p>
                            </div>
                            <div className="mt-0.5 ml-4 sm:ml-0 pb-5">
                                <h4 className="text-gray-700 font-semibold text-lg mb-1.5"> PM24 Closes!</h4>
                                <p className="text-gray-500 mb-3">
                                    Hurry up! Cupid is flying away! Make sure to submit your response on time.
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="flex sm:block flex-start items-center pt-2 sm:pt-0">
                                <div className="sm:-mt-5 text-3xl">💞</div>
                                <p className="text-rose-400 my-2 font-bold"> Feb. 13th, @ Night</p>
                            </div>
                            <div className="mt-0.5 ml-4 sm:ml-0 pb-5">
                                <h4 className="text-gray-700 font-semibold text-lg mb-1.5">Matches Out!</h4>
                                <p className="text-gray-500 mb-3">
                                    An email will be sent to you when your perfect matches are out. Go ahead and
                                    shoot your shot!{' '}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="flex sm:block flex-start items-center pt-2 sm:pt-0">
                                <div className="sm:-mt-5 text-3xl">❤️‍🔥</div>
                                <p className="text-rose-400 text-l my-2 font-bold">Feb. 14th</p>
                            </div>
                            <div className="mt-0.5 ml-4 sm:ml-0 pb-5">
                                <h4 className="text-gray-700 font-semibold text-lg mb-1.5">
                                    Valentine&apos;s Day
                                </h4>
                                <p className="text-gray-500 mb-3">
                                    It&apos;s that time of the year! Grab some food with your perfect matches!
                                </p>
                            </div>
                        </li>
                    </ol>



                    {/* <ol className="border-l-2 border-rose-300 sm:hidden">
                            <li>
                                <div className="flex flex-start items-center pt-3">
                                    <div className="-ml-3 mr-3 text-2xl">💓</div>
                                    <p className="text-rose-400 text-l font-bold">02-01-23 5PM</p>
                                </div>
                                <div className="mt-0.5 ml-4 mb-6">
                                    <h4 className="text-gray-700 font-semibold text-lg mb-1.5">PM2023 is Launched!</h4>
                                    <p className="text-gray-500 mb-3">
                                        Sign in with your Cornell email. Then fill out your profile and the survey! For
                                        updates on PM, follow us on{' '}
                                        <a
                                            className="underline"
                                            href="https://www.instagram.com/cornellperfectmatch/"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            IG
                                        </a>
                                        .
                                    </p>
                                </div>
                            </li>
                            <li>
                                <div className="flex flex-start items-center pt-2">
                                    <div className="-ml-3 mr-3 text-2xl">💘</div>
                                    <p className="text-rose-400 text-l font-bold">02-13-23 Noon</p>
                                </div>
                                <div className="mt-0.5 ml-4 mb-6">
                                    <h4 className="text-gray-700 font-semibold text-lg mb-1.5">PM Closes!</h4>
                                    <p className="text-gray-500 mb-3">
                                        Hurry up! Cupid is flying away! Make sure to submit your response on time.
                                    </p>
                                </div>
                            </li>
                            <li>
                                <div className="flex flex-start items-center pt-2">
                                    <div className="-ml-3 mr-3 text-2xl">💞</div>
                                    <p className="text-rose-400 font-bold">02-13-23 Night</p>
                                </div>
                                <div className="mt-0.5 ml-4 pb-5">
                                    <h4 className="text-gray-700 font-semibold text-lg mb-1.5">Matches Out!</h4>
                                    <p className="text-gray-500 mb-3">
                                        An email will be sent to you when your perfect matches are out. Go ahead and
                                        shoot your shot!
                                    </p>
                                </div>
                            </li>
                            <li>
                                <div className="flex flex-start items-center pt-2">
                                    <div className="-ml-3 mr-3 text-2xl">❤️‍🔥</div>
                                    <p className="text-rose-400 font-bold">02-14-23</p>
                                </div>
                                <div className="mt-0.5 ml-4 pb-5">
                                    <h4 className="text-gray-700 font-semibold text-lg mb-1.5">
                                        It&apos;s Valentine&apos;s Day!
                                    </h4>
                                    <p className="text-gray-500 mb-3">
                                        It&apos;s that time of the year! Grab some food with your Perfect Matches!
                                    </p>
                                </div>
                            </li>
                        </ol> */}
                </div>
                <ol className="border-l-2 border-rose-300 sm:hidden ml-6">
                    <li>
                        <div className="flex flex-start items-center pt-3">
                            <div className="-ml-3 mr-3 text-2xl">💓</div>
                            <p className="text-rose-400 text-l font-bold">Feb. 5th, Monday, @ 5 PM</p>
                        </div>
                        <div className="mt-0.5 ml-4 mb-6">
                            <h4 className="text-gray-700 font-semibold text-lg mb-1.5">PM24 is Launched!</h4>
                            <p className="text-gray-500 mb-3">
                                Start filling out your profile and the survey! For
                                updates on PM24, follow us on{' '}
                                <a
                                    className="underline"
                                    href="https://www.instagram.com/cornellperfectmatch/"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    IG
                                </a>
                                .
                            </p>
                        </div>
                    </li>
                    <li>
                        <div className="flex flex-start items-center pt-2">
                            <div className="-ml-3 mr-3 text-2xl">💘</div>
                            <p className="text-rose-400 text-l font-bold">Feb. 13th, @ Noon</p>
                        </div>
                        <div className="mt-0.5 ml-4 mb-6">
                            <h4 className="text-gray-700 font-semibold text-lg mb-1.5">PM24 Closes!</h4>
                            <p className="text-gray-500 mb-3">
                                Hurry up! Cupid is flying away! Make sure to submit your response on time.
                            </p>
                        </div>
                    </li>
                    <li>
                        <div className="flex flex-start items-center pt-2">
                            <div className="-ml-3 mr-3 text-2xl">💞</div>
                            <p className="text-rose-400 font-bold">Feb. 13th, @ Night</p>
                        </div>
                        <div className="mt-0.5 ml-4 pb-5">
                            <h4 className="text-gray-700 font-semibold text-lg mb-1.5">Matches Out!</h4>
                            <p className="text-gray-500 mb-3">
                                An email will be sent to you when your perfect matches are out. Go ahead and
                                shoot your shot!
                            </p>
                        </div>
                    </li>
                    <li>
                        <div className="flex flex-start items-center pt-2">
                            <div className="-ml-3 mr-3 text-2xl">❤️‍🔥</div>
                            <p className="text-rose-400 font-bold">Feb. 14th</p>
                        </div>
                        <div className="mt-0.5 ml-4 pb-5">
                            <h4 className="text-gray-700 font-semibold text-lg mb-1.5">
                                It&apos;s Valentine&apos;s Day!
                            </h4>
                            <p className="text-gray-500 mb-3">
                                It&apos;s that time of the year! Grab some food with your perfect matches!
                            </p>
                        </div>
                    </li>
                </ol>
            </section>

            <section className="bg-rose-100">
                <div className="pt-4 pb-12 flex flex-col items-center justify-center text-gray-600 mx-[3%] sm:mx-[10%] lg:mx-[15%]">
                    <h2 className="text-xl font-extrabold md:text-3xl mb-4">
                        But before this...❗
                    </h2>
                    <p className="sm:text-lg sm:mx-[7%] lg:mx-[10%] text-center">
                        ❗Make sure you have checked out the new {' '}
                        <Link href="/statistics">
                            <span className="underline font-bold cursor-pointer">Statistics</span>
                        </Link>❗
                    </p>
                </div>
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
