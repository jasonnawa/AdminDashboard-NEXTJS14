import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Company, Contact } from "@/lib/models";
import mongoose from "mongoose";

//1. get contacts
export const GET = async (req) => {
  //retrieve search params from url
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");
  const page = searchParams.get("page") || 1;

  const ITEM_PER_PAGE = 5;

  try {
    await connectDB();
    if (query) {
      const regex = new RegExp(query, "i");
      const contacts = await Contact.find({ name: { $regex: regex } }).populate("company")
        .limit(ITEM_PER_PAGE)
        .skip(ITEM_PER_PAGE * (page - 1));
      const totalContacts =
        (await Contact.find({ name: { $regex: regex } })).length /
        ITEM_PER_PAGE;
      
      return new NextResponse(
        JSON.stringify({
          contacts: contacts,
         
          totalContacts: totalContacts,
        }),
        { status: 200 }
      );
    } else {
      const contacts = await Contact.find().populate("company")
        .limit(ITEM_PER_PAGE)
        .skip(ITEM_PER_PAGE * (page - 1));
      const totalContacts = (await Contact.find()).length / ITEM_PER_PAGE;
    
      return new NextResponse(
        JSON.stringify({
          contacts: contacts,
          
          totalContacts: totalContacts,
        }),
        { status: 200 }
      );
    }
  } catch (error) {
    throw new Error(error);
  }
};


// create new contact
export const POST = async (req) => {
  const { name, number, company } = await req.json();
  console.log(name, number, company);

  if (!name || !number || !company) {
    return new NextResponse(JSON.stringify(
      { message: "required fields not filled" },
      { status: 400 }
    ));
  }

  try {
    await connectDB();
    //check for existing contact
    const contact = await Contact.find({name:name , number: number, company:  new mongoose.Types.ObjectId(company)})
    console.log("contact", contact)

    if(contact.length > 0){
      return new NextResponse(JSON.stringify(
        { message: "contact already exists", contact: contact }),
        { status: 400 }
      );
    }
    console.log("jdbisjifjijsfi")
    const newContact = new Contact({ name, number, company:  new mongoose.Types.ObjectId(company) });
    newContact.save();
    console.log("new cotact", newContact)

    if (newContact){
      return new NextResponse(JSON.stringify(
        { message: "successfully created contact", newContact: newContact }),
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error)
    return new NextResponse(JSON.stringify(
      { message: error }),
      { status: 500 }
    );
  }
};
