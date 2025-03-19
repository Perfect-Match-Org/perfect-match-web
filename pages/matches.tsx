import { NextPage } from 'next';
import { getSession } from 'next-auth/react';
import React from 'react';
import { Match } from '@/types/matches';
import Head from 'next/head';

const Matches: NextPage<Match[]> = (props) => {
    return (
        <div>
            <Head>
                <title>Matches</title>
            </Head>
            <div className="flex h-screen w-screen justify-center items-center">
                <h1>Hi! View your matches!</h1>
            </div>
        </div>
    );
};

/**
 * Declaring the server-side props makes the page server-side rendered.
 * If the user is not logged in, redirect to the login page. Otherwise, return the user's session.
 * @param context The request context that contains the request object.
 * @returns The user's session if they are logged in, otherwise redirect to the login page.
 */
export async function getServerSideProps(context: any) {
    const session = await getSession(context);
    if (!session) {
        return { redirect: { permanent: false, destination: '/' }, props: {} };
    }
    return { props: { user: session.user } };
}

export default Matches;
