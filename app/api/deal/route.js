import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Company, Contact, Deal } from "@/lib/models";
import mongoose from "mongoose";


//1. get deals
export const GET = async (req) => {
    //retrieve search params from url
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");
    const page = searchParams.get("page") || 1;
  
    const ITEM_PER_PAGE = 5;
  
    try {
      await connectDB();
      const allQuery = []
      if (query) {
        //find companies or contacts
        const regex = new RegExp(query, "i");
        const companies = await Company.find({name: {$regex: regex}})
        const contacts = await Contact.find({name: {$regex: regex}})

        if (companies.length === 0 && contacts.length === 0 ){
            return new NextResponse(JSON.stringify({message: "No deals found"}), {status: 404})
        }

        if (companies.length > 0){
            const companyIds = companies.map(company=>company._id)
            allQuery.push({company : {$in : companyIds}})
           
        }
        if (contacts.length > 0 ){
            const contactIds = contacts.map(contact=>contact._id)
            allQuery.push({contact: {$in : contactIds}})
        }

        const finalQuery = query.length>1?{ $or : allQuery}: allQuery[0]

        //extract company ids and contatct ids
        //const companyIds = companies.map(company=>company._id)
        //const contactIds = contacts.map(contact=>contact._id)

        console.log("finalQuery", finalQuery)
        console.log("allQuery", allQuery)

        //find deals matching company IDs

        const deals  = await Deal.find(finalQuery).populate('contact').populate('company').limit(ITEM_PER_PAGE).skip(ITEM_PER_PAGE * (page - 1));
        const totalDeals  = (await Deal.find(finalQuery)).length/ITEM_PER_PAGE

    
        //const contacts = await Contact.find({ name: { $regex: regex } })
          //.limit(ITEM_PER_PAGE)
          //.skip(ITEM_PER_PAGE * (page - 1));


        //const totalContacts =
         // (await Contact.find({ name: { $regex: regex } })).length /
          //ITEM_PER_PAGE;
        return new NextResponse(
          JSON.stringify({
            deals: deals,
            totalDeals: totalDeals,
          }),
          { status: 200 }
        );
      } else {
        const deals = await Deal.find().populate('company').populate('contact')
          .limit(ITEM_PER_PAGE)
          .skip(ITEM_PER_PAGE * (page - 1));

        const totalDeals = (await Deal.find()).length / ITEM_PER_PAGE;
        

        return new NextResponse(
          JSON.stringify({
            deals: deals,
            totalDeals: totalDeals,
          }),
          { status: 200 }
        );
      }
    } catch (error) {
      throw new Error(error);
    }
  };
  
  // create new deal
export const POST = async (req) => {
  const { contact, amount } = await req.json();
  console.log(contact, amount);

  if (!contact || !amount) {
    return new NextResponse(JSON.stringify(
      { message: "required fields not filled" },
      { status: 400 }
    ));
  }

  try {
    await connectDB();
    //check for company of contact
    const contactData = await Contact.findById(contact)
    console.log("contactData", contactData)

    if(!contactData){
      return new NextResponse(JSON.stringify(
        { message: "contact does not exist"}),
        { status: 404 }
      );
    }

    const company = contactData.company
    console.log("company", company)

  
    const newDeal = new Deal({ company :  new mongoose.Types.ObjectId(company), contact:  new mongoose.Types.ObjectId(contact), amount, date : Date.now()  });
    newDeal.save();
    console.log("new deal", newDeal)

    if (newDeal){
      return new NextResponse(JSON.stringify(
        { message: "successfully created DEal", newDeal: newDeal }),
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
