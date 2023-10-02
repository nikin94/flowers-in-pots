import mongoose from 'mongoose'

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL!)
  } catch (err) {
    throw new Error('Connecting to db error')
  }
}

export default connectMongoDB
