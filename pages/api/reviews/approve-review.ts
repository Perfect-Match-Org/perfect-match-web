import type { NextApiRequest, NextApiResponse } from 'next';
import { approveReview } from '@/controllers';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const { id } = req.body;

    if (!id || typeof id !== 'string') {
        return res.status(400).json({ message: 'Invalid review ID' });
    }

    try {
        const updatedReview = await approveReview(id);
        return res.status(200).json({
            message: 'Review approved successfully',
            review: updatedReview
        });
    } catch (error: any) {
        console.error('Error approving review:', error);
        return res.status(500).json({
            message: 'Error approving review',
            error: error.message
        });
    }
}