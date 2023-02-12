import { NextApiRequest, NextApiResponse } from "next";
import { getUserByID, getUsers } from "../../../database/controllers";
import { connect } from "../../../database/database";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<string>
) {
    await connect();
    try {
        const { id } = req.query
        const user: any = (await getUserByID({ _id: id }));

        let obj = {
            "name": user.profile.firstName,
            "major": user.profile.major,
            "threewords": user.profile.describeYourself,
            "bio": user.profile.bio,
        };
        return res.status(200).json(JSON.stringify(obj));
    } catch (e: any) {
        return res.status(500).json("None");
    }
}
