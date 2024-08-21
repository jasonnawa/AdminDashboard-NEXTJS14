import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI){
    throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local",
      );
}

const connectDB = async ()=>{
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB...")
    } catch (error) {
        console.error(`ERRROR : ${error.message}`)
        process.exit(1)
    }
}


export default connectDB;