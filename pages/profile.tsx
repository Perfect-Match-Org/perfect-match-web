import Footer from "../components/footer";
import Header from "../components/header";
import ProfileTabs from "../components/profileTabs";
import Spinner from "../components/spinner";
import { NextPage } from "next";
import { getSession } from "next-auth/react";
import useSWR from "swr";

const Profile: NextPage = (props: any) => {
  const fetcher = (url: RequestInfo) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR("/api/profile", fetcher);
  if (!data) return <Spinner />;
  return (
    <div>
      <Header />
      <div>
        <section className="bg-white dark:bg-rose-300">
          <div className="gap-10 items-center py-4 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-1 ">
            <h1 className="text-2xl font-bold text-gray-600 sm:text-3xl">
              Welcome Back, {data.profile.firstName}!
            </h1>
            <p className="mt-1 text-xl  font-bold text-white">
              Let&apos;s get matching
            </p>
          </div>
        </section>
      </div>
      <div>
        {" "}
        <section className="bg-white dark:bg-rose-300">
          <div className="gap-10 pb-5 items-center mx-auto max-w-screen-xl  ">
            <div className="bg-white rounded-lg h-auto">
              <ProfileTabs user={data} />
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  if (!session)
    return { redirect: { permanent: false, destination: "/" }, props: {} };
  return {
    props: {
      user: session.user,
    },
  };
}

export default Profile;