import connectDB from "@/lib/db";
import { Company, Contact,Deal } from "@/lib/models";
import { NextResponse } from "next/server";





//3.  Get specific deal
export const GET = async (req, { params }) => {
  //extract id from dynamic route
  const { id } = params;

  if (id) {
    try {
      await connectDB();
      const deal = await Deal.findById(id).populate("contact").populate("company");
      const allContacts = await Contact.find().populate("company")
      return new NextResponse(JSON.stringify({ deal: deal, allContacts: allContacts }), {
        status: 200,
      });
    } catch (error) {
      return new Error(error);
    }
  } else {
    return new NextResponse(JSON.stringify({ message: "invalid ID" }), {
      status: 400,
    });
  }
};

//4. Update deal
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

      const updatedDeal = await Deal.findByIdAndUpdate(
        id,
        {$set: updates},
        {new : true}
      ); 

      if(!updatedDeal){
        return new NextResponse.json({error: "deal not found"}, { status: 404})
      }
      console.log("updated deal",updatedDeal)
      
      return new NextResponse(JSON.stringify({ message: "contact updated successfully", updatedDeal: updatedDeal}), {
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
        const deal = await Deal.findByIdAndDelete(id);
        return new NextResponse(JSON.stringify({ message: "deal deleted successfully" }), {
          status: 200,
        });
      } catch (error) {
        return new Error(error);
      }
    } else {
      return new NextResponse(JSON.stringify({ message: "could not delete deal" }), {
        status: 400,
      });
    }
  };
  