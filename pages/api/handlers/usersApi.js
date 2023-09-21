import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import User from '@model/userModel';
import jwt from 'jsonwebtoken';
import { hash } from 'bcryptjs';
import { sendEmail } from '@utils/helper/sendMail';

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
  const user = await User.findOne({ email });

  if (user) {
    return res.status(422).json({
      success: false,
      error: 'User Already Exists',
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

    const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });
    // console.log('newUser', newUser._id);
    // console.log('TOKEN CREATED', token);

    newUser.emailToken = token;
    await newUser.save();

    const link = `${process.env.NEXTAUTH_URL}/auth/user/email/${token}`;

    const message = `<div>Click on the link below to verify your email, if the link is not working then please paste into the browser.</div></br>
    <div>link:${link}</div>`;

    await sendEmail({
      to: newUser.email,
      subject: 'Verify Email',
      text: message,
    });

    return res.status(200).json({
      success: true,
      message: `Email sent to ${newUser.email}, please check your email`,
    });

    // return res.status(201).json({
    //   success: true,
    //   message: 'Your registration has been successfully completed.',
    //   user: newUser,
    // });
  } catch (error) {
    console.error('User creation failed:', error);
    return res.status(500).json({
      success: false,
      message: 'User creation failed.',
      error: error,
    });
  }
}
