import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import authOptions from './auth/[...nextauth]';
import { getUsers } from '@/controllers'
import { Session } from 'next-auth';
import { connect } from '@/database'
import { isAdmin } from '@/utils/admins';
import { User } from '@/types/users';

/**
 * API handler to retrieve a list of users.
 * It first checks the session to ensure the user is authenticated and has admin privileges.
 * If the user is authorized and the request method is GET, it retrieves and returns the user list.
 * Otherwise, it responds with an appropriate error message.
 * 
 * @param {NextApiRequest} req - The API request object.
 * @param {NextApiResponse<User[] | String>} res - The API response object used to return the list of users or an error message.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<User[] | String>) {
    const session: Session = (await unstable_getServerSession(req, res, authOptions))!;

    if (!session) return res.status(401).send('Unauthorized');
    else if (!isAdmin(session.user?.email!)) return res.status(401).send('Unauthorized');
    else if (req.method !== 'GET') return res.status(405).send('Method Not Allowed');

    await connect();

    const users = await getUsers();
    return res.status(200).json(users);
}
