import User from '@model/userModel';

export async function updateUser(req, res) {
    try {
      const { userId } = req.query;
      const data = req.body;
  
      const user = await User.findOne({ _id: userId });
  
      if (user && `${user._id}` === userId) {
        await User.findByIdAndUpdate(userId, data, { new: true });
  
        return res.status(200).json({
          code: 'SUCCESS',
          message: 'Successfully Updated!',
          ...data,
        });
      }
  
      return res
        .status(404)
        .json({ error: { code: 'NOT_FOUND', message: 'User Not Selected!' } });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({
        error: {
          code: 'SERVER_ERROR',
          message: 'Error while updating the data.',
        },
      });
    }
  }