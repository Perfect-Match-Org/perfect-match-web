import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import authOptions from './auth/[...nextauth]';
import { updateCrushes, updateForbidden } from '@/controllers';
import { Session } from 'next-auth';
import { connect } from '@/database';
import { User } from '@/types/users';

/**
 * API handler to update user's crushes and forbidden users.
 * It expects a POST request with the user's updated crushes and forbidden lists.
 * The function first authenticates the user and then processes the request.
 *
 * @param {NextApiRequest} req - The API request object.
 * @param {NextApiResponse<User[] | string>} res - The API response object used to return the updated lists or an error message.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<User[] | String>) {
    const session: Session | null = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).send('Unauthorized');
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    await connect();

    const body = JSON.parse(req.body);
    const crushes = updateCrushes(session.user, body.crushes);
    const forbidden = updateForbidden(session.user, body.forbidden);
    const resp: User[] = await Promise.all([crushes, forbidden]);

    return res.status(200).json(resp);
}
