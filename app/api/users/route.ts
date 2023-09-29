import { NextApiRequest, NextApiResponse } from 'next';
import getServerSession from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getUsers } from '@/database/controllers';
import { Session } from 'next-auth';
import { connect } from '@/database/index';
import { isAdmin } from '@/lib/utils/admins'
import { User } from '@/lib/types/users';
import { NextResponse } from 'next/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse<User[] | String>) {
    const session: Session | null = await getServerSession(authOptions);

    if (!session) return res.status(401).send('Unauthorized');
    else if (!isAdmin(session.user?.email!)) return res.status(401).send('Unauthorized');
    else if (req.method !== 'GET') return res.status(405).send('Method Not Allowed');

    await connect();

    const users = await getUsers();
    return NextResponse.json(users, { status: 200 });
}
