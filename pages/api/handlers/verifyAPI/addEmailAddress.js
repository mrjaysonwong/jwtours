import User from '@model/userModel';
import Token from '@model/tokenModel';
import { sendEmail } from '@utils/config/email/sendMail';
import { htmlContent } from '@src/theme/emailTemplateOTP';
import { generateOTP } from '@utils/helper/functions/generateOTP';
import { formattedDate } from '@utils/helper/functions/formattedDate';

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
    if (!userId) {
      return res.status(404).json({
        error: {
          code: 404, // NOT_FOUND
          message: 'User Not Found.',
        },
      });
    }

    const emailTaken = await User.findOne({
      'email.email': email,
    });

    if (emailTaken) {
      return res.status(409).json({
        error: {
          code: 409, // CONFLICT
          message: 'Email Already Exists.',
        },
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        error: {
          code: 404, // NOT_FOUND
          message: 'User Not Found.',
        },
      });
    }

    let otp;
    let expires;

    const foundUserToken = await Token.findOne({ userId });

    if (!foundUserToken) {
      const { genOTP, genExpires } = await createToken(userId, email);

      otp = genOTP;
      expires = genExpires;
    } else {
      const { genOTP, genExpires } = await updateToken(
        foundUserToken,
        userId,
        email
      );

      otp = genOTP;
      expires = genExpires;

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

          return res.status(429).json({
            error: {
              code: 429, // TOO_MANY_REQUESTS
              message: 'Rate limit exceeded. Try again later.',
            },
          });
        }
      }
    }

    const epochTime = expires;
    const formattedDateString = await formattedDate(epochTime);

    const message = htmlContent(otp, user.firstName, formattedDateString);

    await sendEmail({
      to: email,
      subject: 'JWtours Email Verification',
      text: message,
    });

    return res.status(200).json({
      code: 200, // SUCCESS
      message: 'OTP sent',
    });
  } catch (error) {
    console.error('Server-side Error', error.message);

    return res.status(500).json({
      error: {
        code: 500, // SERVER_ERROR
        message: 'An error occured while updating the data.',
      },
    });
  }
}
