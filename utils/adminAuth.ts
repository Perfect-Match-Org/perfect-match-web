import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { isAdmin } from '@/utils/admins';
import authOptions from '../pages/api/auth/[...nextauth]';

/**
 * Higher-order function that wraps API handlers with admin authentication
 * @param handler - The API handler function to protect
 * @returns Protected API handler that requires admin authentication
 */
export function withAdminAuth<T = any>(
  handler: (req: NextApiRequest, res: NextApiResponse<T>) => Promise<void>
) {
  return async (req: NextApiRequest, res: NextApiResponse<T>) => {
    try {
      const session: any = await getServerSession(req, res, authOptions);

      if (!session) {
        return res.status(401).json({
          message: 'Unauthorized - Please sign in'
        } as T);
      }

      const email = session.user?.email;
      if (!email || !isAdmin(email)) {
        return res.status(403).json({
          message: 'Forbidden - Admin access required'
        } as T);
      }

      // Admin authenticated, call the handler
      return await handler(req, res);
    } catch (error) {
      console.error('Admin auth middleware error:', error);
      return res.status(500).json({
        message: 'Internal server error'
      } as T);
    }
  };
}