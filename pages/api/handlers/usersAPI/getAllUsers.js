import { getServerSession } from 'next-auth';
import User from '@model/userModel';

export async function getAllUsers(req, res, token) {
  try {
    if (token.user.role !== 'admin') {
      return res.status(403).json({
        error: {
          code: 403, // FORBIDDEN
          message: `You don't have authorization to view this page.`,
        },
      });
    }

    const session = await getServerSession(req, res, authOptions);

    if (session) {
      const users = await User.find({});

      return res.status(200).json({
        code: 200, // SUCCESS
        total_users: users.length,
        result: users,
      });
    }
  } catch (error) {
    console.error('Error:', error.message);

    return res.status(401).json({
      error: {
        code: 401, // UNAUTHORIZED
        message: 'You must be signed in to view this content',
      },
    });
  }
}
