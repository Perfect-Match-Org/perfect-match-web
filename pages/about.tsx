import styles from "../styles/Home.module.css";
import Footer from "../components/footer";

const Home: any = () => {
    return (
        <div className={styles.countdown}>
            < h1 > About</h1 >
            <div className={styles.footer}>
                <Footer />
            </div>
        </div >

    );
};

export default Home;
