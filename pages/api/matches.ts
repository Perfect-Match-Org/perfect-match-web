import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import authOptions from './auth/[...nextauth]';
import { getUser } from '@/controllers';
import { Session } from 'next-auth';
import { connect } from '@/database';
import { Matches, MatchReview } from '@/types/users';

/**
 * API handler to retrieve matches for the authenticated user.
 * The function first checks the user session for authentication.
 * If authenticated, it processes a GET request to retrieve the user's matches.
 * The matches are then returned in the response.
 *
 * @param {NextApiRequest} req - The API request object.
 * @param {NextApiResponse<Matches[] | String>} res - The API response object used to return the user's matches or an error message.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<MatchReview[] | String>) {
    const session: Session = (await unstable_getServerSession(req, res, authOptions))!;
    if (!session) return res.status(401).send('Unauthorized');
    if (req.method !== 'GET') return res.status(405).send('Method Not Allowed');

    await connect();

    const user = await getUser(session.user);
    if (!user) return res.status(404).send('User not found');
    const matches: MatchReview[] = user.matchReviews;
    return res.status(200).json(matches);
    */
}
