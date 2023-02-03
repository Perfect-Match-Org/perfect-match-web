import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import authOptions from "./auth/[...nextauth]";
import { updateSurvey } from "../../database/controllers";
import { Session } from "next-auth";
import { connect } from "../../database/database";
import { Survey } from "../../types/users";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Survey | String>
) {
  const session: Session | null = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).send("Unauthorized");
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");
  await connect();
  const survey = await updateSurvey(session.user, JSON.parse(req.body));
  return res.status(200).json(survey);
}
