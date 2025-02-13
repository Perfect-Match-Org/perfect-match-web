import Head from 'next/head';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { ProfileTabs } from '@/components/profile-tabs';
import { Spinner } from '@/components/general';
import { NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { fetcher } from '@/utils/fetch';
import useSWR from 'swr';
import CountDown from '@/components/countdown';
import Image from 'next/image';


const Profile: NextPage = (props: any) => {
    const { data, error, mutate } = useSWR('/api/profile', fetcher);
    const refresh = () => mutate();
    if (!data) return <Spinner />;
    return (
        <div>
            <Head>
                <title>Profile</title>
            </Head>
            <Header />

            <div>
                <div className="absolute left-[-3vw] top-12 h-screen w-[18vw] hidden lg:block z-20 pointer-events-none">
                    <Image src="/leftmatchdesign.svg" alt="left hearts" layout='fill' priority={true} draggable='false' />
                </div>
                <div className="absolute right-0 top-0 h-screen w-[32vw] hidden lg:block z-20 pointer-events-none">
                    <Image src="/rightmatchdesign.svg" alt="right hearts" layout='fill' priority={true} draggable='false' />
                </div>
                <section className="bg-pmpink-500 ">
                    <div className="px-4 font-dela-gothic items-center sm:pt-16 sm:pb-10 py-10 sm:px-14 mx-auto max-w-screen-xl lg:grid lg:grid-cols-1">
                        <h1 className="text-3xl sm:text-5xl text-pmred-500 flex items-center">
                            <Image src="/wing.svg" alt="Wing" width={148} height={148} className="inline-block mr-2 sm:block" />
                            Hey {data.profile.firstName},
                        </h1>
                        <div className="text-center mb-0">
                            <h2 className="font-dela-gothic text-2xl tracking-tight text-pmblue-500 mb-6 sm:text-5xl">
                                Your Matches are here
                            </h2>
                            <div className="max-w-screen-lg mx-auto">
                                <p className="font-work-sans text-pmblue-500 text-lg sm:text-xl font-medium text-left">
                                    <Image src="/1.svg" alt="Step One" width={32} height={32} className="inline-block mr-2" />
                                    <strong>Click</strong> on the card to flip it and <strong>see more</strong> about your match! 💫
                                </p>
                                <p className="font-work-sans text-pmblue-500 text-lg sm:text-xl ml-32 font-medium text-center mt-20">
                                    <Image src="/2.svg" alt="Step Two" width={32} height={32} className="inline-block mr-2" />
                                    <strong>Poke</strong> your match to <strong>unlock hidden info</strong>&mdash;we&rsquo;ll also send them an email (not anonymous!) to let them know you&rsquo;re curious 👀
                                </p>
                                <p className="font-work-sans text-pmblue-500 text-base sm:text-xl ml-16 font-medium text-left mt-20">
                                    <Image src="/3.svg" alt="Step Three" width={32} height={32} className="inline-block mr-2" />
                                    <strong>Ask</strong> your match for a cute date on Valentines day ❤️
                                </p>
                            </div>
                        </div>
                        {/* <p className="mt-1 text-xl font-work-sans font-bold text-gray-500"> Your Matches are here</p> */}
                    </div>
                </section>
            </div>
            <div>
                {' '}
                <section className="bg-white ">
                    <div className="gap-10 pb-5 sm:px-14 items-center mx-auto max-w-screen-xl  ">
                        <div className="bg-white font-work-sans rounded-lg h-auto">
                            <ProfileTabs user={data} refresh={refresh} />
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export async function getServerSideProps(context: any) {
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
}

export default Profile;