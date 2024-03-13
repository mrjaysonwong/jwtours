import User from '@model/userModel';
import cloudinary from '@utils/config/cloudinary/index';
import { handleResponseError } from '@utils/helper/functions/errorHandler';

export async function updateProfilePhoto(req, res) {
  const { userId } = req.query;
  const { croppedImage } = req.body;

  try {
    if (!req.body) {
      return handleResponseError(
        res,
        400,
        'Invalid or missing request body croppedImage.',
        undefined
      );
    }
    
    const foundUser = await User.findById(userId);

    if (!foundUser) {
      return handleResponseError(res, 404, 'User Not Found.', undefined);
    }

    const imageId = foundUser.image?.public_id;

    const result = await cloudinary.uploader.upload(croppedImage, {
      folder: imageId ? '' : 'jwtours/avatars',
      public_id: imageId,
      allowed_formats: ['jpg'],
      format: 'jpg',
    });

    // -- Use findByIdAndUpdate for parallelism  or multiple queries to the same object.

    // const displayImage = await User.findByIdAndUpdate(
    //   userId,
    //   {
    //     'image.public_id': result.public_id,
    //     'image.url': result.secure_url,
    //   },
    //   { new: true }
    // );

    foundUser.image = {
      public_id: result.public_id,
      url: result.secure_url,
    };

    await foundUser.save();

    return res.status(200).json({
      status_code: 200,
      message: 'Successfully Updated!',
      user: foundUser,
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
