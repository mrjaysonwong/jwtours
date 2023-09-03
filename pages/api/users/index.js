import connectMongo from 'database/connection';
import getAllUsers from '@pages/api/controllers/user/getAllUsers';
import createUser from '@pages/api/controllers/user/createUser';

export default async function handler(req, res) {
  try {
    await connectMongo();

    // type of request
    const { method, query } = req;

    switch (method) {
      case 'GET':
        await getAllUsers(req, res);
        break;
      case 'POST':
        await createUser(req, res);
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE']);
        res.status(405).send(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.log('Database connection error:', error);
    res.status(500).json({ error: 'Connection Failed' });
  }
}
