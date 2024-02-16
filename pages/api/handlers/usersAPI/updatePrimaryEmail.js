import User from '@model/userModel';

export async function updatePrimaryEmail(req, res) {
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

    const foundUser = await User.findById({ _id: userId });

    if (!foundUser) {
      return res.status(404).json({
        error: {
          code: 404, // NOT_FOUND
          message: 'User Not Found.',
        },
      });
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
      code: 200, // SUCCESS
      message: 'Primary Email has been updated.',
      user: updatedPrimaryEmail,
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
