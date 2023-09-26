import connectMongo from 'lib/database/connection';
import User from '@model/userModel';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  try {
    await connectMongo();

    const { method } = req;

    if (method === 'PUT') {
      const { token } = req.query;

      if (!token) {
        return res.status(400).json({ message: 'no Token' });
      }

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // pass decoded to req.user to check if token is still valid
        req.user = decoded;

        // Token is still valid
        await User.findByIdAndUpdate(req.user._id, {
          isVerified: true,
          emailToken: null,
        });

        return res
          .status(200)
          .json({ emailToken: null, message: 'Email Verified Successfully' });
      } catch (error) {
        if (error.name === 'TokenExpiredError') {
          console.error('Server-side Error:', error.message);
          return res.status(400).json({
            error: {
              code: 'TOKEN_EXPIRED',
              message:
                'It looks like you may have clicked on an invalid email verification link.',
            },
          });
        } else {
          console.error('Server-side Error:', error.message);
          return res.status(500).json({
            error: {
              code: 'INTERNAL_ERROR',
              message: 'An internal server error occurred.',
            },
          });
        }
      }
    } else {
      res
        .status(405)
        .send(`HTTP method ${method} Not Allowed, only PUT Accepted`);
    }
  } catch (error) {
    console.error('Database error:', error.message);
    return res.status(500).json({
      error: {
        code: 'DB_ERROR',
        message: 'An internal server error occurred.',
      },
    });
  }
}
