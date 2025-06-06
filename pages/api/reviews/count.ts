import { NextApiRequest, NextApiResponse } from 'next';
import { getPendingReviewsCount, getApprovedReviewsCount } from '@/controllers';
import { connect } from '@/database';

/**
 * API handler to retrieve the total count of reviews.
 * It establishes a database connection and then fetches the review count.
 *
 * @param {NextApiRequest} req - The API request object.
 * @param {NextApiResponse<number>} res - The API response object used to return the review count.
 * @query {string} [status] - Filter reviews by status:
 *   - 'pending' - Returns count of pending reviews
 *   - 'approved' - Returns count of approved reviews
 *   - undefined - Returns total count of all reviews (pending + approved)
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<number>) {
    if (req.method !== 'GET') return res.status(405).json(0);

    await connect();

    const { status } = req.query;
    let count: number;

    switch (status) {
        case 'pending':
            count = await getPendingReviewsCount();
            break;
        case 'approved':
            count = await getApprovedReviewsCount();
            break;
        default:
            // Return total count of both pending and approved
            const [pendingCount, approvedCount] = await Promise.all([
                getPendingReviewsCount(),
                getApprovedReviewsCount()
            ]);
            count = pendingCount + approvedCount;
            break;
    }
    return res.status(200).json(count);
}
