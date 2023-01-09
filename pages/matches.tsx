import { NextPage } from "next";
import { getSession } from "next-auth/react";
import React from "react";
import { Profile } from "../types/Profile";

const Matches: NextPage<Profile> = (props) => {
  const userName = props.name;
  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <h1>Hi {userName}! View your matches!</h1>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  if (!session) {
    context.res.writeHead(302, { Location: "/" });
    context.res.end();
    return {};
  }
  return {
    props: {
      user: session.user,
    },
  };
}

export default Matches;
