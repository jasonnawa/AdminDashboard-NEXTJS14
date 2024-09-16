import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
      username: { type: String, required: true, trim: true, unique: true },
      email: { type: String, required: true, trim: true, unique: true },
      profilePicture: { type: String },
      password: { type: String, required: false },
    },
    { timestamps: true }
  );
  
  

const companySchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    profilePicture: { type: String, required: false },
})

const contactSchema = new mongoose.Schema({
  name: {type: String, required: true, trim: true},
  profilePicture: { type: String, required: false },
  company : {type : mongoose.Schema.Types.ObjectId, ref: "Company",  required: true },
  number : { type : String, required: true},
  createdAt : {type : Date, default: Date.now }
})

const dealSchema = new mongoose.Schema({
  company: {type : mongoose.Schema.Types.ObjectId, ref: "Company",  required: true},
  contact : {type : mongoose.Schema.Types.ObjectId, ref: "Contact",  required: true },
  amount : { type : Number, required: true, min:0},
  date : {type : Date, default: Date.now }
})



export const User = mongoose.models.User || mongoose.model("User", userSchema);

export const Company = mongoose.models.Company || mongoose.model("Company", companySchema)

export const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema)

export const Deal = mongoose.models.Deal || mongoose.model("Deal", dealSchema)


