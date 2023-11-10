import type { NextApiRequest, NextApiResponse } from 'next';
import { connect } from '@/database'
import { Session } from 'next-auth';
import { unstable_getServerSession } from 'next-auth/next';
import authOptions from '../auth/[...nextauth]';
import { updateMatchReview } from '@/controllers'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session: Session | null = await unstable_getServerSession(req, res, authOptions);
    if (!session) return res.status(401).send('Unauthorized');
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    await connect();

    const { mid: matchId } = req.query;
    const userEmail = session.user?.email!;
    const review = JSON.parse(req.body);

    const doc = await updateMatchReview(userEmail, matchId as string, review);
    if (!doc) return res.status(403).send('Forbidden: You are not a part of this match');

    return res.status(200).json(doc);
}
