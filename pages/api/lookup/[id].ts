import { NextApiRequest, NextApiResponse } from "next";
import { getUserByID, getUsers } from "../../../database/controllers";
import { connect } from "../../../database/database";

type ResponseData = {

    "name": string;
    "major": string;
    "threewords": string;
    "bio": string;

}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
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
            "year": user.profile.year,
        };
        return res.status(200).json(obj);
    } catch (e: any) {
        return res.status(500).json({
            "name": "Not Found",
            "major": "Not Found",
            "threewords": "user.profile.describeYourself",
            "bio": "user.profile.bio",

        });
    }
}