import User from '@model/userModel';

export async function getUser(req, res, token) {
    try {
      const { userId } = req.query;
  
      if (!token || token.user._id !== userId) {
        return res.status(403).json({
          error: {
            code: 'FORBIDDEN',
            message: `You don't have authorization to view this page.`,
          },
        });
      }
  
      const user = await User.findById(userId);
  
      return res.status(200).json({
        code: 'SUCCESS',
        result: user,
      });
    } catch (error) {
      console.error(error);
      return res.status(422).json({
        error: {
          code: 'UNPROCESSABLE',
          message: 'Error while fetching the data',
        },
      });
    }
  }