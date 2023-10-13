
import getServerSession from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { updateSurvey } from '@/database/controllers';
import { Session } from 'next-auth';
import { Survey, User } from '@/lib/types/users';
import { NextResponse } from 'next/server';
import { connect } from '@/database/index';

async function handler(req: Request, res: NextApiResponse<Survey | string>) {
    const session: Session | null = await getServerSession(authOptions);
    if (!session) return NextResponse.json('Unauthorized', { status: 401 });

    await connect();
    const survey: User = await updateSurvey(session.user, JSON.parse(req.body));
    return NextResponse.json(survey.survey, { status: 200 });
}

export { handler as POST };
