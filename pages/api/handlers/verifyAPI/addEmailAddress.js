import User from '@model/userModel';
import Token from '@model/tokenModel';
import { render } from '@react-email/render';
import { sendEmail } from '@utils/config/email/sendMail';
import { generateOTP } from '@utils/helper/functions/generateOTP';
import { formattedDate } from '@utils/helper/functions/formattedDate';
import { handleResponseError } from '@utils/helper/functions/errorHandler';
// import ReactDOMServer from 'react-dom/server';
import EmailTemplateTheme from '@src/theme/EmailTemplateTheme';

async function createToken(userId, email) {
  const { otp: genOTP, expires: genExpires } = generateOTP();

  const createdToken = await Token.create({
    userId,
    email: [
      {
        email: email,
        token: genOTP,
        expireTimestamp: genExpires,
      },
    ],
  });

  return { genOTP, genExpires, token: createdToken };
}

async function updateToken(foundUserToken, userId, email) {
  const foundEmail = foundUserToken.email.find((e) => e.email === email);

  if (!foundEmail) {
    const { otp: genOTP, expires: genExpires } = generateOTP();

    const updatedToken = await Token.findOneAndUpdate(
      { userId },
      {
        $addToSet: {
          email: {
            email: email,
            token: genOTP,
            expireTimestamp: genExpires,
          },
        },
      },

      { new: true }
    );

    return { genOTP, genExpires, token: updatedToken };
  } else {
    // updateCurrentEmailToken
    const { otp: genOTP, expires: genExpires } = generateOTP();

    const updatedToken = await Token.findOneAndUpdate(
      {
        'email.email': email,
      },
      {
        $set: {
          'email.$.token': genOTP,
          'email.$.expireTimestamp': genExpires,
        },
        $inc: {
          'email.$.requestCount': 1,
        },
      },
      { new: true }
    );

    return { genOTP, genExpires, token: updatedToken };
  }
}

export async function addEmailAddress(req, res) {
  const { userId } = req.query;
  const { email } = req.body;

  try {
    if (!req.body || !email) {
      return handleResponseError(
        res,
        400,
        'Invalid or missing request body email.',
        undefined
      );
    }

    const emailTaken = await User.findOne({
      'email.email': email,
    });

    if (emailTaken) {
      return handleResponseError(res, 409, 'Email Already Exists.', undefined);
    }

    const foundUser = await User.findById(userId);

    if (!foundUser) {
      return handleResponseError(res, 404, 'User Not Found.', undefined);
    }

    let otp;
    let epochTimeExpires;

    const foundUserToken = await Token.findOne({ userId });

    if (!foundUserToken) {
      const { genOTP, genExpires } = await createToken(userId, email);

      otp = genOTP;
      epochTimeExpires = genExpires;
    } else {
      const { genOTP, genExpires } = await updateToken(
        foundUserToken,
        userId,
        email
      );

      otp = genOTP;
      epochTimeExpires = genExpires;

      const foundEmail = foundUserToken.email.find((e) => e.email === email);

      // check for rateLimit
      if (foundEmail) {
        const rateLimit = foundEmail.requestCount >= 5;

        if (rateLimit) {
          await Token.findOneAndUpdate(
            { 'email.email': email },
            {
              $set: {
                'email.$.rateLimit': true,
              },
            },
            { new: true }
          );

          return handleResponseError(
            res,
            429,
            'Rate limit exceeded. Please try again later.',
            'Too many requests >=5'
          );
        }
      }
    }

    const formattedDateString = await formattedDate(epochTimeExpires);
    const firstName = foundUser.firstName;
    const mode = 'email-otp';

    // const emailTemplate = (
    //   <EmailTemplateTheme
    //     otp={otp}
    //     firstName={firstName}
    //     formattedDateString={formattedDateString}
    //     mode={mode}
    //   />
    // );

    const emailHtml = render(
      <EmailTemplateTheme
        otp={otp}
        firstName={firstName}
        formattedDateString={formattedDateString}
        mode={mode}
      />
    );

    // const message = ReactDOMServer.renderToStaticMarkup(emailTemplate);

    await sendEmail({
      to: email,
      subject: 'JWtours Email Verification',
      html: emailHtml,
    });

    return res.status(200).json({
      status_code: 200,
      message: 'OTP sent',
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
