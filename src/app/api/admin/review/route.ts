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
        const reviews=await db.review.findMany({})
        return NextResponse.json(reviews)
    } catch (error:any) {
        if (isDynamicServerError(error)){
            throw error
          }
        console.error(error);
        return NextResponse.error()
    }
}