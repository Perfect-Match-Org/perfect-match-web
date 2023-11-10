import { NextApiRequest, NextApiResponse } from 'next';
import { requestOTP } from '@/controllers'
import { connect } from '@/database'

/**
 * API handler for requesting an OTP (One-Time Password).
 * It validates the API token, ensures the request method is POST, checks for the presence of email in the request body,
 * and then attempts to request an OTP for the given email address.
 *
 * @param {NextApiRequest} req - The API request object containing the email and headers with the API key.
 * @param {NextApiResponse} res - The API response object used to return the OTP request status.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    // Validates the provided API token against the environment variable
    const apiToken = req.headers['x-api-key'];
    if (apiToken !== process.env.MUTUAL_API) {
        return res.status(401).json({ message: 'Invalid API Key' });
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    await connect();

    const email = req.body.email;
    if (!email) {
        return res.status(400).json({ message: 'Missing Email Address' });
    }

    const otp = await requestOTP(email);
    if (otp === null) {
        return res.status(400).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'OTP Sent' });
}
