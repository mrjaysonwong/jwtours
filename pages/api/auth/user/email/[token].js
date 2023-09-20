import connectMongo from 'lib/database/connection';
import User from '@model/userModel';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  try {
    await connectMongo();

    const { method } = req;

    if (method === 'PUT') {
      const { token } = req.query;

      if (!token) {
        return res.status(200).json({ message: 'no Token' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded;

      console.log('req.user', req.user);
      await User.findByIdAndUpdate(req.user._id, {
        isVerified: 'yes',
        emailToken: null,
      });

      return res
        .status(200)
        .json({ success: true, message: 'Email verified successfully' });
    } else {
      res
        .status(405)
        .send(`HTTP method ${method} Not Allowed, only PUT Accepted`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Connection failed.' });
  }
}
