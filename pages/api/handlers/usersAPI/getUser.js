import User from '@model/userModel';

export async function getUser(req, res, token) {
  const { userId } = req.query;

  try {
    if (!token || token.user._id !== userId) {
      return res.status(403).json({
        error: {
          code: 403, // FORBIDDEN
          message: `You don't have authorization to view this page.`,
        },
      });
    }

    const user = await User.findById(userId);

    return res.status(200).json({
      code: 200, // SUCCESS
      result: user,
    });
  } catch (error) {
    console.error('Error:', error.message);

    return res.status(422).json({
      error: {
        code: 422, // UNPROCESSABLE
        message: 'Error while fetching the data',
      },
    });
  }
}
