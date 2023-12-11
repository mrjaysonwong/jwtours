import User from '@model/userModel';
import cloudinary from '@utils/config/cloudinary/index';

export async function updateProfilePhoto(req, res) {
  const { userId } = req.query;
  const { croppedImage } = req.body;

  try {
    const user = await User.findById(userId);
    const imageId = user.image?.public_id;

    const result = await cloudinary.uploader.upload(croppedImage, {
      folder: imageId ? '' : 'jwtours/avatars',
      public_id: imageId,
      allowed_formats: ['jpg'],
      format: 'jpg',
    });

    if (userId) {
      const displayImage = await User.findByIdAndUpdate(
        userId,
        {
          $set: {
            'image.public_id': result.public_id,
            'image.url': result.secure_url,
          },
        },
        { new: true }
      );

      return res.status(200).json({
        code: 'SUCCESS',
        message: 'Successfully Updated!',
        displayImage,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: {
        code: 'SERVER_ERROR',
        message: 'Internal Server Error',
      },
    });
  }
}
