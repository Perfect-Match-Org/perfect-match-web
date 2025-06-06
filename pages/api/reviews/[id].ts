import type { NextApiRequest, NextApiResponse } from 'next';
import { getReviewById, approveReview, rejectReview, deleteReview } from '@/controllers';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
        return res.status(400).json({ message: 'Invalid review ID' });
    }

    switch (req.method) {
        case 'GET':
            return handleGetReview(req, res, id);
        case 'PATCH':
            return handleUpdateReview(req, res, id);
        case 'DELETE':
            return handleDeleteReview(req, res, id);
        default:
            return res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
}

async function handleGetReview(req: NextApiRequest, res: NextApiResponse, id: string) {
    try {
        const review = await getReviewById(id);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        const { _id, ...rest } = review.toObject ? review.toObject() : review;
        return res.status(200).json({ id: _id.toString(), ...rest });

    } catch (error: any) {
        console.error('Error fetching review:', error);
        return res.status(500).json({
            message: 'Error fetching review',
            error: error.message
        });
    }
}

async function handleUpdateReview(req: NextApiRequest, res: NextApiResponse, id: string) {
    try {
        const { action } = req.body;

        if (!action) {
            return res.status(400).json({
                message: 'Missing action. Use "approve" or "reject"'
            });
        }

        let updatedReview;
        let message;

        switch (action) {
            case 'approve':
                updatedReview = await approveReview(id);
                message = 'Review approved successfully';
                break;
            case 'reject':
                updatedReview = await rejectReview(id);
                message = 'Review rejected successfully';
                break;
            default:
                return res.status(400).json({
                    message: 'Invalid action. Use "approve" or "reject"'
                });
        }

        if (!updatedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }

        return res.status(200).json({
            message,
            review: updatedReview
        });

    } catch (error: any) {
        console.error('Error updating review:', error);
        return res.status(500).json({
            message: 'Error updating review',
            error: error.message
        });
    }
}

async function handleDeleteReview(req: NextApiRequest, res: NextApiResponse, id: string) {
    try {
        const deletedReview = await deleteReview(id);

        if (!deletedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }

        return res.status(200).json({
            message: 'Review deleted successfully',
            review: deletedReview
        });

    } catch (error: any) {
        console.error('Error deleting review:', error);
        return res.status(500).json({
            message: 'Error deleting review',
            error: error.message
        });
    }
}
