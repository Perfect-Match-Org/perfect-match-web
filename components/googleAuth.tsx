import React from "react";
import { signIn, signOut, getSession } from "next-auth/react";

type AuthProps = {
  login: boolean;
};

const GoogleAuth = (props: AuthProps) => {
  const auth = () => {
    props.login
      ? signIn("google", { callbackUrl: "http://localhost:3000/matches" })
      : signOut();
  };

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          auth();
        }}
      >
        {props.login ? "Sign In" : "Sign Out"}
      </button>
    </div>
  );
};

export default GoogleAuth;
