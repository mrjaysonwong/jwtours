import connectMongo from 'lib/database/connection';
import { resendVerification } from '../handlers/emailVerifyAPI/resendVerification';

export default async function handler(req, res) {
  try {
    await connectMongo();

    const { method } = req;

    if (method === 'POST') {
      await resendVerification(req, res);
    } else {
      return res
        .status(405)
        .send(`HTTP method ${method} Not Allowed, only POST Accepted`);
    }
  } catch (error) {
    return res.status(500).json({
      error: {
        message: error.message,
      },
    });
  }
}
