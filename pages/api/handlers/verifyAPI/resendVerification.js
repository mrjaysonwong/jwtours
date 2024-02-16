import User from '@model/userModel';
import { sendEmail } from '@utils/config/email/sendMail';
import jwt from 'jsonwebtoken';
import { htmlContent } from '@src/theme/emailTemplateLink';
import { generateToken } from '@utils/helper/functions/generateToken';
import { formattedDate } from '@utils/helper/functions/formattedDate';

export async function resendVerification(req, res) {
  const { email } = req.query;

  try {
    const user = await User.findOne({
      'email.email': email,
    });

    if (!user || !email) {
      return res.status(404).json({
        error: {
          code: 404, // NOT_FOUND
          message: 'Not Found: The requested resource was not found',
        },
      });
    }

    const newToken = generateToken(email);
    const decoded = jwt.verify(newToken, process.env.JWT_SECRET);

    req.user = decoded;

    const { exp: expires } = req.user;

    const epochTime = expires * 1000; // convert to milliseconds
    const formattedDateString = await formattedDate(epochTime);

    // find email and update token
    const updatedUser = await User.findOneAndUpdate(
      {
        'email.email': email,
      },
      {
        $set: {
          'email.$.emailToken': newToken,
        },
      },
      { new: true }
    );

    const link = `${process.env.NEXTAUTH_URL}/verify?email=${email}&token=${newToken}`;

    const message = htmlContent(link, email, formattedDateString);

    await sendEmail({
      to: email,
      subject: 'JWtours Email Verification',
      text: message,
    });

    return res.status(200).json({
      code: 200, // SUCCESS
      message: `Verification link sent to ${email}`,
      user: updatedUser,
    });
  } catch (error) {
    console.error('Server-side Error:', error.message);

    return res.status(500).json({
      error: {
        code: 500, // SERVER_ERROR
        message: 'An error occured. Please try again or Refresh the page.',
      },
    });
  }
}
