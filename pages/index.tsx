
// @ts-ignore
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Countdown, { calcTimeDelta, formatTimeDelta } from 'react-countdown';
import logo from '../public/logo2.png'


const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
  if (completed) {
    // Render a completed state
    return <span>It's time</span>;
  } else {
    // Render a countdown
    return <div className={styles.ticker}><h1> {days} days {hours} hours {minutes} minutes {seconds} seconds</h1></div>;

  }
};
const Home: NextPage = () => {
  return (
    <div className={styles.countdown}>
      <Head>
        <title></title>
        <meta name="description" content="Find your Perfect Match" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>miss us....? </h1>
        <Countdown
          date={new Date('2023-02-01T00:00:00')}
          renderer={renderer}
          daysInHours={false}

        />
        <Image src={logo} width={100} height= {100}/>
      </main>

    </div>
  );
};

export default Home;
