import db from "@/lib/db";
import isAdminUser from "@/lib/isAdminUser";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await isAdminUser()
    const allListings=await db.listing.findMany({
        include:{
            reservations:true
        }
    })
    const mostReservedListing=allListings.reduce((a:any,b:any)=>{
        return a?.reservations?.length >=b?.reservation?.length ? a:b
    })
    return NextResponse.json(mostReservedListing)
  } catch (error: any) {
    return NextResponse.json({
      error: error,
    });
  }
}
