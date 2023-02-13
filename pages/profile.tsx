import Head from "next/head";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { ProfileTabs } from "../components/profile-tabs";
import { Spinner } from "../components/general";
import { NextPage } from "next";
import { getSession } from "next-auth/react";
import { fetcher } from "../helpers/fetch";
import useSWR from "swr";

const Profile: NextPage = (props: any) => {
  const { data, error, mutate } = useSWR("/api/profile", fetcher);
  // const refresh = () => mutate();
  if (!data) return <Spinner />;
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
              Welcome Back, {data.profile.firstName}!
            </h1>
            <p className="mt-1 text-xl  font-bold text-gray-500">
              Let&apos;s get matching
            </p>
          </div>
        </section>
      </div>
      <div>
        {" "}
        <section className="bg-white ">
          <div className="gap-10 pb-5 sm:px-14 items-center mx-auto max-w-screen-xl  ">
            <div className="bg-white rounded-lg h-auto">
              <ProfileTabs user={data} />
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
      redirect: { permanent: false, destination: "/api/auth/signin" },
      props: {},
    };
  return {
    props: {
      user: session.user,
    },
  };
}

export default Profile;
