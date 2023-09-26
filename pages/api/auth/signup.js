import connectMongo from 'lib/database/connection';
import { createUser } from '../handlers/usersApi';

// POST: /api/auth/signup
export default async function handler(req, res) {
  try {
    await connectMongo();

    const { method } = req;

    if (method === 'POST') {
      await createUser(req, res);
    } else {
      return res
        .status(405)
        .send(`HTTP method ${method} Not Allowed, only POST Accepted`);
    }
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: {
        message: error.message,
      },
    });
  }
}
