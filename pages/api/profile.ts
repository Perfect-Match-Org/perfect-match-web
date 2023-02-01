import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import authOptions from "./auth/[...nextauth]";
import { getUser, updateProfile } from "../../database/controllers";
import { Session } from "next-auth";
import { connect } from "../../database/database";
import { Profile } from "../../types/users";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Profile | String>
) {
  const session: Session = (await unstable_getServerSession(
    req,
    res,
    authOptions
  ))!;
  if (!session) return res.status(401).send("Unauthorized");
  await connect();
  const { method } = req;
  switch (method) {
    case "GET": {
      const profile = await getUser(session.user);
      return res.status(200).json(profile);
    }
    case "POST": {
      const profile = await updateProfile(session.user, JSON.parse(req.body));
      return res.status(200).json(profile);
    }
    default:
      return res.status(405).send("Method Not Allowed");
  }
}
