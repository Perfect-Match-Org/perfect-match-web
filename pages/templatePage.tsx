import styles from "../styles/Home.module.css";
import Head from "next/head";
import Script from "next/script";
import Footer from "../components/footer";
import Header from "../components/header";

const Contact: any = (props: any) => {
  return (
    <div>
      <Header props={props} />

      <Footer />
    </div>
  );
};

export default Contact;
