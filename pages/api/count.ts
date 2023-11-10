import { NextApiRequest, NextApiResponse } from 'next';
import { getUsersCount } from '@/controllers'
import { connect } from '@/database'

export default async function handler(req: NextApiRequest, res: NextApiResponse<number>) {
    await connect();

    const usersCount: number = await getUsersCount();
    return res.status(200).json(usersCount);
}
