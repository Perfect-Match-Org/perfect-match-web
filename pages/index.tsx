import type { NextPage } from "next";
import Head from "next/head";
import Countdown from "react-countdown";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import Footer from "../components/footer";
import GoogleAuth from "../components/googleAuth";
import Header from "../components/header";

var current_count = "331"
fetch("https://live-perfect-match2023-git-google-auth-cornellperfectmatch.vercel.app/api/count", {
  method: "get"
})
  .then(function (resp) {
    if (resp.ok) {
      current_count = resp.toString()
    } else {
      throw "shoot";
    }
  }).catch(function (err) {
    console.log("count fetch failed", err)
  });

const Home: NextPage = (props: any) => {
  return (
    <div>
      <Head>
        <title>Perfect Match</title>
        <meta name="description" content="Find your Perfect Match" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <section style={{ marginLeft: "5%", marginRight: "2%", marginBottom: "20px", marginTop: "-10px", backgroundImage: "url(\"Cecil.png\")", height: "100%", backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "right top" }}>
        <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8" style={{ marginTop: "auto", marginBottom: "auto" }}>
          <div className="max-w-xl text-center sm:text-left" style={{ marginLeft: "5%" }}>
            <h1 className="text-3xl text-gray-600 font-extrabold sm:text-5xl">
              Let us find your
              <strong className="mt-3 block font-extrabold text-rose-400">
                Perfect Match💘!
              </strong>
            </h1>
            <p className="mt-4 max-w-lg sm:text-xl text-gray-500 sm:leading-relaxed">
              Last year, we had over 4,200 participants. Share the link with
              your friends, and help spread some joy in 2023!
            </p>
            <p className="mt-4 max-w-lg sm:text-xl text-gray-500 sm:leading-relaxed">
              Join over {current_count} Cornellians getting matched this year!
            </p>
            <div className="mt-8 flex flex-wrap gap-4 text-center">
              <GoogleAuth login={!props.user} />
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

