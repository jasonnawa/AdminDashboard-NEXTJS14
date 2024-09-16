import connectDB from "@/lib/db";
import { Company, Contact, Deal } from "@/lib/models";
import { NextResponse } from "next/server";

//3.  Get specific company
export const GET = async (req, { params }) => {
  //extract id from dynamic route
  const { id } = params;

  if (id) {
    try {
      await connectDB();
      const company = await Company.findById(id);
      const deal = await Deal.find({company : id}).sort({amount: -1}).populate("contact").limit(5)
      const contact = await Contact.find({company: id})
      console.log(deal)
      console.log(contact)
      return new NextResponse(JSON.stringify({ company: company, deals: deal, contacts : contact }), {
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
    const { name } = await req.json()
  
    if (id) {
      try {
        await connectDB();
        const updatedCompany = await Company.findByIdAndUpdate(
          id,
          {$set: {name : name}},
          {new : true}
        );
        return new NextResponse(JSON.stringify({ message: "updated successfully" , company: updatedCompany}), {
          status: 200,
        });
      } catch (error) {
        return new Error(error);
      }
    } else {
      return new NextResponse(JSON.stringify({ message: "could not update company" }), {
        status: 401,
      });
    }
}

//5. Delete company
export const DELETE = async (req, { params }) => {
    //extract id from dynamic route
    const { id } = params;
  
    if (id) {
      try {
        await connectDB();
        const company = await Company.findByIdAndDelete(id);
        return new NextResponse(JSON.stringify({ message: "deleted successfully" }), {
          status: 200,
        });
      } catch (error) {
        return new Error(error);
      }
    } else {
      return new NextResponse(JSON.stringify({ message: "could not delete company" }), {
        status: 401,
      });
    }
  };
