import db from "@/lib/db";
import isAdminUser from "@/lib/isAdminUser";
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";
import { NextRequest, NextResponse } from "next/server";

export const runtime = 'nodejs'

  

export async function GET(req:NextRequest){
    try {
        const adminResponse = await isAdminUser();
    if (adminResponse.status === 403) {
      return adminResponse; 
    }
        const allListings=await db.listing.findMany({})
        return NextResponse.json(allListings)
    } catch (error:any) {
        if (isDynamicServerError(error)){
            throw error
          }
        console.error(error); 
        return NextResponse.json({
            error:error
        })
    }
}