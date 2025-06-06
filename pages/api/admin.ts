import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import authOptions from "./auth/[...nextauth]";
import { isAdmin } from "@/utils/admins";

/**
 * API handler to verify if the user is an admin.
 * Returns true if the user is an admin, false otherwise.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<boolean>) {
    const session: any = await getServerSession(req, res, authOptions);

    if (!session) return res.status(401).json(false);

    const email = session.user?.email;
    if (!email) return res.status(401).json(false);

    return res.status(200).json(isAdmin(email));
}