import User from '@model/userModel';
import jwt from 'jsonwebtoken';
import { hash } from 'bcryptjs';
import { sendEmail } from '@utils/config/email/sendMail';
import { htmlContent } from '@src/theme/emailTemplateLink';
import { formattedDate } from '@utils/helper/functions/formattedDate';
import { generateToken } from '@utils/helper/functions/generateToken';

export async function createUser(req, res) {
  const { firstName, lastName, email, password } = req.body;

  try {
    if (!req.body) {
      return res.status(400).json({
        error: {
          code: 400, // BAD_REQUEST
          message: 'Empty form data',
        },
      });
    }

    // check for existing user
    const user = await User.findOne({
      email: {
        $elemMatch: {
          email: email,
        },
      },
    });

    if (user) {
      return res.status(409).json({
        error: {
          code: 409, // CONFLICT
          message: 'Email Already Exists.',
        },
      });
    }

    const hashedPassword = await hash(password, 12);

    // Create an email verification token
    const token = generateToken(email);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    const { exp: expires } = req.user;

    const epochTime = expires * 1000; // convert to milliseconds
    const formattedDateString = await formattedDate(epochTime);

    // create and hash password
    const pendingUser = await User.create({
      firstName,
      lastName,
      email: [
        { email: email, isPrimary: true, isVerified: false, emailToken: token },
      ],
      password: hashedPassword,
    });

    const link = `${process.env.NEXTAUTH_URL}/verify?email=${email}&token=${token}`;

    const message = htmlContent(link, email, formattedDateString);

    await sendEmail({
      to: email,
      subject: 'JWtours Email Verification',
      text: message,
    });

    return res.status(201).json({
      code: 201, // RESOURCE_CREATED
      message: `Verification link sent to ${email}`,
      user: pendingUser,
    });
  } catch (error) {
    console.error('Server-side Error:', error.message);

    return res.status(500).json({
      error: {
        code: 500, // SERVER_ERROR
        message: 'An error occured. Please try again or Refresh the page.',
        error: error.errors,
      },
    });
  }
}
