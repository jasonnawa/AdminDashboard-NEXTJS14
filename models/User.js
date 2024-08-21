import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username : {type: String, required: true, trim: true, unique: true },
    password: {type: String, required: false}
}, {timestamps: true})

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User;