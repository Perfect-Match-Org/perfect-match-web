import { NextApiRequest, NextApiResponse } from 'next';
import { getUsers } from '@/controllers';
import { connect } from '@/database';
import { User } from '@/types/users';
import { withAdminAuth } from '@/utils/adminAuth';

/**
 * API handler to retrieve a list of users.
 * It first checks the session to ensure the user is authenticated and has admin privileges.
 * If the user is authorized and the request method is GET, it retrieves and returns the user list.
 * Otherwise, it responds with an appropriate error message.
 *
 * @param {NextApiRequest} req - The API request object.
 * @param {NextApiResponse<User[] | String>} res - The API response object used to return the list of users or an error message.
 * @param {Object} req.query - The query parameters for the request.
 * @param {string} [req.query.page='1'] - The page number for pagination.
 * @param {string} [req.query.limit='0'] - The number of users to return per page.
 * @param {string} [req.query.searchTerm=''] - The search term to filter users.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
async function getUsersHandler(req: NextApiRequest, res: NextApiResponse<User[] | String>) {
    if (req.method !== 'GET') {
        return res.status(405).send('Method Not Allowed');
    }

    await connect();

    const { page = '1', limit = '0', searchTerm = '' } = req.query;

    const users = await getUsers(Number(page), Number(limit), searchTerm as string);
    return res.status(200).json(users);
}

export default withAdminAuth(getUsersHandler);
