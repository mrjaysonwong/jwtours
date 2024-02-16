import User from '@model/userModel';

export async function updateUser(req, res) {
  const { userId } = req.query;
  const data = req.body;

  try {
    if (!userId) {
      return res.status(404).json({
        error: {
          code: 404, // NOT_FOUND,
          message: 'User Not Found.',
        },
      });
    }

    const updatedUser = await User.findByIdAndUpdate(userId, data, {
      new: true,
    });

    return res.status(200).json({
      code: 200, // SUCCESS
      message: 'Successfully Updated!',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Server-side Error:', error.message);

    return res.status(500).json({
      error: {
        code: 500, // SERVER_ERROR
        message: 'Error while updating the data.',
      },
    });
  }
}
