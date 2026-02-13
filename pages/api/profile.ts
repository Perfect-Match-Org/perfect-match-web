import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import authOptions from './auth/[...nextauth]';
import { getUser, updateProfile } from '@/controllers';
import { Session } from 'next-auth';
import { connect } from '@/database';
import { User } from '@/types/users';

/**
 * API handler to manage user profiles.
 * Supports GET for retrieving the user profile and POST for updating it.
 * The function first checks the user session for authentication.
 * Depending on the request method, it either retrieves or updates the user's profile.
 *
 * @param {NextApiRequest} req - The API request object.
 * @param {NextApiResponse<User | String>} res - The API response object used to return the user or an error message.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<User | String>) {
    const session: Session = (await getServerSession(req, res, authOptions))!;
    if (!session) return res.status(401).send('Unauthorized');

    await connect();

    const { method } = req;
    switch (method) {
        case 'GET': {
            const user = await getUser(session.user);
            if (!user) return res.status(404).send('User not found');
            return res.status(200).json(user);
        }
        case 'POST': {
            const user = await updateProfile(session.user, JSON.parse(req.body));
            return res.status(200).json(user);
        }
        default:
            return res.status(405).send('Method Not Allowed');
    }
}
