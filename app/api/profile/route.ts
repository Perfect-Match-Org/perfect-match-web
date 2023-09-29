import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getUser, updateProfile } from '@/database/controllers';
import { Session } from 'next-auth';
import { connect } from '@/database/index';
import { Profile } from '@/lib/types/users';
import { NextResponse } from 'next/server';

async function handler(req: NextApiRequest, res: NextApiResponse<Profile | String>) {
    const session: Session | null = await getServerSession(authOptions);
    if (!session) return res.status(401).send('Unauthorized');

    await connect();
    const { method } = req;
    switch (method) {
        case 'GET': {
            console.log(session);
            const profile = await getUser(session.user);
            return NextResponse.json(profile, { status: 200 });
        }
        case 'POST': {
            const profile = await updateProfile(session.user, JSON.parse(req.body));
            return NextResponse.json(profile, { status: 200 });
        }
        default:
            return NextResponse.json('Method Not Allowed', { status: 405 });
    }
}

export { handler as GET, handler as POST }