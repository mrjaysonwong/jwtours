import User from '@model/userModel';
import jwt from 'jsonwebtoken';

export async function verifyEmailLink(req, res) {
  const { token, email } = req.query;

  let user;

  try {
    if (!token) {
      return res.status(404).json({
        error: {
          code: 404, // NOT_FOUND
          message: 'Invalid or No Token',
        },
      });
    }

    user = await User.findOne({
      'email.email': email,
    });

    if (!user) {
      return res.status(404).json({
        error: {
          code: 404, // NOT_FOUND
          message: 'Not Found: The requested resource was not found.',
        },
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // pass decoded to req.user to check if token is still valid
    req.user = decoded;

    // Token is still valid, if verification link was clicked unset/delete emailToken
    const updatedUser = await User.findOneAndUpdate(
      {
        email: {
          $elemMatch: {
            email: email,
            emailToken: token,
          },
        },
      },
      {
        $set: {
          'email.$.isVerified': true,
        },
        $unset: {
          'email.$.emailToken': 1,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      code: 200, // SUCCESS
      message: 'Email has been verified.',
      user: updatedUser,
    });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      console.error('Server-side Error:', error.message);

      const foundEmail = user.email.find((e) => e.email === email);

      const isVerified = foundEmail.isVerified;

      return res.status(`${isVerified ? 400 : 401}`).json({
        error: {
          code: `${isVerified ? 400 : 401}`,
          message: `It looks like you may have clicked on an ${
            isVerified ? 'invalid' : 'expired'
          } email verification link.`,
        },
      });
    } else {
      console.error('Server-side Error:', error.message);

      return res.status(500).json({
        error: {
          code: 500, // SERVER_ERROR
          message: 'An error occured. Please try again or Refresh the page.',
        },
      });
    }
  }
}
