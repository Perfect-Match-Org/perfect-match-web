
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getUser, updateProfile } from '@/database/controllers';
import { Session } from 'next-auth';
import { User } from '@/lib/types/users';
import { NextResponse } from 'next/server';
import { connect } from '@/database/index';

async function handler(req: Request, res: NextApiResponse<User | string>) {
    const session: Session | null = await getServerSession(authOptions);
    if (!session) return res.status(401).send('Unauthorized');

    await connect();
    const { method } = req;
    switch (method) {
        case 'GET': {
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

export { handler as GET, handler as POST };
