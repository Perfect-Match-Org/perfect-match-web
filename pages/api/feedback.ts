import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import authOptions from './auth/[...nextauth]';
import { updateFeedback } from '@/controllers';
import { Session } from 'next-auth';
import { connect } from '@/database';
import { Profile } from '@/types/users';

/**
 * API handler to update user feedback and return the updated user profile.
 * It first validates the session to ensure that the user is authenticated.
 * Depending on the request method, it either updates the feedback or responds with an error.
 *
 * @param {NextApiRequest} req - The API request object.
 * @param {NextApiResponse<Profile | String>} res - The API response object used to return the updated profile or an error message.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<Profile | String>) {
    const session: Session = (await unstable_getServerSession(req, res, authOptions))!;
    if (!session) return res.status(401).send('Unauthorized');

    await connect();

    const { method } = req;
    switch (method) {
        case 'POST': {
            const profile = await updateFeedback(session.user, req.body);
            return res.status(200).json(profile);
        }
        default:
            return res.status(405).send('Method Not Allowed');
    }
}
