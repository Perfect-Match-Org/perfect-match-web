import { NextApiRequest, NextApiResponse } from 'next';
import getServerSession from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import { updateUserOptIn } from '@/database/controllers';
import { Session } from 'next-auth';
import { NextResponse } from 'next/server';
import { connect } from '@/database/index';

export default async function handler(req: NextApiRequest, res: NextApiResponse<boolean | string>) {
    const session: Session | null = await getServerSession(authOptions);
    if (!session) return NextResponse.json('Unauthorized', { status: 401 });

    await connect();
    const requestOptIn = JSON.parse(req.body)?.optIn;
    const resp = await updateUserOptIn(session.user, requestOptIn);
    if (!resp) return NextResponse.json('User not found', { status: 404 });
    return NextResponse.json(resp.optIn, { status: 200 });
}

export { handler as POST };
