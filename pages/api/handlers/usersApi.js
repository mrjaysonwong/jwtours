import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import User from '@model/userModel';
import jwt from 'jsonwebtoken';
import { hash } from 'bcryptjs';
import { sendEmail } from '@utils/api/server/email/sendMail';
import { htmlContent } from '@src/theme/emailTemplate';

export async function getAllUsers(req, res, token) {
  try {
    if (token.user.role !== 'admin') {
      return res
        .status(403)
        .send(`You don't have authorization to view this page.`);
    }

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

export async function getUser(req, res, token) {
  try {
    const { userId } = req.query;

    if (!token || token.user._id !== userId) {
      return res
        .status(403)
        .send(`You don't have authorization to view this page.`);
    }

    const user = await User.findById(userId);

    return res.status(200).json({
      result: user,
    });
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
      code: 'SUCCESS',
      message: `Verification link sent to ${newUser.email}`,
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

export async function updateUser(req, res) {
  try {
    const { userId } = req.query;
    const data = req.body;

    if (userId || data) {
      await User.findByIdAndUpdate(userId, data, { new: true });

      return res.status(201).json({
        code: 'SUCCESS',
        message: 'Successfully Updated!',
        ...data,
      });
    }

    return res.status(404).json({ error: { message: 'User Not Selected!' } });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      code: 'SERVER_ERROR',
      error: { message: 'Error while updating the data.' },
    });
  }
}
