import styles from "../styles/Home.module.css";
import Head from "next/head";
import Script from "next/script";
import Footer from "../components/footer";
import Header from "../components/header";
import ProfileTabs from "../components/profileTabs";
import { NextPage } from "next";
import { profile } from "console";

const Profile: NextPage = (props: any) => {
  const user = props.user;
  return (
    <div>
      <Header />
      <div>
        {" "}
        <section className="bg-white dark:bg-rose-300">
          <div className="gap-10 items-center py-4 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-1 ">
            <h1 className="text-2xl font-bold text-gray-600 sm:text-3xl">
              Welcome Back, {user.profile.firstName}
            </h1>

            <p className="mt-1 text-xl  font-bold text-white">
              Let&apos;s get matching!
            </p>
          </div>
        </section>
      </div>
      <div>
        {" "}
        <section className="bg-white dark:bg-rose-300">
          <div className="gap-10 items-center mx-auto max-w-screen-xl  ">
            <div className="bg-white rounded-lg h-auto">
              <ProfileTabs user={user} />
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await fetch(`${baseURL}/api/survey`, {
      headers: {
        cookie: context.req.headers.cookie,
      },
    });
    console.log(response.status);
    const survey = await response.json();
    console.log(process.env.NODE_ENV);
    console.log(JSON.parse(JSON.stringify(survey)));
    return { props: { user: JSON.parse(JSON.stringify(survey)) } };
  } catch (error) {
    return { redirect: { permanent: false, destination: "/" }, props: {} };
  }
}

export default Profile;
