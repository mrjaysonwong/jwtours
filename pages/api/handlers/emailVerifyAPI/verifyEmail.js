import User from '@model/userModel';
import jwt from 'jsonwebtoken';

export async function verifyEmail(req, res) {
  const { token, email } = req.query;

  if (!token) {
    return res.status(404).json({
      error: {
        code: 'NO_TOKEN',
        message: 'Invalid or No Token',
      },
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      error: {
        code: 'NOT_FOUND',
        message: `Not Found: The requested resource was not found`,
      },
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // pass decoded to req.user to check if token is still valid
    req.user = decoded;

    const { email } = req.user;

    // Token is still valid
    await User.findOneAndUpdate(
      { email },
      { isVerified: true, emailToken: null }
    );

    return res
      .status(200)
      .json({ code: 'SUCCESS', message: 'Email Verified Successfully' });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      console.error('Server-side Error:', error.message);

      return res.status(400).json({
        error: {
          code: `${user.isVerified === true ? 'VERIFIED' : 'TOKEN_EXPIRED'}`,
          message:
            'It looks like you may have clicked on an invalid email verification link.',
        },
      });
    } else {
      console.error('Server-side Error:', error.message);

      return res.status(500).json({
        error: {
          code: 'SERVER_ERROR',
          message: 'An error occured. Please try again or Refresh the page.',
        },
      });
    }
  }
}
