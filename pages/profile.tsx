import styles from "../styles/Home.module.css";
import Head from 'next/head'
import Script from "next/script";
import Footer from "../components/footer";
import Header from "../components/header";
import ProfileTabs from "../components/profileTabs";



const Contact: any = (props: any) => {
    return (
        <div >
            <Header props={props} />
            <div> <section className="bg-white dark:bg-rose-300">
                <div className="gap-10 items-center py-4 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-1 ">
                    <h1 className="text-2xl font-bold text-gray-600 sm:text-3xl">
                        Welcome Back, Jamal!
                    </h1>

                    <p className="mt-1 text-xl  font-bold text-white-500">
                        Let's get matching!
                    </p>
                </div>
            </section></div>
            <div> <section className="bg-white dark:bg-rose-300">
                <div className="gap-10 items-center py-0 px-0 mx-auto max-w-screen-xl  ">
                    <div className="bg-white rounded-lg h-auto">
                        <ProfileTabs />
                    </div>
                </div>



            </section></div>

            <Footer />
        </div>
    );
};

export default Contact;
