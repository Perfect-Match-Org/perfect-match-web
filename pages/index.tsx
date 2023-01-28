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
      <div className="bg-rose-400">
        <div className="mx-auto max-w-4xl py-1 px-3 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex w-0 flex-1 items-center">
              <span className="flex rounded-lg bg-white p-2">
                {/* <MegaphoneIcon className="h-6 w-6 text-white" aria-hidden="true" /> */}
              </span>
              <p className="ml-3 truncate font-medium text-white">
                <span className="hidden md:inline">
                  Interested in joining the Perfect Match Team?{" "}
                </span>
              </p>
            </div>
            <div className="order-3 mt-2 w-full flex-shrink-0 sm:order-3 sm:mt-0 sm:w-auto">
              <a
                href="http://www.google.com"
                className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-rose-400 shadow-sm hover:bg-rose-50"
              >
                Apply Here!
              </a>
            </div>
            <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
              <button
                type="button"
                className="-mr-1 flex rounded-md p-2 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
              >
                {/* <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" /> */}
              </button>
            </div>
          </div>
        </div>
      </div>
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
