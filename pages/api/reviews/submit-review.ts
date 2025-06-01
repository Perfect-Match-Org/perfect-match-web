import type { NextApiRequest, NextApiResponse } from 'next';
import { submitReview } from '@/models/review';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const { title, body, author } = req.body;

    try {
        // Submit the review
        const newReview = await submitReview({
            title: title,
            body: body,
            author: author
        });

        return res.status(201).json({
            message: 'Review submitted successfully',
            review: {
                id: newReview._id.toString(),
                title: newReview.title,
                body: newReview.body,
                author: newReview.author,
                status: newReview.status,
                createdAt: newReview.createdAt,
                updatedAt: newReview.updatedAt
            }
        });
    } catch (error: any) {
        console.error('Error submitting review:', error);
        return res.status(500).json({
            message: 'Error submitting review',
            error: error.message
        });
    }
}