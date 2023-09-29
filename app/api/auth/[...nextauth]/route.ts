import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { getUser, createUser } from '@/database/controllers';
import { connect } from '@/database/index';

const isValidCornellEmail = (email: string): boolean => {
    const domain = email.split('@')[1];
    return domain === 'cornell.edu' || email === 'cornell.perfectmatch@gmail.com';
};

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    pages: {
        error: '/auth/error',
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ profile }) {
            if (!profile || !isValidCornellEmail(profile.email!)) {
                return false;
            }

            try {
                await connect();
                const user = await getUser(profile);
                if (!user) await createUser(profile);
            } catch (err) {
                console.error('Error in signIn callback', err);
                return false;
            }

            return true;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
