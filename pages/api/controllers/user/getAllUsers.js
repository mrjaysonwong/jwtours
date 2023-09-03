import { models } from 'mongoose';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';

const User = models.User;

// GET:http://localhost:3000/api/users
export default async function getAllUsers(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    const user = await User.find({});

    return res.status(200).json({
      total_users: user.length,
      result: user,
    });
  }

  res.send({
    error: 'You must be signed in to view this content',
  });
}
