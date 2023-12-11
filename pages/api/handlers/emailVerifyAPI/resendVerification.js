import User from '@model/userModel';
import { sendEmail } from '@utils/config/email/sendMail';
import { htmlContent } from '@src/theme/emailTemplate';
import { generateNewToken } from '@utils/helper/generateNewToken';

export async function resendVerification(req, res) {
  try {
    const { email } = req.query;

    const user = await User.findOne({ email });

    if (user.emailToken !== null) {
      const newToken = generateNewToken(email);

      await User.findOneAndUpdate({ email }, { emailToken: newToken });

      const link = `${process.env.NEXTAUTH_URL}/verify?email=${email}&token=${newToken}`;

      const message = htmlContent(link, email);

      await sendEmail({
        to: email,
        subject: 'JWtours Email Verification',
        text: message,
      });

      return res.status(200).json({
        code: 'SUCCESS',
        message: `Verification link sent to ${email}`,
      });
    } else {
      return res.status(400).json({
        error: {
          code: 'BAD_REQUEST',
          message: `Bad Request: Your request was invalid.`,
        },
      });
    }
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: {
        code: 'SERVER_ERROR',
        message:
          'An error occured. Please try again or Refresh the page.',
      },
    });
  }
}
