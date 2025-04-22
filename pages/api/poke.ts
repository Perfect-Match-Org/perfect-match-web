import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import authOptions from './auth/[...nextauth]';
import { Session } from 'next-auth';
import { connect } from '@/database';
import { getUser, updateMatchPoked } from '@/controllers';

const sesClient = new SESClient({
    region: 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    }
});

/**
 * API handler for sending "pokes" via email.
 * 
 * @param {NextApiRequest} req -  The API request object containing the match email.
 * @param {NextApiResponse} res - The API response object.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<string>) {
    const session: Session | null = await unstable_getServerSession(req, res, authOptions);
    if (!session) return res.status(401).send('Unauthorized');
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    const user = session.user;
    await connect();

    try {
        const { matchEmail } = JSON.parse(req.body);
        let emailTemplate = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/poke_email.html`).then(res => res.text());

        const userProfile = await getUser(user);
        const userMatches = userProfile.matchReviews;

        // Replace user placeholder in template
        emailTemplate = emailTemplate.replaceAll('{{user}}', userProfile.profile.firstName);

        for (const match of userMatches) {
            if (match.partnerAId.email === matchEmail || match.partnerBId.email === matchEmail) {
                const matchProfile = match.partnerAId.email === matchEmail ? match.partnerAId : match.partnerBId;
                emailTemplate = emailTemplate.replaceAll('{{name}}', matchProfile.profile.firstName);
                // check if the user has already poked the match
                if (match.partnerAId.email === userProfile.email && match.pokedA || match.partnerBId.email === userProfile.email && match.pokedB) {
                    return res.status(400).send('Match already poked');
                }
                // Email parameters
                const emailParams = {
                    Destination: { ToAddresses: [matchEmail] },
                    Message: {
                        Body: { Html: { Charset: 'UTF-8', Data: emailTemplate } },
                        Subject: {
                            Charset: 'UTF-8',
                            Data: `💘 Psst… ${userProfile.profile.firstName} Just Poked You! 💘`
                        },
                    },
                    Source: 'Perfect Match <perfectmatch@cornell.edu>'
                };

                const command = new SendEmailCommand(emailParams);
                await sesClient.send(command);

                // Update the match to reflect that the user has poked them
                let pokedA = match.pokedA || false;
                let pokedB = match.pokedB || false;
                if (match.partnerAId.email === userProfile.email) {
                    console.log('Poked A');
                    pokedA = true;
                } else {
                    console.log('Poked B');
                    pokedB = true;
                }
                updateMatchPoked(match._id.toString(), pokedA, pokedB);
                return res.status(200).send('Match poked successfully!');
            }
        }

        return res.status(400).send('Match not found');
    } catch (error) {
        console.error('Error processing request:', error);
        return res.status(500).send('Internal Server Error');
    }
}
