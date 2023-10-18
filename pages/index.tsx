import Head from 'next/head';
import type { NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { Footer } from '../components/footer';
import { GoogleAuth } from '../components/general';
import { Header } from '../components/header';
import { fetcher } from '../utils/fetch';
import useSWR from 'swr';

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
                        <h1 className="text-xl text-gray-600 font-extrabold sm:text-3xl">Let's find your </h1>
                        <h1 className="text-2xl text-gray-600 font-extrabold sm:text-4xl"><strong className="mt-1 lg:mt-2 lg:mt-3 block font-extrabold text-rose-400">Perfect Match! </strong></h1>
                        <p className="mt-4 mx-[5%] lg:max-w-lg sm:mx-[10%] lg:mx-0 sm:text-xl text-gray-500 sm:leading-relaxed">
                            Give us feedback on your matches and recieve one additional match in 2024!
                        </p>

                        <p className="mx-[5%] sm:mx-[10%] lg:max-w-lg lg:mx-0 mt-4 sm:text-xl text-gray-500 sm:leading-relaxed">
                            Over 4500+ Cornellians matched this year!{' '}
                        </p>
                        <p className="mx-[5%] sm:mx-[10%] lg:max-w-lg lg:mx-0 mt-4 sm:text-xl text-gray-500 sm:leading-relaxed">
                        </p>

                        <div className="flex lg:contents">
                            <div className="mt-8 flex flex-wrap gap-4 text-center mx-auto">
                                <GoogleAuth login={!props.user} />
                            </div>
                        </div>
                    </div>
                </div>
            </section >

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
