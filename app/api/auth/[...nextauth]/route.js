import connectDB from "@/lib/db";
import { User } from "@/lib/models";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bycrypt from "bcryptjs"
import { NextResponse } from "next/server";

export const handler = NextAuth({
    providers : [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {label: 'Email', type: 'email'},
                password: {label: 'Password', type: 'password'}
            },
            
            async authorize(credentials, req){
                // code to authorize user and return user object
                await connectDB()

                try {
                    const jason = await User.find()
                    const user = await User.findOne({email: credentials.email})
                    console.log(user)
                    if (user){
                        //const isPasswordCorrect= await bycrypt.compare(
                          //  credentials.password,
                            //user.password  );
                            const isPasswordCorrect = user.password === credentials.password
                     
                     if(isPasswordCorrect){
                        return {name : user.username, email : user.email, image: user.profilePicture }
                     }
                    }
                } catch (error) {
                    throw new Error(error)
                    
                }
            }
        })
    ],
    
    callbacks: {
        async signIn ({user, account}){
            if(account?.provider == 'credentials'){
                return true
            }
        }
    }

})


export {handler as GET, handler as POST}