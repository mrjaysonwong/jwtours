import User from '@model/userModel';
import cloudinary from '@utils/config/cloudinary/index';

export async function deleteProfilePhoto(req, res) {
  const { userId } = req.query;
  
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        error: {
          code: 404,
          message: 'User not found.',
        },
      });
    }

    const imageId = user.image?.public_id;

    if (imageId) {
      await cloudinary.uploader.destroy(imageId);
    }

    user.image = {
      public_id: null,
      url: null,
    };

    await user.save();

    return res.status(200).json({
      code: 200,
      message: 'Successfully Deleted',
    });
  } catch (error) {
    console.error('Server-side Error:', error.message);

    return res.status(500).json({
      error: {
        code: 500,
        message: 'Internal Server Error',
      },
    });
  }
}
