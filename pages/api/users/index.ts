import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import authOptions from '../auth/[...nextauth]';
import { getUsers } from '@/controllers';
import { Session } from 'next-auth';
import { connect } from '@/database';
import { isAdmin, getUserRole } from '@/utils/admins';
import { hasPermission, Permission } from '@/utils/roles';
import { User } from '@/types/users';

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
export default async function handler(req: NextApiRequest, res: NextApiResponse<User[] | String>) {
    const session: Session = (await unstable_getServerSession(req, res, authOptions))!;
    const userEmail = session?.user?.email;

    if (!session || !userEmail) return res.status(401).send('Unauthorized');
    else if (!isAdmin(userEmail)) return res.status(401).send('Unauthorized');
    else if (req.method !== 'GET') return res.status(405).send('Method Not Allowed');

    const userRole = getUserRole(userEmail);

    const includeSensitiveData = hasPermission(
        userRole,
        Permission.VIEW_SENSITIVE_DATA
    );

    await connect();

    const { page = '1', limit = '0', searchTerm = '' } = req.query;

    if (typeof page !== 'string' || typeof limit !== 'string' || typeof searchTerm !== 'string') {
        return res.status(400).send('Invalid query parameters');
    }
    if (Number(page) < 1 || Number(limit) < 0) return res.status(400).send('Invalid query parameters');

    if (searchTerm.length > 100) return res.status(400).send('Search term too long');

    const users = await getUsers(Number(page), Number(limit), searchTerm, includeSensitiveData);
    if (!users) return res.status(404).send('No users found');
    return res.status(200).json(users);
}
