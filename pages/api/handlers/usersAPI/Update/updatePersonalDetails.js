import User from '@model/userModel';
import { handleResponseError } from '@utils/helper/functions/errorHandler';

export async function updatePersonalDetails(req, res) {
  const { userId } = req.query;
  const data = req.body;

  try {
    const foundUser = await User.findById(userId);

    if (!foundUser) {
      return handleResponseError(res, 404, 'User Not Found.', undefined);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, data, {
      new: true,
    });

    return res.status(200).json({
      status_code: 200, // SUCCESS
      message: 'Successfully Updated!',
      user: updatedUser,
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
