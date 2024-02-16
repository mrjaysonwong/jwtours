import connectMongo from 'lib/database/connection';
import { createUser } from '../handlers/usersAPI/createUser';

// baseUrl/api/auth/signup
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
    return res.status(500).json({
      error: {
        code: 500, // SERVER_ERROR
        message: error.message,
      },
    });
  }
}
