import User from '@model/userModel';
import { sendEmail } from '@utils/api/server/email/sendMail';
import { htmlContent } from '@src/theme/emailTemplate';
import { generateNewToken } from '@utils/api/client/email/token/generateNewToken';

export async function resendVerification(req, res) {
  try {
    const { email } = req.query;

    const newToken = generateNewToken(email);

    await User.findOneAndUpdate({ email }, { emailToken: newToken });

    const link = `${process.env.NEXTAUTH_URL}/verify?email=${email}&token=${newToken}`;

    const message = htmlContent(link, email);

    await sendEmail({
      to: email,
      subject: 'JWtours Email Verification',
      text: message,
    });

    return res.status(201).json({
      code: 'SUCCESS',
      message: `Verification link sent to ${email}`,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: {
        code: 'INTERNAL_ERROR',
        message:
          'An internal server error occurred while resending email verification link.',
      },
    });
  }
}
