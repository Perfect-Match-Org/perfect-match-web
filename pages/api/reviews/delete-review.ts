import type { NextApiRequest, NextApiResponse } from 'next';
import { deleteReview } from '@/models/review';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { id } = req.body;

    if (!id || typeof id !== 'string') {
        return res.status(400).json({ message: 'Invalid review ID' });
    }

    try {
        const updatedReview = await deleteReview(id);
        return res.status(200).json({
            message: 'Review Deleted successfully',
            review: updatedReview
        });
    } catch (error: any) {
        console.error('Error deleting review:', error);
        return res.status(500).json({
            message: 'Error deleting review',
            error: error.message
        });
    }
}