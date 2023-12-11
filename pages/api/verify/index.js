import connectMongo from 'lib/database/connection';
import { verifyEmail } from '../handlers/emailVerifyAPI/verifyEmail';

export default async function handler(req, res) {
  try {
    await connectMongo();

    const { method } = req;

    if (method === 'PUT') {
      await verifyEmail(req, res);
    } else {
      res
        .status(405)
        .send(`HTTP method ${method} Not Allowed, only PUT Accepted`);
    }
  } catch (error) {
    return res.status(500).json({
      error: {
        code: 'DB_ERROR',
        message: error.message,
      },
    });
  }
}
