
import getServerSession from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import { getUser } from '@/database/controllers';
import { Session } from 'next-auth';
import { Match } from '@/lib/types/matches';
import { connect } from '@/database/index';
import { NextResponse } from 'next/server';
import { Matches } from '@/lib/types/users';

async function handler(req: Request) {
    const session: Session | null = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Not logged in' }, { status: 401 });

    await connect();
    const matches: Matches[] = (await getUser(session.user)).matches;
    return NextResponse.json(matches, { status: 200 });
}

export { handler as GET };
