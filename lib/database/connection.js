import mongoose from 'mongoose';
import Token from '@model/tokenModel';

// strict schemas and store in the database
mongoose.set('strictQuery', false);

export default async function connectMongo() {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI);

    if (connection.readyState === 1) {
      // Date.now for epoch time format in ms
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
    console.error('DB connection error:', error.message);

    return Promise.reject(
      new Error('An error occured. Please try again or Refresh the page.')
    );
  }
}
