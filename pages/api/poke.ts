import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import type { Session } from "next-auth";
import * as postmark from "postmark";
import authOptions from "./auth/[...nextauth]";
import { connect } from "@/database";
import { getUser, updateMatchPoked } from "@/controllers";

const POKE_FROM_EMAIL = "Perfect Match <hello@perfectmatch.ai>";

/**
 * Returns an environment variable and throws when it is missing.
 */
function getRequiredEnv(name: string): string {
    const value = process.env[name];
    if (!value || value.trim() === "") {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}

/**
 * Parses and validates `matchEmail` from request body.
 */
function parseMatchEmail(body: unknown): string | null {
    let parsedBody: unknown = body;
    if (typeof body === "string") {
        try {
            parsedBody = JSON.parse(body);
        } catch (error) {
            console.error("Invalid JSON request body:", error);
            return null;
        }
    }

    if (!parsedBody || typeof parsedBody !== "object" || Array.isArray(parsedBody)) {
        return null;
    }

    const maybeMatchEmail = (parsedBody as { matchEmail?: unknown }).matchEmail;
    if (typeof maybeMatchEmail !== "string") {
        return null;
    }

    const matchEmail = maybeMatchEmail.trim();
    if (matchEmail === "") {
        return null;
    }

    return matchEmail;
}

/**
 * API handler for sending "pokes" via email.
 * 
 * @param {NextApiRequest} req -  The API request object containing the match email.
 * @param {NextApiResponse} res - The API response object.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<string>) {
    const session: Session | null = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).send("Unauthorized");
    if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

    const user = session.user;
    await connect();

    try {
        const matchEmail = parseMatchEmail(req.body);
        if (!matchEmail) {
            return res.status(400).send("Invalid request body");
        }

        const baseApiUrl = getRequiredEnv("NEXT_PUBLIC_API_URL");
        const postmarkServerToken = getRequiredEnv("POSTMARK_SERVER_API_TOKEN");
        const postmarkClient = new postmark.ServerClient(postmarkServerToken);

        let emailTemplate = await fetch(`${baseApiUrl}/poke_email.html`).then((templateResponse) => templateResponse.text());

        const userProfile = await getUser(user);
        const userMatches = userProfile.matchReviews;

        // Replace user placeholder in template
        emailTemplate = emailTemplate.replaceAll("{{user}}", userProfile.profile.firstName);

        for (const match of userMatches) {
            if (match.partnerAId.email === matchEmail || match.partnerBId.email === matchEmail) {
                const matchProfile = match.partnerAId.email === matchEmail ? match.partnerAId : match.partnerBId;
                emailTemplate = emailTemplate.replaceAll("{{name}}", matchProfile.profile.firstName);
                // check if the user has already poked the match
                if (
                    (match.partnerAId.email === userProfile.email && match.pokedA) ||
                    (match.partnerBId.email === userProfile.email && match.pokedB)
                ) {
                    return res.status(400).send("Match already poked");
                }
                await postmarkClient.sendEmail({
                    From: POKE_FROM_EMAIL,
                    To: matchEmail,
                    Subject: `💘 Psst… ${userProfile.profile.firstName} Just Poked You! 💘`,
                    HtmlBody: emailTemplate,
                    MessageStream: "broadcast",
                });

                // Update the match to reflect that the user has poked them
                let pokedA = match.pokedA || false;
                let pokedB = match.pokedB || false;
                if (match.partnerAId.email === userProfile.email) {
                    console.log("Poked A");
                    pokedA = true;
                } else {
                    console.log("Poked B");
                    pokedB = true;
                }
                updateMatchPoked(match._id.toString(), pokedA, pokedB);
                return res.status(200).send("Match poked successfully!");
            }
        }

        return res.status(400).send("Match not found");
    } catch (error) {
        console.error("Error processing request:", error);
        return res.status(500).send("Internal Server Error");
    }
}
