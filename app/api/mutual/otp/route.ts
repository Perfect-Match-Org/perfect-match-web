
import { requestOTP } from '@/database/controllers';
import { connect } from '@/database/index';
import { NextRequest, NextResponse } from 'next/server';

async function handler(req: Request) {
    const apiToken = req.headers.get('x-api-key');
    if (apiToken !== process.env.MUTUAL_API) return NextResponse.json('Invalid API Key', { status: 401 });

    // TODO: doubt this
    const { email } = (await req.json()).body as { email: string };
    if (!email) return NextResponse.json('Missing Email Address', { status: 400 });

    await connect();
    const otp: string | null = await requestOTP(email);
    if (otp === null) return NextResponse.json('OTP could not be sent', { status: 500 });

    return NextResponse.json('OTP sent', { status: 200 });
}

export { handler as POST };
