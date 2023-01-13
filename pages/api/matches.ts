import type { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../database/database";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await connect();
  res.status(200).json({ name: "John Doe" });
}
