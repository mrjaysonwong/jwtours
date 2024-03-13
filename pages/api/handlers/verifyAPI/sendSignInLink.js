import User from '@model/userModel';
import Token from '@model/tokenModel';

import jwt from 'jsonwebtoken';
import { generateToken } from '@utils/helper/functions/generateToken';
import { sendEmail } from '@utils/config/email/sendMail';
import { formattedDate } from '@utils/helper/functions/formattedDate';
import EmailTemplateTheme from '@src/theme/EmailTemplateTheme';
import { handleResponseError } from '@utils/helper/functions/errorHandler';
import ReactDOMServer from 'react-dom/server';

export async function sendSignInLink(req, res) {
  const { callbackUrl } = req.query;
  const { email } = req.body;

  try {
    if (!req.query || !req.body) {
      return handleResponseError(
        res,
        400,
        'Invalid or missing request.',
        undefined
      );
    }

    const userExists = await User.findOne({ 'email.email': email });

    if (!userExists) {
      return handleResponseError(
        res,
        400,
        'Bad Request. Cannot send link right now.',
        'User not found'
      );
    }

    const isVerified = userExists.email.find((e) => e.isVerified === true);

    if (!isVerified) {
      return handleResponseError(res, 401, 'Verify Email First', undefined);
    }

    const token = generateToken(email);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    const { exp: expires } = req.user;
    const epochTime = expires * 1000; // convert to milliseconds
    const formattedDateString = await formattedDate(epochTime);
    const encodedEmail = encodeURIComponent(email);

    const mode = 'signin';
    const type = 'email';
    const url = `${process.env.NEXTAUTH_URL}/verify?token=${token}&email=${encodedEmail}&mode=${mode}&type=${type}&callbackUrl=${callbackUrl}`;

    const emailTemplate = (
      <EmailTemplateTheme
        url={url}
        formattedDateString={formattedDateString}
        mode={mode}
      />
    );

    // use this API to render the React Component Template to static markup
    const message = ReactDOMServer.renderToStaticMarkup(emailTemplate);

    const userId = userExists._id;

    const userTokenExists = await Token.findOne({ userId });

    if (userTokenExists) {
      await Token.findOneAndUpdate(
        { 'email.email': email },
        {
          $set: {
            'email.$.token': token,
            'email.$.expireTimestamp': epochTime,
            'email.$.isVerified': false,
          },
        },
        { new: true }
      );
    } else {
      // create User Token and set fields
      await Token.create({
        userId,
        email: [
          {
            email: email,
            token: token,
            expireTimestamp: epochTime,
            isVerified: false,
          },
        ],
      });
    }

    // server-side environment
    await sendEmail({
      to: email,
      subject: 'JWtours Sign In Link',
      text: message,
    });

    return res.status(200).json({
      status_code: 200,
      message: `A sign in link has been sent to ${email}`,
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
