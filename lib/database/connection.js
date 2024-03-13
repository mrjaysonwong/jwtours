import mongoose from 'mongoose';
import Token from '@model/tokenModel';

export default async function connectMongo() {
  try {
    const { connection } = await mongoose.connect(process.env.MONGODB_URI);

    if (connection.readyState === 1) {
      // Date.now for epoch time format in ms
      // query for hanging/pending token links
      const currentTimestamp = Date.now();

      await Token.updateMany(
        {
          'email.expireTimestamp': { $lte: currentTimestamp },
        },
        {
          $pull: {
            email: { expireTimestamp: { $lte: currentTimestamp } },
          },
        }
      );

      // delete document if email field exists and array length/size is 0
      await Token.deleteMany({ email: { $exists: true, $size: 0 } });

      return Promise.resolve(true);
    } else {
      return Promise.reject(new Error('Connection not fully established.'));
    }
  } catch (error) {
    console.error('DB connection error:', error);

    return Promise.reject(new Error('Internal Server Error'));
  }
}
