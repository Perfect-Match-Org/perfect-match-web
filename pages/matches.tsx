import { getSession } from "next-auth/react";
import React from "react";
import { UserInfo } from "../types/User";

const Matches: any = (props: UserInfo) => {
  const userName = props.user.name;
  return (
    <div>
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
