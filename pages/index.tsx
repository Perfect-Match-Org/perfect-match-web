import Head from 'next/head';
import type { NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { Footer } from '@/components/footer';
import { GoogleAuth, MarqueeBanner } from '@/components/general';
import { Header } from '@/components/header';
import { fetcher } from '@/utils/fetch';
import useSWR from 'swr';
import styles from '@/styles/Home.module.css';
import Link from 'next/link';
import Image from 'next/image';
import demo from 'public/feedback-demo.gif';
import Countdown from '@/components/countdown';
import { Button } from '@/components/general';
import { Reviews } from '@/components/testimonials/testimonials';
const Home: NextPage = (props: any) => {
    const { data: currentCount, error } = useSWR('/api/users/count', fetcher, {
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

            {/* Application Banner */}
            <div className="bg-pmblue-500 text-white text-center py-2 px-3">
                <p className="text-sm sm:text-base font-work-sans">
                    Be the face of Perfect Match. {' '}
                    <a
                        href="https://forms.gle/zMU4HtEwTyha1Ct68"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline font-bold hover:text-pmpink-500 transition-colors"
                    >
                        Apply to become our video content creator! &rarr;
                    </a>
                </p>
            </div>

            {/* Scrolling Marquee Banner - Top */}
            <MarqueeBanner text="Perfect Match is Open" />

            <div className="relative z-0 overflow-hidden">

                <section className="bg-pmpink2-500">
                    <div className='flex flex-col justify-center align-middle items-center h-full lg:h-[70vh] lg:flex-row lg:px-[12vw] z-20'>
                        <div className='h-[50%] w-full lg:w-1/2 lg:mr-16 xl:mr-0 items-center justify-center hidden md:flex '><Countdown /></div>
                        <div className="lg:w-1/2">
                            <div className="mx-2 max-w-xl text-center lg:text-left sm:mx-auto lg:ml-[17%] mt-8 sm:mt-0 opacity-100">
                                <div className="">
                                    <h1 className="text-2xl text-pmpink-500 font-dm-sans font-extrabold sm:text-3xl lg:text-5xl 2xl:text-6xl sm:mt-5 ">
                                        <span className="bg-pmblue2-800 box-decoration-clone lg:px-6 lg:py-3 sm:px-4 sm:py-2 sm:leading-[1.2] lg:leading-[1.4]">WE KNOW YOU&apos;VE BEEN WAITING</span>
                                    </h1>
                                </div>
                                <div className='font-work-sans'>
                                    <p className="text-lg text-pmblue-500 mt-4 lg:max-w-lg lg:text-left text-center lg:text-xl sm:leading-relaxed">
                                        The form closes <strong>February 12th</strong>
                                        <br />
                                        Be sure to fill it in time so you&apos;re not alone on Valentine&apos;s Day ;&#41;
                                        <br />
                                        <br />
                                        <strong>{currentCount ?? '...'}</strong> Cornellians have already filled it out
                                    </p>
                                    {!props.user ? (
                                        <GoogleAuth login={!props.user} />
                                    ) : (
                                        <Link href="/profile">
                                            <Button bold={true} >
                                                fill out Perfect Match
                                            </Button>
                                        </Link>
                                    )}

                                </div>
                            </div>

                        </div>
                    </div>
                </section >

                {/* Scrolling Marquee Banner - Bottom */}
                <MarqueeBanner text="Perfect Match is Open" />

                <section className="bg-pmpink-500 flex flex-col lg:px-[12vw] lg:flex-row">

                    <div className="pb-6 pt-8 sm:pt-20 lg:pt-44 lg:pb-36 lg:w-1/2 lg:pr-3 lg:left-0">
                        <div className="text-center lg:text-left sm:mx-auto mt-8 sm:mt-0 opacity-100 space-y-6">
                            <h1 className="text-2xl text-pmpink-500 font-dm-sans font-extrabold sm:text-3xl lg:text-5xl 2xl:text-6xl sm:mt-5 ">
                                <span className="bg-pmblue2-800 box-decoration-clone lg:px-6 lg:py-3 sm:px-4 sm:py-2 sm:leading-[1.2] lg:leading-[1.4]">CAPTIVATING HEARTS SINCE 2019</span>
                            </h1>
                            <div className=''>
                                <div className='text-lg text-pmblue-500 lg:max-w-lg lg:text-left text-center lg:text-xl sm:leading-relaxed font-work-sans space-y-4'>
                                    <p className="">
                                        Perfect Match is Cornell&#39;s very own <strong>match making survey</strong> that pairs students with potential partners with our comprehensive algorithm.
                                    </p>
                                    <p className="">
                                        Last year we matched over <strong>5,000 students!</strong> Don&#39;t believe us? Check out our statistics. </p>
                                </div>
                                <Link href="/statistics">
                                    <button
                                        className="
                                    mt-6
                                    px-6 
                                    py-2
                                    rounded-full
                                    bg-white 
                                    text-pmred-500 
                                    border-4
                                    border-pmblue-500 
                                    font-bold
                                    shadow-[6px_6px_0px_0px_rgba(36,67,141,1)]
                                    transition-all
                                    hover:translate-x-[4px]
                                    hover:translate-y-[4px]
                                    hover:shadow-[2px_2px_0px_0px_rgba(36,67,141,1)]
                                    active:translate-x-[6px]
                                    active:translate-y-[6px]
                                    active:shadow-none
                                "
                                    >
                                        last year&apos;s stats
                                    </button>
                                </Link>
                            </div>
                        </div>

                    </div>
                    <div className="lg:w-1/2 flex justify-center items-center">
                        <Image src="/pm2026.png" alt="pm2026" height={396} width={504} loading='lazy' draggable='false' />
                    </div>
                </section >
            </div >
            <div className="bg-pmred-500">
                <Reviews />
                <div className="left-0 w-full overflow-hidden">
                    <svg className="relative block w-full h-[60px] md:hidden" // Adjust height as needed
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none">
                        <path
                            d="M0,60 C40,40 80,80 120,60 C160,40 200,80 240,60 C280,40 320,80 360,60 C400,40 440,80 480,60 C520,40 560,80 600,60 C640,40 680,80 720,60 C760,40 800,80 840,60 C880,40 920,80 960,60 C1000,40 1040,80 1080,60 C1120,40 1160,80 1200,60 V120 H0 Z"
                            fill="#fce5f3"
                        ></path>
                    </svg>
                </div>
            </div>
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
