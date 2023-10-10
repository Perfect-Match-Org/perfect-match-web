import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { getUsersCount } from '@/database/controllers';
import { connect } from '@/database/index';

async function handler(req: NextApiRequest, res: NextApiResponse<number>) {
    await connect();
    const count: number = await getUsersCount();
    return NextResponse.json(count, { status: 200 });
}

export { handler as GET };
