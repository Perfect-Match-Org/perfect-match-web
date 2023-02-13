import { NextApiRequest, NextApiResponse } from "next";
import getServerSession from "next-auth/next";
import authOptions from "./auth/[...nextauth]";
import { getUsers } from "../../database/controllers";
import { Session } from "next-auth";
import { connect } from "../../database/database";
import { isAdmin } from "../../helpers/admins";
import { User } from "../../types/users";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[] | String>
) {
  const session: Session = (await getServerSession(req, res, authOptions))!;
  if (!session) return res.status(401).send("Unauthorized");
  else if (!isAdmin(session.user?.email!))
    return res.status(401).send("Unauthorized");
  else if (req.method !== "GET")
    return res.status(405).send("Method Not Allowed");
  await connect();
  const users = await getUsers();
  return res.status(200).json(users);
}
