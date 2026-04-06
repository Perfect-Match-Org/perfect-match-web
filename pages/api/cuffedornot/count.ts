import { NextApiRequest, NextApiResponse } from "next";
import { getCuffedOrNotUsersCount } from "@/controllers";
import { connect } from "@/database";

export default async function handler(req: NextApiRequest, res: NextApiResponse<number>) {
	if (req.method !== "GET") return res.status(405).json(0);
	await connect();
	const count = await getCuffedOrNotUsersCount();
	return res.status(200).json(count);
}
