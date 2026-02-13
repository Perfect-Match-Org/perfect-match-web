import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import authOptions from './auth/[...nextauth]';
import { updateUserOptIn } from '@/controllers';
import { Session } from 'next-auth';
import { connect } from '@/database';

/**
 * API handler to update the user's opt-in status.
 * The function first checks the user session for authentication.
 * If authenticated, it processes a POST request to update the opt-in status.
 * The opt-in status is then returned in the response.
 *
 * @param {NextApiRequest} req - The API request object, containing the new opt-in status.
 * @param {NextApiResponse<Boolean | String>} res - The API response object used to return the updated opt-in status or an error message.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<Boolean | String>) {
    const session: Session | null = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).send('Unauthorized');
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    await connect();

    const optIn = (await updateUserOptIn(session.user, JSON.parse(req.body)?.optIn)).optIn;
    return res.status(200).json(optIn);
}
