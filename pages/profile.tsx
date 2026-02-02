import Head from 'next/head';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { ProfileTabs } from '@/components/profile-tabs';
import { Spinner } from '@/components/general';
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
    console.log('Profile data:', data);

    if (error || matchesError) {
        signOut({ callbackUrl: '/api/auth/signin' });
        return <Spinner />;
    }

    if (!data || !matches) return <Spinner />;

    return (
        <div>
            <Head>
                <title>Profile</title>
            </Head>
            <Header />

            <section className="bg-white pt-5">
                <div className="gap-10 pb-5 sm:px-14 items-center mx-auto max-w-screen-xl">
                    <div className="bg-white font-work-sans rounded-lg h-auto">
                        <ProfileTabs user={data} refresh={refresh} />
                    </div>
                </div>
            </section>
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