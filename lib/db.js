import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI){
    throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local",
      );
}

const connectDB = async ()=>{
    const connectionState = mongoose.connection.readyState;

    if (connectionState == 1){
        console.log("Already connected")
        return;
    }

    if( connectionState == 2){
        console.log("connecting...")
        return;
    }


    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB...")
    } catch (error) {
        console.error(`ERRROR : ${error.message}`)
        throw new Error("Error", err)
    }
}


export default connectDB;