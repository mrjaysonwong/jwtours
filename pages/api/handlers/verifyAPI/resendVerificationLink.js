import User from '@model/userModel';
import Token from '@model/tokenModel';
import { render } from '@react-email/render';
import { sendEmail } from '@utils/config/email/sendMail';
import jwt from 'jsonwebtoken';
import { generateToken } from '@utils/helper/functions/generateToken';
import { formattedDate } from '@utils/helper/functions/formattedDate';
import { handleResponseError } from '@utils/helper/functions/errorHandler';
// import ReactDOMServer from 'react-dom/server';
import { EmailTemplateTheme } from '@src/theme/EmailTemplateTheme';

export async function resendVerificationLink(req, res) {
  const { email } = req.query;

  try {
    const userExists = await User.findOne({
      'email.email': email,
    });

    if (!userExists) {
      return handleResponseError(
        res,
        400,
        'Bad Request. Cannot send verification link at this time.',
        'User Not Found.'
      );
    }

    const isVerified = await User.findOne({
      'email.email': email,
      'email.isVerified': true,
    });

    if (isVerified) {
      return handleResponseError(
        res,
        400,
        'Bad Request. Cannot send verification link at this time.',
        'Email has been already verified'
      );
    }

    const newToken = generateToken(email);

    const decoded = jwt.verify(newToken, process.env.JWT_SECRET);

    req.user = decoded;

    const { exp: expires } = req.user;

    const epochTime = expires * 1000; // convert to milliseconds
    const formattedDateString = await formattedDate(epochTime);
    const encodedEmail = encodeURIComponent(email);
    const userId = userExists._id;

    const userTokenExists = await Token.findOne({
      'email.email': email,
    });

    if (!userTokenExists) {
      // create Token
      await Token.create({
        userId,
        email: [
          {
            email: email,
            token: newToken,
            expireTimestamp: epochTime,
          },
        ],
      });
    }

    await Token.findOneAndUpdate(
      { 'email.email': email },
      {
        $set: {
          'email.$.token': newToken,
          'email.$.expireTimestamp': epochTime,
        },
      },
      { new: true }
    );

    const mode = 'signup';
    const type = 'email';
    const url = `${process.env.NEXTAUTH_URL}/verify?token=${newToken}&email=${encodedEmail}&mode=${mode}&type=${type}`;

    // const emailTemplate = (
    //   <EmailTemplateTheme
    //     url={url}
    //     email={email}
    //     formattedDateString={formattedDateString}
    //     mode={mode}
    //   />
    // );

    const emailHtml = render(
      <EmailTemplateTheme
        url={url}
        email={email}
        formattedDateString={formattedDateString}
        mode={mode}
      />
    );

    // use this API to render the React Component Template to static markup
    // const message = ReactDOMServer.renderToStaticMarkup(emailTemplate);

    await sendEmail({
      to: email,
      subject: 'JWtours Account Verification',
      html: emailHtml,
    });

    return res.status(200).json({
      status_code: 200,
      message: `Verification link sent to ${email}`,
    });
  } catch (error) {
    console.error(error);

    return handleResponseError(
      res,
      500,
      'Internal Server Error',
      error.message
    );
  }
}
