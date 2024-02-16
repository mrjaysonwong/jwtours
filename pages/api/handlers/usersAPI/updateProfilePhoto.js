import User from '@model/userModel';
import cloudinary from '@utils/config/cloudinary/index';

export async function updateProfilePhoto(req, res) {
  const { userId } = req.query;
  const { croppedImage } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        error: {
          code: 404, // NOT_FOUND
          message: 'User not found.',
        },
      });
    }

    const imageId = user.image?.public_id;

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

    user.image = {
      public_id: result.public_id,
      url: result.secure_url,
    };

    await user.save();

    return res.status(200).json({
      code: 200, // SUCCESS,
      message: 'Successfully Updated!',
      user: user,
    });
  } catch (error) {
    console.error('Server-side Error:', error.message);

    return res.status(500).json({
      error: {
        code: 500, // SERVER_ERROR,
        message: 'Internal Server Error',
      },
    });
  }
}
