import db from "@/lib/db";
import isAdminUser from "@/lib/isAdminUser";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
  try {
     const listings=await db.listing.findMany({
      take:10
     })
     return NextResponse.json(listings)
  } catch (error:any) {
     return NextResponse.json({
      error:error
     })
  }
}

export async function POST(req: NextRequest) {
  try {
    await isAdminUser();
    const body = await req.json();
    console.log(body);
    Object.values(body).forEach((v) => {
      if (v === "") {
        return NextResponse.json({
          message: "Fill all fields",
        });
      }
    });
    const {
      name,
      location,
      desc,
      type,
      pricePerNight,
      beds,
      hasFreeWifi,
      imageUrls,
    } = body;
    const newListing = await db.listing.create({
      data: {
        name,
        location,
        desc,
        type,
        pricePerNight,
        beds,
        hasFreeWifi,
        imageUrls,
      },
    });

    return NextResponse.json(newListing);
  } catch (error: any) {
    return NextResponse.json({
      error: error,
    });
  }
}
