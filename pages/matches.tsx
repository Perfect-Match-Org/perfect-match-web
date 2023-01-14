import { NextPage } from "next";
import { getSession } from "next-auth/react";
import React from "react";
import { Match } from "../types/matches";

const Matches: NextPage<Match> = (props) => {
  const userName = props.user.name;
  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <h1>Hi {userName}! View your matches!</h1>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  if (!session) {
    return { redirect: { permanent: false, destination: "/" }, props: {} };
  }
  return { props: { user: session.user } };
}

export default Matches;
