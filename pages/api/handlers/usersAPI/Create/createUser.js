import User from '@model/userModel';
import Token from '@model/tokenModel';
import jwt from 'jsonwebtoken';
import { generateToken } from '@utils/helper/functions/generateToken';
import { hash } from 'bcryptjs';
import { sendEmail } from '@utils/config/email/sendMail';
import { formattedDate } from '@utils/helper/functions/formattedDate';
import { handleResponseError } from '@utils/helper/functions/errorHandler';
import ReactDOMServer from 'react-dom/server';
import EmailTemplateTheme from '@src/theme/EmailTemplateTheme';

export async function createUser(req, res) {
  const { firstName, lastName, email, password } = req.body;

  try {
    if (!req.body) {
      return handleResponseError(
        res,
        400,
        'Invalid or missing request body form data.',
        undefined
      );
    }

    // check for existing user
    const userExists = await User.findOne({
      'email.email': email,
    });

    if (userExists) {
      return handleResponseError(res, 409, 'Email Already Exists', undefined);
    }

    const hashedPassword = await hash(password, 12);

    // Create an email verification token
    const token = generateToken(email);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    const { exp: expires } = req.user;
    const epochTime = expires * 1000; // convert to milliseconds
    const formattedDateString = await formattedDate(epochTime);
    // const encodedEmail = encodeURIComponent(email);

    const mode = 'signup';
    const type = 'email';
    const url = `${process.env.NEXTAUTH_URL}/verify?token=${token}&email=${email}&mode=${mode}&type=${type}`;

    const emailTemplate = (
      <EmailTemplateTheme
        url={url}
        email={email}
        formattedDateString={formattedDateString}
        mode={mode}
      />
    );

    // use this API to render the React Component Template to static markup
    const message = ReactDOMServer.renderToStaticMarkup(emailTemplate);

    // create and hash password
    const createdUser = await User.create({
      firstName,
      lastName,
      email: [
        {
          email: email,
          isPrimary: true,
          isVerified: false,
        },
      ],
      password: hashedPassword,
    });

    await Token.create({
      userId: createdUser._id,
      email: [
        {
          email: email,
          token: token,
          expireTimestamp: epochTime,
        },
      ],
    });

    await sendEmail({
      to: email,
      subject: 'JWtours Account Verification',
      text: message,
    });

    return res.status(201).json({
      status_code: 201,
      message: `Verification link sent to ${email}`,
    });
  } catch (error) {
    console.error(error);

    return handleResponseError(
      res,
      500,
      'Internal Server Error. Please try again later.',
      error.message
    );
  }
}
