import connectDB from "@/lib/db";
import User from "@/models/User";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bycrypt from "bcryptjs"
import { NextResponse } from "next/server";

export const handler = NextAuth({
    providers : [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: {label: 'Username', type: 'text'},
                password: {label: 'Password', type: 'password'}
            },
            
            async authorize(credentials, req){
                // code to authorize user and return user object
                await connectDB()

                try {
                    const user = await User.findOne({username: credentials.username})
                    if (user){
                        const isPasswordCorrect= await bycrypt.compare(
                            credentials.password,
                            user.password
                        );

                     
                     if(isPasswordCorrect){
                        return {name : user.username}
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