import styles from "../styles/Home.module.css";
import Footer from "../components/footer";
import Head from 'next/head'
import Script from "next/script";


const Home: any = () => {
  return (
    <div className={styles.countdown}>
      <h1> Coming Soon</h1>

      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
