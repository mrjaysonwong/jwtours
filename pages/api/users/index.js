import connectMongo from 'lib/database/connection';
import { getAllUsers, getUser, updateUser } from '../handlers/usersApi';
import { getToken } from 'next-auth/jwt';

export default async function handler(req, res) {
  try {
    await connectMongo();

    // type of request
    const { method, query } = req;

    switch (method) {
      case 'GET':
        const token = await getToken({ req });

        if (!query.userId) {
          await getAllUsers(req, res, token);
          break;
        }
        await getUser(req, res, token);
        break;
      case 'PATCH':
        await updateUser(req, res);
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE']);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Connection failed.' });
  }
}
