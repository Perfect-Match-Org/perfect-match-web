import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { getUser, createUser } from "../../../database/controllers";
import { connect } from "../../../database/database";

const isValidCornellEmail = (email: string) => {
  const domain = email.split("@")[1];
  if (domain !== "cornell.edu" && email !== "cornell.perfectmatch@gmail.com")
    return false;
  return true;
};

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ profile }) {
      if (!isValidCornellEmail(profile?.email!)) return false;
      await connect();
      const user = await getUser(profile);
      if (!user) {
        try {
          await createUser(profile);
        } catch (err) {
          console.error(err);
          return false;
        }
      }
      return true;
    },
  },
});
