import connectMongo from 'lib/database/connection';
import { authSignIn } from '@pages/api/handlers/signinAPI/authSignIn';
import { handleResponseError } from '@utils/helper/functions/errorHandler';

// baseUrl/api/auth/users/signin
export default async function handler(req, res) {
  const { method } = req;

  try {
    await connectMongo();

    if (method === 'POST') {
      await authSignIn(req, res);
    } else {
      return res
        .status(405)
        .send(`HTTP method ${method} Not Allowed, only POST Accepted`);
    }
  } catch (error) {
    console.error(error);

    return handleResponseError(
      res,
      500,
      'Internal Server Error',
      error.message
    );
  }
}
