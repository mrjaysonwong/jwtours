import connectMongo from 'lib/database/connection';
import { verifyEmailOTP } from '@pages/api/handlers/verifyAPI/verifyEmailOTP';
import { addEmailAddress } from '@pages/api/handlers/verifyAPI/addEmailAddress';
import { sendSignInLink } from '@pages/api/handlers/verifyAPI/sendSignInLink';
import { handleResponseError } from '@utils/helper/functions/errorHandler';

// baseUrl/api/auth/email/verify
export default async function handler(req, res) {
  const { method, query } = req;

  try {
    await connectMongo();

    if (method === 'PATCH') {
      if (!query.mode) {
        return handleResponseError(
          res,
          400,
          'An error occured. Please try again later.',
          'Invalid or missing parameters.'
        );
      }

      if (query.mode === 'email-otp') {
        await verifyEmailOTP(req, res);
      } else if (query.mode === 'add-email-address') {
        await addEmailAddress(req, res);
      } else if (query.mode === 'signin') {
        await sendSignInLink(req, res);
      }
    } else {
      return res
        .status(405)
        .send(`HTTP method ${method} Not Allowed, only PATCH Accepted`);
    }
  } catch (error) {
    console.error(error);

    return handleResponseError(
      res,
      500,
      'Internal Server Error. Please try again later.',
      error.message
    );
  }
}
