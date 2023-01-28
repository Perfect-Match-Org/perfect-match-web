import { IncomingMessage, ServerResponse } from "http";
import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import authOptions from "./auth/[...nextauth]";
import { getUsers, countUsers } from "../../database/controllers";
import { Session } from "next-auth";
import { connect } from "../../database/database";
import { Match } from "../../types/matches";
import { isAdmin } from "../../config/admins";

export default async function handler(
    req:
        | any
        | (IncomingMessage & { cookies: Partial<{ [key: string]: string }> })
        | NextApiRequest,
    res: any | ServerResponse<IncomingMessage> | NextApiResponse<any>
) {
    const session: Session = (await unstable_getServerSession(
        req,
        res,
        authOptions
    ))!;

    await connect();
    const matches: any = await countUsers();
    return res.status(200);
}
