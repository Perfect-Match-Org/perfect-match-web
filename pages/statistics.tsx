import styles from '@/styles/Home.module.css';
import Image from 'next/image';
import Head from 'next/head';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import Link from 'next/link';
import Stats2023 from '@/components/analytics/2023Analytics';
import Stats2022 from '@/components/analytics/2022Analytics';
import Stats2024 from '@/components/analytics/2024Analytics';
import { useState, useEffect } from 'react';
import { Button } from '@/components/general';

const Statistics = (props: { title: string }) => {
    const [year, setYear] = useState(2024); // Default year

    return (
        <div className="font-work-sans overflow-x-hidden">
            <Head>
                <title>{props.title}</title>
            </Head>
            <Header />

            <div className="absolute left-[-3vw] top-12 h-screen w-[18vw] hidden lg:block z-20 pointer-events-none">
                <Image src="/left_hearts.svg" alt="left hearts" layout="fill" priority={true} draggable="false" />
            </div>
            <div className="absolute right-0 top-0 translate-y-[200px] h-screen w-[8vw] hidden lg:block z-20 pointer-events-none">
                <Image src="/right_hearts.svg" alt="right hearts" layout="fill" priority={true} draggable="false" />
            </div>

            <section
                className="sm:mr-0 bg-pmpink-500"
                style={{
                    // paddingBottom: '10px',
                    // paddingTop: '10px',

                    height: '100%',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right top',
                    // backgroundImage: 'url("valentine.png")',
                }}
            >
                <div className="pb-6 pt-24 sm:pt-32 lg:pt-32 lg:pb-36">
                    <div className="max-w-xl text-center sm:text-left sm:ml-[15%] mt-8 sm:mt-0 opacity-100">
                        <h1 className="text-4xl sm:text-3xl font-dela-gothic text-pmblue-500 lg:text-5xl opacity-100">
                            Can Love be Visualized?
                        </h1>
                        <p className="font:semibold mt-4 mx-[10%] sm:mx-0 max-w-lg sm:text-lg text-pmblue-500 sm:leading-relaxed">
                            <strong>
                                Perhaps not without daydreaming about your crush, but your survey responses can!
                            </strong>{' '}
                            <br />
                            Join us on this journey to learn about some of the preferences and habits we&apos;ve
                            discovered from several years of survey responses!
                        </p>
                    </div>
                </div>
            </section>

            <div>
                <div className="w-full bg-pmpink2-500 py-8 sm:py-12">
                    <div className="w-full max-w-screen-lg mx-auto flex flex-col md:flex-row items-center md:justify-between text-white px-6 sm:px-12">
                        <p className="hidden lg:block text-center sm:text-left sm:text-2xl text-pmblue-500 font-bold sm:mx-0 max-w-none sm:max-w-lg">
                            Travel back in time to explore statistics from past years!
                        </p>

                        <div className="md:flex flex-wrap justify-center md:justify-start gap-4 mt-4 md:mt-0">
                            {[2022, 2023, 2024].map((y) => (
                                <Button key={y} onClick={() => setYear(y)} bold={true}>
                                    {y}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-pmpink-500">
                    <div className="w-full bg-pmpink-500"></div>
                    <div className="left-0 w-full overflow-hidden">
                        <svg
                            className="relative block w-full h-[60px] scale-y-[-1]" // Adjust height as needed
                            viewBox="0 0 1200 120"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M0,60 C16.67,40 33.33,40 50,60 C66.67,80 83.33,80 100,60 C116.67,40 133.33,40 150,60 C166.67,80 183.33,80 200,60 C216.67,40 233.33,40 250,60 C266.67,80 283.33,80 300,60 C316.67,40 333.33,40 350,60 C366.67,80 383.33,80 400,60 C416.67,40 433.33,40 450,60 C466.67,80 483.33,80 500,60 C516.67,40 533.33,40 550,60 C566.67,80 583.33,80 600,60 C616.67,40 633.33,40 650,60 C666.67,80 683.33,80 700,60 C716.67,40 733.33,40 750,60 C766.67,80 783.33,80 800,60 C816.67,40 833.33,40 850,60 C866.67,80 883.33,80 900,60 C916.67,40 933.33,40 950,60 C966.67,80 983.33,80 1000,60 C1016.67,40 1033.33,40 1050,60 C1066.67,80 1083.33,80 1100,60 C1116.67,40 1133.33,40 1150,60 C1166.67,80 1183.33,80 1200,60 V120 H0 Z"
                                fill="#f7a4af"
                            ></path>
                        </svg>
                    </div>
                </div>

                {year === 2022 ? <Stats2022 /> : year === 2023 ? <Stats2023 /> : <Stats2024 />}
            </div>

            <section className="bg-pmpink-500">
                <div className="container px-5 sm:px-0 py-8 sm:py-16 mx-auto">
                    <div className="font-dela-gothic text-center mb-15">
                        <h2 className="mb-12 text-2xl tracking-tight font-extrabold text-pmblue-500 sm:text-4xl">
                            FAQ&apos;s about User Privacy
                        </h2>
                    </div>
                    <div className="work-sans font-semibold text-pmblue-500 flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
                        <div className="w-full lg:w-1/2 px-4">
                            <details className="mb-5 [&_summary]:list-none [&_summary::-webkit-details-marker]:hidden">
                                <summary
                                    className="px-6 py-2 rounded-full bg-white  text-pmred-500  border-4 border-pmblue-500 
                                    font-bold shadow-[6px_6px_0px_0px_rgba(36,67,141,1)] transition-all hover:translate-x-[4px]
                                    hover:translate-y-[4px] hover:shadow-[2px_2px_0px_0px_rgba(36,67,141,1)] active:translate-x-[6px]
                                    active:translate-y-[6px] active:shadow-none cursor-pointer text-lg text-center"
                                >
                                    Are my survey responses visible to others?
                                </summary>

                                <p className="pt-3 pl-4">
                                    Absolutely not! All user data collected from our surveys is anonymized, and then
                                    privately stored. Only your name and provided contact information is shared, and
                                    that is only with your matches.
                                </p>
                            </details>
                            <details className="mb-5 [&_summary]:list-none [&_summary::-webkit-details-marker]:hidden">
                                <summary
                                    className="px-6 py-2 rounded-full bg-white  text-pmred-500  border-4 border-pmblue-500 
                                    font-bold shadow-[6px_6px_0px_0px_rgba(36,67,141,1)] transition-all hover:translate-x-[4px]
                                    hover:translate-y-[4px] hover:shadow-[2px_2px_0px_0px_rgba(36,67,141,1)] active:translate-x-[6px]
                                    active:translate-y-[6px] active:shadow-none cursor-pointer text-lg text-center"
                                >
                                    Can I be identified from these statistics?
                                </summary>

                                <p className="pt-3 pl-4">
                                    <strong>
                                        Preserving the privacy of our participants is our utmost concern and is rooted
                                        behind every decision made in crafting these visualizations.
                                    </strong>{' '}
                                    We have taken several measures to remove any identifiable characteristics from the
                                    data we have collected, and the resulting datasets are randomly shuffled.
                                </p>
                            </details>
                            <details className="mb-5 [&_summary]:list-none [&_summary::-webkit-details-marker]:hidden">
                                <summary
                                    className="px-6 py-2 rounded-full bg-white  text-pmred-500  border-4 border-pmblue-500 
                                    font-bold shadow-[6px_6px_0px_0px_rgba(36,67,141,1)] transition-all hover:translate-x-[4px]
                                    hover:translate-y-[4px] hover:shadow-[2px_2px_0px_0px_rgba(36,67,141,1)] active:translate-x-[6px]
                                    active:translate-y-[6px] active:shadow-none cursor-pointer text-lg text-center"
                                >
                                    How are these visualizations generated?
                                </summary>

                                <p className="pt-3 pl-4">
                                    These visualizations were generated using the ApexCharts and d3 JavaScript
                                    libraries.
                                </p>
                            </details>
                        </div>
                        <div className="w-full lg:w-1/2 px-4">
                            <details className="mb-5 [&_summary]:list-none [&_summary::-webkit-details-marker]:hidden">
                                <summary
                                    className="px-6 py-2 rounded-full bg-white  text-pmred-500  border-4 border-pmblue-500 
                                    font-bold shadow-[6px_6px_0px_0px_rgba(36,67,141,1)] transition-all hover:translate-x-[4px]
                                    hover:translate-y-[4px] hover:shadow-[2px_2px_0px_0px_rgba(36,67,141,1)] active:translate-x-[6px]
                                    active:translate-y-[6px] active:shadow-none cursor-pointer text-lg text-center"
                                >
                                    Is my data sold to third-party advertisers?
                                </summary>

                                <p className="pt-3 pl-4">
                                    Absolutely not! All of your data is stored privately and will not be viewed by any
                                    third party.
                                </p>
                            </details>
                            <details className="mb-5 [&_summary]:list-none [&_summary::-webkit-details-marker]:hidden">
                                <summary
                                    className="px-6 py-2 rounded-full bg-white  text-pmred-500  border-4 border-pmblue-500 
                                    font-bold shadow-[6px_6px_0px_0px_rgba(36,67,141,1)] transition-all hover:translate-x-[4px]
                                    hover:translate-y-[4px] hover:shadow-[2px_2px_0px_0px_rgba(36,67,141,1)] active:translate-x-[6px]
                                    active:translate-y-[6px] active:shadow-none cursor-pointer text-lg text-center"
                                >
                                    What happens to my data?
                                </summary>

                                <p className="pt-3 pl-4">
                                    Your data is safe with us! We will never share your data with a third party
                                    advertisers, and we will only interact with your information as needed to resolve
                                    user issues. We may collect anonymous statistics to improve our algorithm, but your
                                    identity will always be separated from such reports.
                                </p>
                                <p className="pt-3 pl-4">
                                    Anonymized statistics are published each year on our website and provided to media
                                    and student groups for publications. In the past, these are included Cornell Daily
                                    Sun, Big Red Heads, Cornell Chronicle, etc.
                                </p>
                                <p className="pt-3 pl-4">
                                    For media requests, please reach out at{' '}
                                    <Link href="mailto:perfectmatch@cornell.edu">perfectmatch@cornell.edu</Link>.
                                </p>
                            </details>
                            <details className="mb-5 [&_summary]:list-none [&_summary::-webkit-details-marker]:hidden">
                                <summary
                                    className="px-6 py-2 rounded-full bg-white  text-pmred-500  border-4 border-pmblue-500 
                                    font-bold shadow-[6px_6px_0px_0px_rgba(36,67,141,1)] transition-all hover:translate-x-[4px]
                                    hover:translate-y-[4px] hover:shadow-[2px_2px_0px_0px_rgba(36,67,141,1)] active:translate-x-[6px]
                                    active:translate-y-[6px] active:shadow-none cursor-pointer text-lg text-center"
                                >
                                    Who can I contact if I have a privacy concern?
                                </summary>

                                <p className="pt-3 pl-4">
                                    We greatly encourage you to reach out to us with any questions or concerns that you
                                    may have regarding data privacy. In fact, feedback from the Cornell community
                                    already has and will continue to be used in to improve our algorithm and measures to
                                    protect privacy. We can be reached at{' '}
                                    <Link href="mailto:perfectmatch@cornell.edu">perfectmatch@cornell.edu</Link>.
                                </p>
                            </details>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export async function getStaticProps() {
    return {
        props: {
            title: 'Statistics',
        },
    };
}

export default Statistics;
