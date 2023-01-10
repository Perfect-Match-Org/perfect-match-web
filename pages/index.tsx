import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Countdown, { calcTimeDelta, formatTimeDelta } from "react-countdown";
import logo from "../public/logo2.png";
import { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { getSession, useSession } from "next-auth/react";
import Footer from "../components/footer";
import GoogleAuth from "../components/googleAuth";

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
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);
  return (
    <div className={styles.countdown}>
      <Head>
        <title>Perfect Match</title>
        <meta name="description" content="Find your Perfect Match" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {!props.user && <GoogleAuth login={true} />}
        {props.user && <GoogleAuth login={false} />}
        <div className={styles.landingtext}>
          <h1>
            <TypeAnimation
              // Same String at the start will only be typed once, initially
              sequence={["missed us...?", 1000]}
              speed={5} // Custom Speed from 1-99 - Default Speed: 40
              style={{ fontSize: "1.25em" }}
              wrapper="span" // Animation will be rendered as a <span>
              repeat={Infinity} // Repeat this Animation Sequence infinitely
            />
          </h1>
          <Image src={logo} width={100} height={100} />
          <br></br>
          {Ticket()}
        </div>
      </main>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  return {
    props: {
      user: session,
    },
  };
}

export default Home;
