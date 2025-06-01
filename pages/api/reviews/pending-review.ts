import type { NextApiRequest, NextApiResponse } from 'next';
import { getPendingReviews } from '@/models/review';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const pendingReviews = await getPendingReviews();

        const reviews = pendingReviews.map(review => {
            const { _id, ...rest } = review.toObject();
            return { id: _id.toString(), ...rest };
        });
        return res.status(200).json(reviews);

    } catch (error: any) {
        console.error('Error fetching pending reviews:', error);
        return res.status(500).json({
            message: 'Error fetching pending reviews',
            error: error.message
        });
    }
}