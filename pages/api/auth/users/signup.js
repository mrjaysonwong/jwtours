import connectMongo from 'lib/database/connection';
import { createUser } from '../../handlers/usersAPI/Create/createUser';
import { resendVerificationLink } from '../../handlers/verifyAPI/resendVerificationLink';
import { handleResponseError } from '@utils/helper/functions/errorHandler';

// baseUrl/api/auth/users/signup
export default async function handler(req, res) {
  const { method, query } = req;

  try {
    await connectMongo();

    switch (method) {
      case 'POST':
        await createUser(req, res);
        break;

      case 'PATCH':
        if (!query.email || !query.mode) {
          return handleResponseError(
            res,
            400,
            'An error occured. Please try again later.',
            'Invalid or missing parameters.'
          );
        }

        if (query.mode === 'resend-verification-link') {
          await resendVerificationLink(req, res);
        }

        break;

      default:
        res.setHeader('Allow', ['POST', 'PATCH']);
        return res
          .status(405)
          .send(
            `HTTP method ${method} Not Allowed, only POST and PATCH Accepted`
          );
    }
  } catch (error) {
    return handleResponseError(
      res,
      500,
      'Internal Server Error. Please try again later.',
      error.message
    );
  }
}
