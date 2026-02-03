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
import { Button, MarqueeBanner } from '@/components/general';

const Statistics = (props: { title: string }) => {
    const [year, setYear] = useState(2024); // Default year

    return (
        <div className="font-work-sans overflow-x-hidden">
            <Head>
                <title>{props.title}</title>
            </Head>
            <Header />

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
                <div className="pb-8 sm:pb-16 sm:pt-16 lg:pt-32 lg:pb-36">
                    <div className="max-w-xl text-center sm:text-left sm:ml-[15%] lg:mt-8 sm:mt-0 opacity-100">
                        <h1 className="text-2xl text-pmpink-500 font-dm-sans font-extrabold sm:text-3xl lg:text-5xl 2xl:text-6xl sm:mt-5 ">
                            <span className="bg-pmblue2-800 box-decoration-clone lg:px-6 lg:py-3 sm:px-4 sm:py-2 sm:leading-[1.2] lg:leading-[1.4]">
                                Can Love be Visualized?
                            </span>
                        </h1>
                        <p className="font-semibold mt-8 mx-[10%] sm:mx-0 lg:text-xl sm:text-lg text-pmblue-500 sm:leading-relaxed">
                            <strong>
                                Perhaps not without daydreaming about your crush, but your survey responses can!
                            </strong>{' '}
                        </p>
                        <p className="font-semibold mt-3 mx-[10%] sm:mx-0 lg:text-lg sm:text-md text-pmblue-500 sm:leading-relaxed">
                            Join us on this journey to learn about some of the preferences and habits we&apos;ve
                            discovered from several years of survey responses!
                        </p>
                    </div>
                </div>
            </section>

            <MarqueeBanner text="Travel Back in Time to Explore Stats From Past Years" />
            <div>
                <div className="w-full bg-pmpink2-500 py-8 sm:py-12">
                    <div className="w-full max-w-screen-lg mx-auto flex flex-col md:flex-row items-center justify-center text-white px-6 sm:px-12">

                        <div className="md:flex flex-wrap justify-center items-center md:justify-start gap-4 mb-6 md:mt-0">
                            {[2022, 2023, 2024].map((y) => (
                                <Button key={y} onClick={() => setYear(y)} bold={true}>
                                    {y}
                                </Button>
                            ))}
                        </div>
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
