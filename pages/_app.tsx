import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Analytics } from '@vercel/analytics/react';


function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  const { session } = pageProps;
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      <Analytics />
    </SessionProvider>
  );
}

export default MyApp;
