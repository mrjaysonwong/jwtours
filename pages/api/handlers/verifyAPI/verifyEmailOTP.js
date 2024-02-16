import User from '@model/userModel';
import Token from '@model/tokenModel';

export async function verifyEmailOTP(req, res) {
  const { email, userId } = req.query;
  const { otp } = req.body;

  try {
    if (!userId) {
      return res.status(404).json({
        error: {
          code: 404, // NOT_FOUND
          message: 'User Not Found.',
        },
      });
    }

    if (!otp) {
      return res.status(400).json({
        error: {
          code: 400, // BAD_REQUEST
          message: 'Please enter the OTP',
        },
      });
    }

    const foundToken = await Token.findOne({
      email: {
        $elemMatch: {
          email: email,
          token: otp,
        },
      },
    });

    const currentTimestamp = Date.now();
    const expireTimestamp = foundToken?.email[0].expireTimestamp;

    if (!foundToken || expireTimestamp <= currentTimestamp) {
      return res.status(400).json({
        error: {
          code: 400, // BAD_REQUEST
          message: 'Invalid OTP',
        },
      });
    }

    const existingUser = await User.findOne({ _id: userId });

    if (!existingUser) {
      return res.status(404).json({
        error: {
          code: 404, // NOT_FOUND
          message: 'User Not Found.',
        },
      });
    }

    await User.findOneAndUpdate(
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
      code: 200, // SUCCESS
      message: 'Email has been verified.',
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
