import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import authOptions from "./auth/[...nextauth]";
import { updateUserOptIn } from "../../database/controllers";
import { Session } from "next-auth";
import { connect } from "../../database/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Boolean | String>
) {
  const session: Session | null = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).send("Unauthorized");
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");
  await connect();
  const optIn = (
    await updateUserOptIn(session.user, JSON.parse(req.body)?.optIn)
  ).optIn;
  return res.status(200).json(optIn);
}
