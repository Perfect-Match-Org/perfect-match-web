import { NextApiRequest, NextApiResponse } from 'next';
import { getUsersCount } from '@/controllers'
import { connect } from '@/database'

/**
 * API handler to retrieve the total count of users.
 * It establishes a database connection and then fetches the user count.
 * 
 * @param {NextApiRequest} req - The API request object.
 * @param {NextApiResponse<number>} res - The API response object used to return the user count.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<number>) {
    await connect();

    const usersCount: number = await getUsersCount();
    return res.status(200).json(usersCount);
}
