import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import authOptions from './auth/[...nextauth]';
import { updateSurvey } from '@/controllers';
import { Session } from 'next-auth';
import { connect } from '@/database';
import { User } from '@/types/users';

/**
 * Handles the API request to update a survey.
 * This route requires authentication and only accepts POST requests.
 * It updates the survey details of the authenticated user.
 *
 * @param {NextApiRequest} req - The incoming HTTP request.
 * @param {NextApiResponse<User | string>} res - The HTTP response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<User | String>) {
    const session: Session | null = await unstable_getServerSession(req, res, authOptions);
    if (!session) return res.status(401).send('Unauthorized');
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    await connect();

    const user = await updateSurvey(session.user, req.body);
    return res.status(200).json(user);
}
