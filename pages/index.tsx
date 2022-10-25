import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Perfect Match</title>
        <meta name="description" content="Find your Perfect Match" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div style={{ position: "relative", height: "85vh", width: "100%" }}>
          <div
            style={{
              position: "absolute",
              left: "35%",
              top: "50%",
              margin: "-35px 0 0 -35px",
              translate: "translate(-50%,-50%)",
            }}
          >
            Cornell Perfect Match - Find Your Perfect Match on Campus
          </div>
        </div>
      </main>
      <footer className={styles.footer}>
        <a href="/" rel="noopener noreferrer">
          Cornell Perfect Match &#169; 2023
        </a>
      </footer>
    </div>
  );
};

export default Home;
