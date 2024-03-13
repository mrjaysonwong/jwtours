import User from '@model/userModel';
import { handleResponseError } from '@utils/helper/functions/errorHandler';

export async function updatePrimaryEmail(req, res) {
  const { userId } = req.query;
  const { email } = req.body;

  try {
    if (!req.body || !email) {
      return handleResponseError(
        res,
        400,
        'Please input the email.',
        'Invalid or missing request body email.'
      );
    }

    const foundUser = await User.findById(userId);

    if (!foundUser) {
      return handleResponseError(res, 404, 'User Not Found.', undefined);
    }

    const foundCurrentPrimaryEmail = foundUser.email.find(
      (e) => e.isPrimary === true
    );

    const currentPrimaryEmail = foundCurrentPrimaryEmail.email;

    await User.findOneAndUpdate(
      { 'email.email': currentPrimaryEmail },
      {
        $set: {
          'email.$.isPrimary': false,
        },
      },
      { new: true }
    );

    const updatedPrimaryEmail = await User.findOneAndUpdate(
      { 'email.email': email },
      {
        $set: {
          'email.$.isPrimary': true,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      status_code: 200,
      message: 'Primary Email has been updated.',
      user: updatedPrimaryEmail,
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
