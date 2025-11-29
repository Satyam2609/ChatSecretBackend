import mongoose from 'mongoose';

const connectDB = async() => {
    try{
        const connectInstance = await mongoose.connect(process.env.MONGODB_URL)
        console.log(`MongoDB connected: ${connectInstance.connection.host}`);


    }
    catch(error){
        console.error("MongoDB is not connected", error);
        process.exit(1);
    }
}

export default connectDB