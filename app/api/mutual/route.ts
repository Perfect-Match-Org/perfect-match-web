
import { getMutualVerifiedMatches } from '@/database/controllers';
import { connect } from '@/database/index';
import { NextResponse } from 'next/server';
import { Match } from '@/lib/types/matches';

async function handler(req: Request, res: NextResponse<Match[] | string>) {
    const apiToken = req.headers['x-api-key'];
    if (apiToken !== process.env.MUTUAL_API) return NextResponse.json('Invalid API Key', { status: 401 });

    const email = req.body.email;
    if (!email) return NextResponse.json('Missing Email Address', { status: 400 });

    await connect();
    const otp = req.body.otp;
    if (!otp) return NextResponse.json('Missing OTP', { status: 400 });

    const mutualVerifiedMatches: Match[] | null = await getMutualVerifiedMatches(email, otp);
    if (mutualVerifiedMatches === null) return NextResponse.json('Invalid OTP', { status: 401 });
    return NextResponse.json(mutualVerifiedMatches, { status: 200 });
}

export { handler as POST };
