import type { NextPage } from "next";
import Head from "next/head";
import Countdown from "react-countdown";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import Footer from "../components/footer";
import GoogleAuth from "../components/googleAuth";
import Header from "../components/header";

const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
  if (completed) {
    // Render a completed state
    return <span></span>;
  } else {
    // Render a countdown
    return (
      <div className="text-rose-400">
        <h1>
          {" "}
          {days} days {hours} hours {minutes} minutes {seconds} seconds
        </h1>
      </div>
    );
  }
};

function Ticket() {
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);

  // This useEffect will only run once, during the first render
  useEffect(() => {
    // Updating a state causes a re-render
    setInitialRenderComplete(true);
  }, []);

  // initialRenderComplete will be false on the first render and true on all following renders
  if (!initialRenderComplete) {
    // Returning null will prevent the component from rendering, so the content will simply be missing from
    // the server HTML and also wont render during the first client-side render.
    return null;
  } else {
    const date = new Date();
    return (
      <Countdown
        date={new Date("2023-02-01T00:00:00")}
        renderer={renderer}
        daysInHours={false}
      />
    );
  }
}

const Home: NextPage = (props: any) => {
  return (
    <div>
      <Head>
        <title>Perfect Match</title>
        <meta name="description" content="Find your Perfect Match" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <section className="relative bg-[url(../public/Cecil.png)] bg-bottom bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:bg-gradient-to-r sm:from-white/95 sm:to-white/25"></div>
        <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
          <div className="max-w-xl text-center sm:text-left">
            <h1 className="text-3xl text-gray-600 font-extrabold sm:text-5xl">
              Let us find your
              <strong className="block font-extrabold text-rose-400">
                Perfect Match!
              </strong>
            </h1>
            <p className="mt-4 max-w-lg sm:text-xl text-gray-600 sm:leading-relaxed">
              Last year, we had over 4,200 participants. Share the link with
              your friends, and help spread some joy in 2023!
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
