import { NextApiRequest, NextApiResponse } from "next";
import { getUserByID, getUsers } from "../../../database/controllers";
import { connect } from "../../../database/database";

type ResponseData = {

    "name": string;
    "major": string;
    "threewords": string;
    "bio": string;
    "year": string;
    "city": string;
    "fb": string;
    "insta": string;
    "twitter": string;
    "snapchat": string,

    "linkedin": string,
    "phone": string,

    "hookupsong": string;

}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    await connect();
    try {
        const { id } = req.query
        const user: any = (await getUserByID({ _id: id }));

        let fb_link = user.survey.contact.get("fb");
        let insta_link = user.survey.contact.get("insta");
        let twitter_link = user.survey.contact.get("twitter");
        let snap_link = user.survey.contact.get("snapchart");
        let linkedin_link = user.survey.contact.get("linkedin");
        let phone_link = user.survey.contact.get("phone");



        let obj = {
            "name": user.profile.firstName,
            "major": user.profile.major,
            "threewords": user.profile.describeYourself,
            "bio": user.profile.bio,
            "year": user.profile.year,
            "city": user.profile.city,
            "fb": fb_link,
            "insta": insta_link,
            "twitter": twitter_link,
            "snapchat": snap_link,
            "linkedin": linkedin_link,
            "phone": phone_link,

            "hookupsong": user.survey.hookupsong
        };
        return res.status(200).json(obj);
    } catch (e: any) {
        return res.status(500).json({
            "name": "Not Found",
            "major": "Not Found",
            "threewords": "Not Found",
            "bio": "Not Found",
            "year": "Not Found",
            "city": "Not Found",
            "snapchat": "Not Found",
            "fb": "Not Found",
            "insta": "Not Found",
            "twitter": "Not Found",
            "linkedin": "Not Found",
            "phone": "Not Found",
            "hookupsong": "Not Found",
        });
    }
}