import mongoose from 'mongoose';

// strict schemas and store in the database
// mongoose.set('strictQuery', false);

export default async function connectMongo() {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI);

    if (connection.readyState === 1) {
      return Promise.resolve(true);
    }
  } catch (error) {
    // return Promise.reject('Database connection failed.');
    console.error(error);
    throw new Error('Connection failed.');
  }
}
