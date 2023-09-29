import { NextResponse } from 'next/server';
import { getUsersCount } from '@/database/controllers';
import { connect } from '@/database/index';

export async function GET() {
    await connect();
    const count: number = await getUsersCount();
    return NextResponse.json({ count }, { status: 200 });
}
