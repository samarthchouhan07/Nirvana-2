import db from "@/lib/db";
import isAdminUser from "@/lib/isAdminUser";
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";
import { NextRequest, NextResponse } from "next/server";

export const runtime = 'nodejs'



export async function GET(req: NextRequest) {
  try {
    const adminResponse = await isAdminUser();
    if (adminResponse.status === 403) {
      return adminResponse; 
    }
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
    if (isDynamicServerError(error)){
      throw error
    }
    return NextResponse.json({
      error: error,
    });
  }
}
