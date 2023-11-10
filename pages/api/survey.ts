import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import authOptions from './auth/[...nextauth]';
import { updateSurvey } from '@/controllers'
import { Session } from 'next-auth';
import { connect } from '@/database'
import { Survey } from '@/types/users';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Survey | String>) {
    const session: Session | null = await unstable_getServerSession(req, res, authOptions);
    if (!session) return res.status(401).send('Unauthorized');
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    await connect();

    const survey = await updateSurvey(session.user, JSON.parse(req.body));
    return res.status(200).json(survey);
}
