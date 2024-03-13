import User from '@model/userModel';
import cloudinary from '@utils/config/cloudinary/index';
import { handleResponseError } from '@utils/helper/functions/errorHandler';

export async function deleteProfilePhoto(req, res) {
  const { userId } = req.query;

  try {
    const foundUser = await User.findById(userId);

    if (!foundUser) {
      return handleResponseError(res, 404, 'User Not Found.', undefined);
    }

    const imageId = foundUser.image?.public_id;

    if (imageId) {
      await cloudinary.uploader.destroy(imageId);
    }

    foundUser.image = {
      public_id: null,
      url: null,
    };

    await foundUser.save();

    return res.status(200).json({
      status_code: 200,
      message: 'Successfully Deleted',
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
