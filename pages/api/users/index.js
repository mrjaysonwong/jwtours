import connectMongo from 'database/connection';
import { getAllUsers } from '../handlers/usersApi';

export default async function handler(req, res) {
  try {
    await connectMongo();

    // type of request
    const { method, query } = req;

    switch (method) {
      case 'GET':
        await getAllUsers(req, res);
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE']);
      // res.status(405).send(`HTTP method ${method} Not Allowed.`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Connection failed.' });
  }
}
