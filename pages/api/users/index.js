import connectMongo from 'lib/database/connection';
import { getAllUsers } from '../handlers/usersAPI/getAllUsers';
import { getUser } from '../handlers/usersAPI/getUser';
import { updateUser } from '../handlers/usersAPI/updateUser';
import { updateProfilePhoto } from '../handlers/usersAPI/updateProfilePhoto';
import { getToken } from 'next-auth/jwt';

export default async function handler(req, res) {
  try {
    await connectMongo();

    // type of request
    const { method, query } = req;

    switch (method) {
      case 'GET':
        const token = await getToken({ req });

        if (query.userId) {
          await getUser(req, res, token);
        } else {
          await getAllUsers(req, res, token);
        }

        break;
      case 'PATCH':
        if (query.action === 'updateProfilePhoto') {
          await updateProfilePhoto(req, res);
        } else {
          await updateUser(req, res);
        }

        break;
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE']);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: {
        code: 'DB_ERROR',
        message: error.message,
      },
    });
  }
}
