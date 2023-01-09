import { IncomingMessage, ServerResponse } from "http";
import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import authOptions from "./auth/[...nextauth]";
import { getUser, updateUser } from "../../database/controllers";
import { Session } from "next-auth";

export default async (
  req:
    | any
    | (IncomingMessage & { cookies: Partial<{ [key: string]: string }> })
    | NextApiRequest,
  res: any | ServerResponse<IncomingMessage> | NextApiResponse<any>
) => {
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
        res.status(200).json(survey);
      case "POST":
        survey = await updateUser(session.user, req.body);
        res.status(200).json(survey);
    }
  } else {
    res.status(401);
  }
  res.end();
};
