import mongoose from 'mongoose';

// strict schemas and store in the database
mongoose.set('strictQuery', false);

export default async function connectMongo() {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI);

    if (connection.readyState === 1) {
      return Promise.resolve(true);
    } else {
      return Promise.reject(new Error('Connection not fully established.'));
    }
  } catch (error) {
    console.error('DB connection error:', error);
    
    return Promise.reject(
      new Error('An error occured. Please try again or Refresh the page.')
    );
  }
}
