import connectDB from "@/lib/db";
import { Company, Contact, Deal } from "@/lib/models";
import { NextResponse } from "next/server";

//3.  Get specific contact
export const GET = async (req, { params }) => {
  //extract id from dynamic route
  const { id } = params;

  if (id) {
    try {
      await connectDB();
      const contact = await Contact.findById(id).populate("company");
      //getting all Companies
      const allCompanies = await Company.find()
      const deal = await Deal.find({contact : id}).sort({amount: -1}).limit(5)
      return new NextResponse(JSON.stringify({ contact: contact, deal: deal, allCompanies: allCompanies }), {
        status: 200,
      });
    } catch (error) {
      return new Error(error);
    }
  } else {
    return new NextResponse(JSON.stringify({ message: "invalid ID" }), {
      status: 401,
    });
  }
};

//4. Update company
export const PATCH = async (req, { params }) => {
  //extract id from dynamic route
  const { id } = params;
  const {updates} = await req.json()
  console.log(updates)

  if (id) {

    if(!Object.keys(updates).length){
      return new NextResponse.json({error: "No data Provided for uppdate"}, { status: 400})
    }

    try {
      await connectDB();

      const updatedContact = await Contact.findByIdAndUpdate(
        id,
        {$set: updates},
        {new : true}
      ); 

      if(!updatedContact){
        return new NextResponse.json({error: "Contact not found"}, { status: 404})
      }
      console.log("updated contact",updatedContact)
      
      return new NextResponse(JSON.stringify({ message: "contact updated successfully", updatedContact: updatedContact}), {
        status: 200,
      });
    } catch (error) {
      return new Error(error);
    }
  } else {
    return new NextResponse(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}


//5. Delete contact
export const DELETE = async (req, { params }) => {
  //extract id from dynamic route
  const { id } = params;

  if (id) {
    try {
      await connectDB();
      const contact = await Contact.findByIdAndDelete(id);
      return new NextResponse(JSON.stringify({ message: "deleted successfully" }), {
        status: 200,
      });
    } catch (error) {
      return new Error(error);
    }
  } else {
    return new NextResponse(JSON.stringify({ message: "could not delete contact" }), {
      status: 400,
    });
  }
};
