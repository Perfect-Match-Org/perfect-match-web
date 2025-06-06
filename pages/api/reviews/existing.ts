import type { NextApiRequest, NextApiResponse } from 'next';
import { getApprovedReviews } from '@/controllers';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        // Get approved reviews (these are the "existing" reviews visible on the site)
        const approvedReviews = await getApprovedReviews();

        // Transform the data to match the expected format
        const reviews = approvedReviews.map(review => ({
            title: review.title,
            body: review.body,
            author: review.author,
            id: review._id.toString()
        }));

        return res.status(200).json(reviews);

    } catch (error: any) {
        console.error('Error fetching existing (approved) reviews:', error);
        return res.status(500).json({
            message: 'Error fetching existing reviews',
            error: error.message
        });
    }
}
