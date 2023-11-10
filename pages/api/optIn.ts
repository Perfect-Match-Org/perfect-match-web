import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import authOptions from './auth/[...nextauth]';
import { updateUserOptIn } from '@/controllers'
import { Session } from 'next-auth';
import { connect } from '@/database'

export default async function handler(req: NextApiRequest, res: NextApiResponse<Boolean | String>) {
    const session: Session | null = await unstable_getServerSession(req, res, authOptions);
    if (!session) return res.status(401).send('Unauthorized');
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    await connect();

    const optIn = (await updateUserOptIn(session.user, JSON.parse(req.body)?.optIn)).optIn;
    return res.status(200).json(optIn);
}
