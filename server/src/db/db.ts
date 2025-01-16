import mongoose from "mongoose"

export const connectDB = async() => {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/wallet`)
    console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`)
}