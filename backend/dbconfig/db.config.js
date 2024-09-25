import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();

const DB = process.env.MONGO_URI

const connectDB = async () => {
  try {
    await mongoose.connect(DB)
    console.log('Databse Connected Successfully');

  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
}

export default connectDB