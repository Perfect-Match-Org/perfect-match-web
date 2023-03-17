import { NextApiRequest, NextApiResponse } from "next";
import { getMutualVerifiedMatches } from "../../../database/controllers";
import { connect } from "../../../database/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any[] | String>
) {
  const apiToken = req.headers.authorization;
  if (apiToken !== process.env.MUTUAL_API)
    return res.status(401).send("Unauthorized");
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");
  await connect();
  const email = req.body.email;
  if (!email) return res.status(400).send("Missing Email Address");
  const mutualVerifiedMatches = await getMutualVerifiedMatches(email);
  return res.status(200).json(mutualVerifiedMatches);
}
