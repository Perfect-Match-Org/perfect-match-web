import type { NextApiRequest, NextApiResponse } from 'next';
import { rejectReview } from '@/models/review';

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
        const updatedReview = await rejectReview(id);
        return res.status(200).json({
            message: 'Review rejected successfully',
            review: updatedReview
        });
    } catch (error: any) {
        console.error('Error rejecting review:', error);
        return res.status(500).json({
            message: 'Error rejecting review',
            error: error.message
        });
    }
}