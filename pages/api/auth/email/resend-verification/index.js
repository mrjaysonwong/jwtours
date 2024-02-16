import connectMongo from 'lib/database/connection';
import { resendVerification } from '@pages/api/handlers/verifyAPI/resendVerification';

// baseUrl/api/auth/email/resend-verification
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
        code: 500, // SERVER_ERROR
        message: error.message,
      },
    });
  }
}
