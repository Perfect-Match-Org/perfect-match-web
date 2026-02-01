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

            {/* Scrolling Marquee Banner - Top */}
            <div className="bg-pmred-500 overflow-hidden whitespace-nowrap py-1">
                <div className="animate-marquee inline-flex">
                    {/* First copy */}
                    {Array(2).fill(0).map((_, i) => (
                        Array(10).fill(0).map((_, i) => (
                            <span key={`a-${i}`} className="inline-flex items-center text-white font-dm-sans font-bold text-2xl ml-2">
                                <span>PERFECT MATCH IS OPEN</span>
                                <span className="text-white font-dm-sans font-bold text-sm ml-2">❤︎</span>
                            </span>
                        ))
                    ))}
                </div>
            </div>

            <div className="relative z-0 overflow-hidden">

                <section className="bg-pmpink2-500">
                    <div className='flex flex-col justify-center align-middle items-center h-fit lg:h-[70vh] lg:flex-row lg:px-[12vw] z-20'>
                        <div className='h-[50%] w-full lg:w-1/2 lg:mr-16 xl:mr-0 items-center justify-center hidden md:flex '><Countdown /></div>
                        <div className="lg:w-1/2">
                            <div className="mx-2 max-w-xl text-center lg:text-left sm:mx-auto lg:ml-[17%] mt-8 sm:mt-0 opacity-100">
                                <div className="">
                                    <h1 className="text-2xl text-pmpink font-dm-sans font-extrabold sm:text-3xl lg:text-4xl 2xl:text-6xl sm:mt-5 ">
                                        <span className="bg-[#07154b] box-decoration-clone px-2 leading-[1.2]">WE KNOW YOU'VE BEEN WAITING</span>
                                    </h1>
                                </div>
                                <div className='font-work-sans'>
                                    <p className="text-lg text-pmblue-500 mt-4 lg:max-w-lg lg:text-left text-center lg:text-xl sm:leading-relaxed">
                                        The form closes <strong>February 12th</strong>
                                        <br />
                                        Be sure to fill it in time so you're not alone on Valentine's Day ;&#41;
                                        <br />
                                        <br />
                                        <strong>{currentCount?.count || '2243'}</strong> Cornellians have already filled it out
                                    </p>
                                    {!props.user ? (
                                        <GoogleAuth login={!props.user} />
                                    ) : (
                                        <Link href="/survey">
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
                <div className="bg-pmred-500 overflow-hidden whitespace-nowrap py-1">
                    <div className="animate-marquee inline-flex">
                        {/* First copy */}
                        {Array(2).fill(0).map((_, i) => (
                            Array(10).fill(0).map((_, i) => (
                                <span key={`a-${i}`} className="inline-flex items-center text-white font-dm-sans font-bold text-2xl ml-2">
                                    <span>PERFECT MATCH IS OPEN</span>
                                    <span className="text-white font-dm-sans font-bold text-sm ml-2">❤︎</span>
                                </span>
                            ))
                        ))}
                    </div>
                </div>

                <section className="bg-pmpink-500 flex flex-col lg:px-[12vw] lg:flex-row">

                    <div className="pb-6 pt-8 sm:pt-20 lg:pt-44 lg:pb-36 lg:w-1/2 lg:pr-3 lg:left-0">
                        <div className="text-center lg:text-left sm:mx-auto mt-8 sm:mt-0 opacity-100 space-y-6">
                            <h1 className="text-3xl text-pmred-500 font-extrabold sm:text-3xl font-dela-gothic">
                                Captivating hearts since 2019

                            </h1>
                            <div className=''>
                                <div className='text-lg text-pmred-500 lg:max-w-lg lg:text-left text-center lg:text-xl sm:leading-relaxed font-work-sans space-y-4'>
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
                        <Image src="/bear.svg" alt="bear" height={396} width={504} loading='lazy' draggable='false' />
                    </div>
                </section >
            </div >
            <div className="bg-pmpink-500">
                <div className="left-0 w-full relative h-[60px]">
                    <svg className="absolute top-1 w-full h-[60px] z-100 md:hidden" // Adjust height as needed
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
            <div className="bg-pmpink2-500">
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
                    <svg className="relative hidden w-full h-[60px] md:block" // Adjust height as needed
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none">
                        <path
                            d="M0,60 C16.67,40 33.33,40 50,60 C66.67,80 83.33,80 100,60 C116.67,40 133.33,40 150,60 C166.67,80 183.33,80 200,60 C216.67,40 233.33,40 250,60 C266.67,80 283.33,80 300,60 C316.67,40 333.33,40 350,60 C366.67,80 383.33,80 400,60 C416.67,40 433.33,40 450,60 C466.67,80 483.33,80 500,60 C516.67,40 533.33,40 550,60 C566.67,80 583.33,80 600,60 C616.67,40 633.33,40 650,60 C666.67,80 683.33,80 700,60 C716.67,40 733.33,40 750,60 C766.67,80 783.33,80 800,60 C816.67,40 833.33,40 850,60 C866.67,80 883.33,80 900,60 C916.67,40 933.33,40 950,60 C966.67,80 983.33,80 1000,60 C1016.67,40 1033.33,40 1050,60 C1066.67,80 1083.33,80 1100,60 C1116.67,40 1133.33,40 1150,60 C1166.67,80 1183.33,80 1200,60 V120 H0 Z"
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
