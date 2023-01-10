import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { getUser, createUser } from "../../../database/controllers";
import connect from "../../../database/database";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ profile }) {
      try {
        let success = true;
        await connect();
        const user = await getUser(profile);
        if (!user) {
          createUser(profile)
            .then((user) => (success = true))
            .catch((err) => (success = false));
        }
        return success;
      } catch (err) {
        console.error(err);
        return false;
      }
    },
  },
});
