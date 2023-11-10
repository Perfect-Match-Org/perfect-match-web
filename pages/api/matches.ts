import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import authOptions from './auth/[...nextauth]';
import { getUser } from '@/controllers'
import { Session } from 'next-auth';
import { connect } from '@/database'
import { Matches } from '@/types/users';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Matches[] | String>) {
    const session: Session = (await unstable_getServerSession(req, res, authOptions))!;
    if (!session) return res.status(401).send('Unauthorized');
    if (req.method !== 'GET') return res.status(405).send('Method Not Allowed');

    await connect();

    const matches: Matches[] = (await getUser(session.user)).matches;
    return res.status(200).json(matches);
}
