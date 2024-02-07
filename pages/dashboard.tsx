import Head from 'next/head';
import type { NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { Footer } from '@/components/footer';
import LiveDashboard from '@/components/analytics/live-dashboard';
import { Header } from '@/components/header';
import { fetcher } from '@/utils/fetch';
import useSWR from 'swr';


const Dashboard: NextPage = (props: any) => {
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

            <LiveDashboard />

            <Footer />

        </div>
    );
};

export async function getDashboardProps() {
    return {
        props: {
            title: 'Dashboard',
        },
    };
}

export default Dashboard;
