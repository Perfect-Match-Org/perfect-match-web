import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import authOptions from './auth/[...nextauth]';
import { getUser } from '../../database/controllers';
import { Session } from 'next-auth';
import { connect } from '../../database/database';
import { Match } from '../../types/matches';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Match[] | String>) {
    const session: Session = (await unstable_getServerSession(req, res, authOptions))!;
    if (!session) return res.status(401).send('Unauthorized');
    if (req.method !== 'GET') return res.status(405).send('Method Not Allowed');

    await connect();

    const matches: Match[] = (await getUser(session.user)).matches;
    return res.status(200).json(matches);
}
