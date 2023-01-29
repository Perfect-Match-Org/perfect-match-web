import type { NextPage } from "next";
import Head from "next/head";
import Countdown from "react-countdown";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import Footer from "../components/footer";
import GoogleAuth from "../components/googleAuth";
import Header from "../components/header";
import useSWR from "swr";
import { fetcher } from "../helpers/fetch";

const Home: NextPage = (props: any) => {
  const { data: currentCount, error } = useSWR("/api/count", fetcher, {
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
      
      <section className ="sm:mx-[5%]" style={{ marginBottom: "20px", marginTop: "-10px", backgroundImage: "url(\"Cecil.png\")", height: "100%", backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "right top"}}>
        <div className="mx-auto max-w-screen-xl pt-[70%] pb-10 lg:items-center sm:pt-60 sm:pb-36">
          <div className="max-w-xl text-center sm:text-left sm:ml-[8%] mt-8 sm:mt-0">
            <h1 className="text-3xl text-gray-600 font-extrabold sm:text-5xl">
              Let us find your
              <strong className="mt-2 sm:mt-3 block font-extrabold text-rose-400">
              Perfect Match💘!
              </strong>
            </h1>
            <p className="mt-4 mx-[10%] sm:mx-0 max-w-lg sm:text-xl text-gray-500 sm:leading-relaxed">
              Last year, we had over 4,200 participants. Share the link with
              your friends, and help spread some joy in 2023!
            </p>
            {!error && currentCount && (
              <p className="mt-4 max-w-lg sm:text-xl text-gray-500 sm:leading-relaxed">
                Join over {currentCount} Cornellians getting matched this year!
              </p>
            )}
            <div className="flex sm:contents">
              <div className="mt-8 flex flex-wrap gap-4 text-center mx-auto">
                <GoogleAuth login={!props.user} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
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
