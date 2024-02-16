import connectMongo from 'lib/database/connection';
import { verifyEmailLink } from '@pages/api/handlers/verifyAPI/verifyEmailLink';
import { verifyEmailOTP } from '@pages/api/handlers/verifyAPI/verifyEmailOTP';
import { addEmailAddress } from '@pages/api/handlers/verifyAPI/addEmailAddress';

// baseUrl/api/auth/email/verify
export default async function handler(req, res) {
  try {
    await connectMongo();

    const { method, query } = req;

    if (method === 'PATCH') {
      if (query.action === 'verifyEmailOTP') {
        await verifyEmailOTP(req, res);
      } else if (query.action === 'addEmailAddress') {
        await addEmailAddress(req, res);
      } else {
        await verifyEmailLink(req, res);
      }
    } else {
      return res
        .status(405)
        .send(`HTTP method ${method} Not Allowed, only PATCH Accepted`);
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
