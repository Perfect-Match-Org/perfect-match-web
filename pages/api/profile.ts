import { IncomingMessage, ServerResponse } from "http";
import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import authOptions from "./auth/[...nextauth]";
import { getUser, updateProfile } from "../../database/controllers";
import { Session } from "next-auth";
import { connect } from "../../database/database";

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
  if (!session) return res.status(401).send("Unauthorized");
  await connect();
  const { method } = req;
  let profile;
  switch (method) {
    case "GET":
      profile = await getUser(session.user);
      return res.status(200).json(profile);
    case "POST":
      profile = await updateProfile(session.user, JSON.parse(req.body));
      return res.status(200).json(profile);
    default:
      return res.status(405).send("Method Not Allowed");
  }
}
