import { NextApiRequest, NextApiResponse } from 'next';
import { getUsersCount, getOptInUsersCount, getProfiledUsersCount, getSurveyedUsersCount } from '@/controllers';
import { connect } from '@/database';

/**
 * API handler to retrieve the total count of users.
 * It establishes a database connection and then fetches the user count.
 *
 * @param {NextApiRequest} req - The API request object.
 * @param {NextApiResponse<number>} res - The API response object used to return the user count.
 * @query {string} [status] - Filter users by status:
 *   - 'opted_in' - Returns count of users who have opted in
 *   - 'profiled' - Returns count of users who have completed their profile
 *   - undefined - Returns total count of all users
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<number>) {
    if (req.method !== 'GET') return res.status(405).json(0);

    await connect();

    const { status } = req.query;
    let count: number;

    switch (status) {
        case 'opted_in':
            count = await getOptInUsersCount();
            break;
        case 'profiled':
            count = await getProfiledUsersCount();
            break;
        case 'surveyed':
            count = await getSurveyedUsersCount();
            break;
        default:
            count = await getUsersCount();
            break;
    }
    return res.status(200).json(count);
}
