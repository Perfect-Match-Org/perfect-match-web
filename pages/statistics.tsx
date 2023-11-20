import styles from '@/styles/Home.module.css';
import Head from 'next/head';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import Link from 'next/link';
import Script from 'next/script';
import Image from 'next/image';
import Stats2023 from '@/components/analytics/2023Analytics';
import Stats2022 from '@/components/analytics/2022Analytics';
import { Stats } from 'fs';
import { useState } from 'react';

const Statistics: any = (props: any) => {
    const [year, setYear] = useState(2022);

    return (
        <div>
            <Head>
                <title>Statistics</title>
            </Head>
            <Header />`
            <div className="bg-white sm:py-14 lg:py-6 sm:pr-4 pt-6">
                {' '}
                <section
                    className="sm:mr-0"
                    style={{
                        paddingBottom: '20px',
                        paddingTop: '20px',
                        height: '100%',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right top',
                        backgroundImage: 'url("valentine.png")',
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
                <button onClick={() => setYear(2022)}>2022</button>
                <button onClick={() => setYear(2023)}>2023</button>

                {year === 2022 ? <Stats2022 /> : <Stats2023 />}
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
