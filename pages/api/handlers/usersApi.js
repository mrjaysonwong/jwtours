import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import User from '@model/userModel';
import { hash } from 'bcryptjs';

// GET: /api/users
export async function getAllUsers(req, res) {
  try {
    const session = await getServerSession(req, res, authOptions);

    if (session) {
      const users = await User.find({});

      return res.status(200).json({
        total_users: users.length,
        result: users,
      });
    } else {
      res.send({
        error: 'You must be signed in to view this content',
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(422).json({ error: 'Error while fetching the data' });
  }
}

export async function createUser(req, res) {
  if (!req.body) {
    return res.status(400).json({ success: false, error: 'Empty form data' });
  }

  const { firstName, lastName, email, password } = req.body;

  // check for existing user
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(422).json({
      success: false,
      error: 'Email Already Exists',
    });
  }

  try {
    // create and hash password
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: await hash(password, 12),
    });

    return res.status(201).json({
      success: true,
      message: ' Your registration has been successfully completed.',
      user: newUser,
    });
  } catch (error) {
    console.error('User creation failed:', error);
    return res.status(400).json({
      success: false,
      message: 'User creation failed.',
      error: error,
    });
  }
}
