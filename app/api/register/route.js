import User from "@/models/User";
import { NextResponse } from "next/server";
import bycrypt from "bcryptjs"
import connectDB from "@/lib/db";

export const POST = async (req, res)=>{
    const {username, password, confirmPassword} = await req.json()

    if( !username || !password){
        return new NextResponse({message: "Fill out all fields" , status: 404})
    }

    await connectDB()
    const existingUser = await User.findOne({username})

    if (existingUser){
        return new NextResponse("user already exists", {status: 400})
    }

    const isPasswordSame = (password === confirmPassword)
    if(isPasswordSame){
        const encryptedPassword = await bycrypt.hash(password, 10)
        try {
            const  newUser = new User({username, password : encryptedPassword})
            await newUser.save()
            return new NextResponse("User succesfully created", {status: 201})
    
        } catch (error) {
            throw new Error(error);
            
        }
    }
   
}