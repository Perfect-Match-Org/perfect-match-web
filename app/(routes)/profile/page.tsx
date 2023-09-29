import Head from 'next/head';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { ProfileTabs } from '@/components/profile-tabs';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { NextPage } from 'next';
import { redirect } from 'next/navigation';

export default async function Page() {
    const session = await getServerSession(authOptions);

    if (!session || session == undefined) redirect('/api/auth/signin');

    return (
        <div>
            <Head>
                <title>Profile</title>
            </Head>
            <Header />
            <div>
                <section className="bg-white ">
                    <div className="px-10 items-center pb-0 sm:pb-5 pt-20 sm:px-14 mx-auto max-w-screen-xl lg:grid lg:grid-cols-1">
                        <h1 className="text-2xl font-bold sm:text-3xl font-extrabold text-rose-400">
                            Welcome Back, {session && session.user?.name}!
                        </h1>
                        <p className="mt-1 text-xl  font-bold text-gray-500">Let&apos;s get matching</p>
                    </div>
                </section>
            </div>
            <div>
                <section className="bg-white ">
                    <div className="gap-10 pb-5 sm:px-14 items-center mx-auto max-w-screen-xl  ">
                        <div className="bg-white rounded-lg h-auto">
                            <ProfileTabs />
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
}
