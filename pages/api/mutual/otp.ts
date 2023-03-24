import { NextApiRequest, NextApiResponse } from "next";
import { requestOTP } from "../../../database/controllers";
import { connect } from "../../../database/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const apiToken = req.headers["x-api-key"];
  if (apiToken !== process.env.MUTUAL_API)
    return res.status(401).json({ message: "Invalid API Key" });
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method Not Allowed" });
  await connect();
  const email = req.body.email;
  if (!email) return res.status(400).json({ message: "Missing Email Address" });
  const otp = await requestOTP(email);
  if (otp === null) return res.status(400).json({ message: "User not found" });
  return res.status(200).json({ message: "OTP Sent" });
}
