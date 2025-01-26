import styles from '@/styles/Home.module.css';
import Head from 'next/head';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import Link from 'next/link';
import Stats2023 from '@/components/analytics/2023Analytics';
import Stats2022 from '@/components/analytics/2022Analytics';
import Stats2024 from '@/components/analytics/2024Analytics';
import { useState } from 'react';

const Statistics = (props: { title: string }) => {
    const [year, setYear] = useState(2024); // Default year

    return (
        <div>
            <Head>
                <title>{props.title}</title>
            </Head>
            <Header />
            <div className="bg-white sm:py-14 lg:py-10 sm:pr-4 pt-6">
                <section
                    className="sm:mr-0"
                    style={{
                        paddingBottom: '20px',
                        paddingTop: '20px',
                        height: '100%',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right top',
                        backgroundImage: 'url("/valentine.png")', // Ensure correct asset path
                    }}
                >
                    <div className="pb-6 pt-56 sm:pt-64 lg:pt-64 lg:pb-36">
                        <div className="max-w-xl text-center sm:text-left sm:ml-[15%] mt-8 sm:mt-0 opacity-100">
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-rose-400 lg:text-5xl opacity-100">
                                Can Love be Visualized?
                            </h1>
                            <p className="mt-4 mx-[10%] sm:mx-0 max-w-lg sm:text-lg text-gray-500 sm:leading-relaxed">
                                <strong>
                                    Perhaps not without daydreaming about your crush, but your survey responses can!
                                </strong>{' '}
                                Join us on this journey to learn about some of the preferences and habits we&apos;ve
                                discovered from several years of survey responses!
                            </p>
                        </div>
                    </div>
                </section>
            </div>

            <div>
                <div className="w-full flex flex-col items-center justify-center text-white bg-pink-100 sm:py-12 py-8">
                    <p className="text-center mt-4 sm:text-lg text-gray-500 font-bold mx-[5%] sm:mx-[10%] lg:mx-[20%]">
                        See this year&apos;s statistics or travel back in time to explore statistics from past years!
                    </p>
                    <div className="flex sm:mt-4 mt-2 gap-4">
                        {[2022, 2023, 2024].map((y) => (
                            <button
                                key={y}
                                className={`text-lg ${year === y
                                    ? 'bg-rose-700' // Active button color
                                    : 'bg-rose-400 hover:bg-rose-300'
                                    } text-white font-bold py-2 px-8 rounded-full m-2`}
                                onClick={() => setYear(y)}
                            >
                                {y}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Render the statistics for the selected year */}
                {year === 2022 ? (
                    <Stats2022 />
                ) : year === 2023 ? (
                    <Stats2023 />
                ) : (
                    <Stats2024 />
                )}
            </div>

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