import type { NextApiRequest, NextApiResponse } from 'next';
import { submitReview, getPendingReviews, getApprovedReviews } from '@/controllers';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case 'GET':
            return handleGetReviews(req, res);
        case 'POST':
            return handleCreateReview(req, res);
        default:
            return res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
}

async function handleGetReviews(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { status } = req.query;

        let reviews;
        switch (status) {
            case 'pending':
                reviews = await getPendingReviews();
                break;
            case 'approved':
            case 'existing':
                reviews = await getApprovedReviews();
                break;
            default:
                // If no status specified, return all reviews (you might want to combine pending + approved)
                const [pendingReviews, approvedReviews] = await Promise.all([
                    getPendingReviews(),
                    getApprovedReviews()
                ]);
                reviews = [...pendingReviews, ...approvedReviews];
                break;
        }

        // Transform the data for consistent API response
        const transformedReviews = reviews.map(review => {
            const { _id, ...rest } = review.toObject ? review.toObject() : review;
            return { id: _id.toString(), ...rest };
        });

        return res.status(200).json(transformedReviews);

    } catch (error: any) {
        console.error('Error fetching reviews:', error);
        return res.status(500).json({
            message: 'Error fetching reviews',
            error: error.message
        });
    }
}

async function handleCreateReview(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { title, body, author } = req.body;

        if (!title || !body || !author) {
            return res.status(400).json({
                message: 'Missing required fields: title, body, and author are required'
            });
        }

        const newReview = await submitReview({
            title,
            body,
            author
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
        console.error('Error creating review:', error);
        return res.status(500).json({
            message: 'Error creating review',
            error: error.message
        });
    }
}
