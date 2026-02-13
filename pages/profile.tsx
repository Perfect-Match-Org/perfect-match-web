import Head from 'next/head';
import DatingWithDataBanner from '@/components/DatingWithDataBanner';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { ProfileTabs } from '@/components/profile-tabs';
import { Spinner } from '@/components/general';
import React from 'react';
import { NextPage } from 'next';
import { getSession, signOut } from 'next-auth/react';
import { fetcher } from '@/utils/fetch';
import useSWR from 'swr';
import Image from 'next/image';
import SurveyComponent from '@/components/profile-tabs/survey';

const Profile: NextPage = (props: any) => {
    const { data, error, mutate } = useSWR('/api/profile', fetcher);
    const { data: matches, error: matchesError, mutate: refreshMatches } = useSWR('/api/matches', fetcher);

    const refresh = () => mutate();

    React.useEffect(() => {
        if (error || matchesError) {
            signOut({ callbackUrl: '/api/auth/signin' });
        }
    }, [error, matchesError]);

    if (error || matchesError) {
        return <Spinner />;
    }

    if (!data || !matches) return <Spinner />;

    return (
        <div>
            <Head>
                <title>Profile</title>
            </Head>
            <Header />

            <div>
                <section className="bg-pmpink2-500">

                    <div className="px-4 font-dela-gothic items-center sm:pt-16 sm:pb-10 py-10 sm:px-14 mx-auto max-w-screen-xl lg:grid lg:grid-cols-1">
                        <h1 className="text-3xl sm:text-5xl text-pmred-500 flex items-center">
                            <Image
                                src="/wing.svg"
                                alt="Wing"
                                width={148}
                                height={148}
                                className="inline-block mr-2 sm:block"
                            />
                            Hey {data.profile.firstName},
                        </h1>
                        {matches.length > 0 ? (
                            <>
                                <div className="text-center mb-0">
                                    <h2 className="font-dela-gothic text-2xl tracking-tight text-pmblue-500 mb-6 sm:text-5xl">
                                        Your Matches are here
                                    </h2>
                                    <div className="max-w-screen-lg mx-auto">
                                        <p className="font-work-sans text-pmblue-500 text-lg ml-14 sm:text-xl font-medium text-left">
                                            <Image
                                                src="/1.svg"
                                                alt="Step One"
                                                width={32}
                                                height={32}
                                                className="inline-block mr-2"
                                            />
                                            <strong>Click</strong> on the card to flip it and <strong>see more</strong> about your match!
                                            <div className="pl-5 inline-block">
                                                <Image
                                                    src="/flip.png"
                                                    alt="Flip One"
                                                    width={96}
                                                    height={96}
                                                    className="inline-block mr-2 animate-jiggle ml-6"
                                                />
                                            </div>
                                        </p>
                                        <p className="font-work-sans text-pmblue-500 text-lg sm:text-xl ml-32 font-medium text-center mt-20">
                                            <Image
                                                src="/2.svg"
                                                alt="Step Two"
                                                width={32}
                                                height={32}
                                                className="inline-block mr-2"
                                            />
                                            <strong>Poke</strong> your match to <strong>unlock hidden info</strong>&mdash;we&rsquo;ll also send them an email (not anonymous!) to let them know you&rsquo;re curious 👀
                                        </p>
                                        <p className="font-work-sans text-pmblue-500 text-base sm:text-xl ml-16 font-medium text-left mt-20">
                                            <Image
                                                src="/3.svg"
                                                alt="Step Three"
                                                width={32}
                                                height={32}
                                                className="inline-block mr-2"
                                            />
                                            <strong>Ask</strong> your match for a cute date on Valentines day
                                        </p>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="text-center mb-0">
                                    <h2 className="font-dela-gothic text-2xl tracking-tight text-pmblue-500 mb-6 sm:text-5xl">
                                        Looking for your matches?
                                    </h2>
                                    <h3 className="font-work-sans text-2xl font-medium text-pmblue-500 mb-6 sm:text-2xl">
                                        Make sure to complete these steps next cycle!
                                    </h3>
                                    <div className="max-w-screen-lg mx-auto">
                                        <p className="font-work-sans text-pmblue-500 text-lg ml-14 sm:text-xl font-medium text-left mt-20">
                                            <Image
                                                src="/1.svg"
                                                alt="Step One"
                                                width={32}
                                                height={32}
                                                className="inline-block mr-2"
                                            />
                                            <strong>Opt in</strong> to the matching cycle to participate
                                        </p>
                                        <p className="font-work-sans text-pmblue-500 text-lg sm:text-xl ml-32 font-medium text-center mt-20">
                                            <Image
                                                src="/2.svg"
                                                alt="Step Two"
                                                width={32}
                                                height={32}
                                                className="inline-block mr-2"
                                            />
                                            <strong>Complete your profile</strong> with details about yourself
                                        </p>
                                        <p className="font-work-sans text-pmblue-500 text-base sm:text-xl ml-16 font-medium text-left mb-20 mt-20">
                                            <Image
                                                src="/3.svg"
                                                alt="Step Three"
                                                width={32}
                                                height={32}
                                                className="inline-block mr-2"
                                            />
                                            <strong>Fill out the matching survey</strong> to help us find your Perfect Match
                                        </p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </section>
            </div>
            {matches.length > 0 && (
                <section className="bg-white pt-5">
                    <div className="gap-10 pb-5 sm:px-14 items-center mx-auto max-w-screen-xl">
                        <div className="bg-white font-work-sans rounded-lg h-auto">
                            <ProfileTabs user={data} refresh={refresh} />
                        </div>
                    </div>
                </section>
            )}


            <div className="w-screen-xl py-10 bg-pmpink-500">
                <div className="relative sm:w-3/4 lg:w-2/3 lg:max-w-3xl mx-[2%] sm:mx-auto">
                    <DatingWithDataBanner />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export async function getServerSideProps(context: any) {
    // SURVEY CLOSED — redirect all users to home page
    // Remove this block and uncomment the original logic below for next year's cycle
    // return {
    //     redirect: { permanent: false, destination: '/' },
    //     props: {},
    // };

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
    */
}

export default Profile;