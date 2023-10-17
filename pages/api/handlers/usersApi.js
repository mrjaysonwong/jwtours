import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import User from '@model/userModel';
import jwt from 'jsonwebtoken';
import { hash } from 'bcryptjs';
import { sendEmail } from '@utils/api/server/email/sendMail';
import { htmlContent } from '@src/theme/emailTemplate';

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
  try {
    if (!req.body) {
      return res.status(400).json({
        code: 'NO_DATA',
        error: {
          message: 'Empty form data',
        },
      });
    }

    const { firstName, lastName, email, gender, password } = req.body;

    // check for existing user
    const user = await User.findOne({ email });

    if (user) {
      return res.status(422).json({
        error: {
          message: 'Email Already Exists.',
        },
      });
    }

    const hashedPassword = await hash(password, 12);

    // create and hash password
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      gender,
      password: hashedPassword,
    });

    // Create an email verification token
    const token = jwt.sign({ email: newUser.email }, process.env.JWT_SECRET, {
      expiresIn: '2m',
    });

    newUser.emailToken = token;
    await newUser.save();

    const link = `${process.env.NEXTAUTH_URL}/verify?email=${newUser.email}&token=${token}`;

    const message = htmlContent(link, newUser.email);

    await sendEmail({
      to: newUser.email,
      subject: 'JWtours Email Verification',
      text: message,
    });

    return res.status(201).json({
      success: {
        message: `Verification link sent to ${newUser.email}`,
      },
    });
  } catch (error) {
    console.error('User creation failed:', error);

    return res.status(500).json({
      error: {
        message: 'User creation failed.',
        error: error.errors,
      },
    });
  }
}
