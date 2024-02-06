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
import Blogposts from '@/components/blogposts/index';
import Members from '@/components/members';

const Blog: any = (props: any) => {
    const [year, setYear] = useState(2023);

    return (
        <div>
            <Head>
                <title>Blog</title>
            </Head>
            <Header />
            <div className="bg-white sm:py-14 lg:py-10 sm:pr-4 pt-6">
                <section
                    className="sm:mr-0"
                    style={{
                        paddingBottom: '20px',
                        paddingTop: '10px',
                        height: '10%',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right top',
                        // backgroundImage: 'url("valentine.png")',
                    }}
                >
                    <div className="pb-4 pt-32 sm:pt-48 lg:pt-48 lg:pb-24">
                        <div className="max-w-l text-center sm:text-left sm:ml-[15%] mt-8 sm:mt-0 opacity-100">
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-rose-400 lg:text-5xl opacity-100">
                                Blog
                            </h1>
                            <p className="mt-4 mx-[10%] sm:mx-0 max-w-lg sm:text-lg text-gray-500 sm:leading-relaxed">
                                <strong>Stories from the team and community behind Perfect Match</strong>{' '}
                            </p>
                        </div>
                    </div>
                </section>
            </div>

            <div>
                <Blogposts />
            </div>

            <Footer />
        </div>
    );
};

export async function getStaticProps() {
    return {
        props: {
            title: 'Blog',
        },
    };
}

export default Blog;
