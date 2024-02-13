import Head from 'next/head';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { ProfileTabs } from '@/components/profile-tabs';
import { Spinner } from '@/components/general';
import { NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { fetcher } from '@/utils/fetch';
import useSWR from 'swr';
import CountDownSurvey from '@/components/countdownSurvey'
import word from 'public/wordcloud-hq.gif';
import CountDown from '@/components/countdown';
import Image from 'next/image';

const Profile: any = (props: any) => {
    const { data, error, mutate } = useSWR('/api/profile', fetcher);
    const refresh = () => mutate();
    if (!data) return <Spinner />;
    return (
        <div>
            <Head>
                <title>Profile</title>
            </Head>
            <Header />
            <section className="bg-white flex flex-col pr-0 lg:pr-12 lg:flex-row">
                <div className="pb-6 pt-6 sm:pt-20 lg:pt-44 lg:pb-36 lg:w-3/5">
                    <div className="mx-2 max-w-xl text-center lg:text-left sm:mx-auto lg:ml-[17%] mt-8 sm:mt-0 opacity-100">
                        <h1 className="text-3xl text-gray-600 font-extrabold sm:text-4xl lg:text-5xl">
                            Let the magic
                            <strong className="mt-1 lg:mt-2 lg:mt-3 block font-extrabold text-rose-400">
                                Magic Begin🔮!
                            </strong>
                        </h1>
                        <div>
                            <CountDownSurvey />
                        </div>
                        <p className="text-lg mx-2 mt-6 lg:max-w-lg sm:mx-auto lg:text-left text-center lg:text-xl text-gray-500 sm:leading-relaxed">
                            Thanks for filling out PM2024!
                            Matches are released sometime tonight, with a reminder 
                            email sent to you. Get excited❤️‍🔥!
                        </p>
                    </div>
                </div>
                <Image priority={true} src={word} alt="Loading..." className="lg:w-2/5"></Image>
            </section>
            <Footer />
        </div>
    );
};

{/*export async function getServerSideProps(context: any) {
    const session = await getSession(context);
    if (!session)
        return {
            redirect: { permanent: false, destination: '/api/auth/signin' },
            props: {},
        };
    return {
        props: {
            user: session.user,
        },
    };
}*/}

export default Profile;
