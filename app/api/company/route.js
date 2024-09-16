import connectDB from "@/lib/db";
import { Company, Contact, Deal } from "@/lib/models";
import { NextResponse } from "next/server";


//1. get companies
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
      const companies = await Company.find({ name: { $regex: regex } })
        .limit(ITEM_PER_PAGE)
        .skip(ITEM_PER_PAGE * (page - 1));
      const totalCompanies =
        (await Company.find({ name: { $regex: regex } })).length /
        ITEM_PER_PAGE;
        const contacts = await Contact.find()
        const deals = await Deal.find()
      return new NextResponse(
        JSON.stringify({
          companies: companies,
          contacts: contacts,
          deals: deals,
          totalCompanies: totalCompanies,
        }),
        { status: 200 }
      );
    } else {
      const companies = await Company.find()
        .limit(ITEM_PER_PAGE)
        .skip(ITEM_PER_PAGE * (page - 1));
      const totalCompanies = (await Company.find()).length / ITEM_PER_PAGE;
      const deals = await Deal.find()
      const contacts = await Contact.find()
      return new NextResponse(
        JSON.stringify({
          companies: companies,
          contacts: contacts,
          deals: deals,
          totalCompanies: totalCompanies,
        }),
        { status: 200 }
      );
    }
  } catch (error) {
    throw new Error(error);
  }
};


//2. create company
export const POST = async (req) => {
  const {name} =  await req.json()
  if (name){
    try {
        await connectDB()
        const newCompany =  await new Company({ name: name})
        await newCompany.save();
        return new NextResponse(JSON.stringify({message: " company successfully created ", company: newCompany}), {status: 200})
        
    } catch (error) {
      return new NextResponse(JSON.stringify({message: " Error creating company "}), {status: 400})
        
    }
  }else{
    return new NextResponse(JSON.stringify({message: " no name provided "}), {status: 400})
  }

};
