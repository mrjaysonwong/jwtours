import User from '@model/userModel';
import Token from '@model/tokenModel';
import { handleResponseError } from '@utils/helper/functions/errorHandler';

export async function verifyEmailOTP(req, res) {
  const { email, userId } = req.query;
  const { otp } = req.body;

  try {
    if (!req.body || !otp) {
      return handleResponseError(
        res,
        400,
        'Please input the OTP.',
        'Invalid or missing request body OTP.'
      );
    }

    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return handleResponseError(res, 404, 'User Not Found', undefined);
    }

    const foundToken = await Token.findOne({
      email: {
        $elemMatch: {
          email: email,
          token: otp,
        },
      },
    });

    const currentTimestamp = Date.now(); // epochTime
    const expireTimestamp = foundToken?.email[0].expireTimestamp;

    if (!foundToken || expireTimestamp <= currentTimestamp) {
      return handleResponseError(
        res,
        400,
        'Invalid OTP',
        'Invalid or expired OTP.'
      );
    }

    const updatedEmail = await User.findOneAndUpdate(
      { _id: userId },
      {
        $addToSet: {
          email: {
            email: email,
            isPrimary: false,
            isVerified: true,
          },
        },
      },
      { new: true }
    );

    return res.status(200).json({
      status_code: 200,
      message: 'Email has been verified.',
      user: updatedEmail,
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
