import { IncomingMessage, ServerResponse } from "http";
import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import authOptions from "./auth/[...nextauth]";
import { getUser, updateSurvey } from "../../database/controllers";
import { Session } from "next-auth";

export default async function handler(
  req:
    | any
    | (IncomingMessage & { cookies: Partial<{ [key: string]: string }> })
    | NextApiRequest,
  res: any | ServerResponse<IncomingMessage> | NextApiResponse<any>
) {
  const session: Session | null = await unstable_getServerSession(
    req,
    res,
    authOptions
  );

  if (session) {
    const { method } = req;
    let survey;
    switch (method) {
      case "GET":
        survey = await getUser(session.user);
        return res.status(200).json(survey);
      case "POST":
        survey = await updateSurvey(session.user, JSON.parse(req.body));
        return res.status(200).json(survey);
    }
  } else {
    res.status(401).send("Unauthorized");
  }
}
