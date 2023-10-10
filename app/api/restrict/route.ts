import { NextApiRequest, NextApiResponse } from 'next';
import getServerSession from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { updateCrushes, updateForbidden } from '@/database/controllers';
import { Session } from 'next-auth';
import { NextResponse } from 'next/server';
import { User } from '@/lib/types/users';
import { connect } from '@/database/index';

async function handler(req: NextApiRequest, res: NextApiResponse<User[] | string>) {
    const session: Session | null = await getServerSession(authOptions);
    if (!session) return NextResponse.json('Unauthorized', { status: 401 });

    const body = JSON.parse(req.body);

    await connect();
    const crushes = updateCrushes(session.user, body.crushes);
    const forbidden = updateForbidden(session.user, body.forbidden);

    const resp: User[] = await Promise.all([crushes, forbidden]);
    return NextResponse.json(resp, { status: 200 });
}

export { handler as POST };
