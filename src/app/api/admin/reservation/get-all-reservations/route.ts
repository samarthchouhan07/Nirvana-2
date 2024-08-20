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
    const getAllReservations=await db.reservation.findMany({
        include:{
            listing:true,
            user:true
        }
    })
    
    const allReservationsTotalPrice=getAllReservations.map((reservation:any)=>{
      console.log(reservation)
        return {
            ...reservation,
            totalPrice:reservation.daysDifference* reservation.listing.pricePerNight
        }
    })
    return  NextResponse.json(allReservationsTotalPrice)
  } catch (error: any) {
    if (isDynamicServerError(error)){
      throw error
    }
    return NextResponse.json({
      error: error,
    });
  }
}