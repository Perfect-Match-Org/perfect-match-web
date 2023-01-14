import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Router from "next/router";
import { useEffect, useState } from "react";
import Spinner from "../components/spinner";

function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  const { session } = pageProps;
  // check the state of the application
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  // if the application is loading, show a loading message
  return (
    <SessionProvider session={session}>
      {loading && <Spinner />}
      {!loading && <Component {...pageProps} />}
    </SessionProvider>
  );
}

export default MyApp;
