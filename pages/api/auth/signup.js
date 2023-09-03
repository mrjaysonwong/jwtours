import connectMongo from 'database/connection';
import User from '@model/userModel';
import { hash } from 'bcryptjs';

// POST: domain/api/auth/signup
export default async function handler(req, res) {
  try {
    await connectMongo();

    const { method } = req;

    if (method === 'POST') {
      if (!req.body) {
        return res
          .status(400)
          .json({ sucess: false, error: 'Empty form data' });
      }

      const { firstName, lastName, email, password } = req.body;

      // check for existing email
      const emailExists = await User.findOne({ email });

      if (emailExists) {
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
          message: 'Successfully Registered',
          user: newUser,
        });
      } catch (error) {
        console.error('User creation error:', error);
        return res.status(500).json({
          success: false,
          error: 'User creation failed',
        });
      }
    } else {
      res.status(405).send(`HTTP ${method} not valid, only POST accepted`);
    }
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ error: 'Connection Failed' });
  }
}
