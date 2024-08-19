import db from "@/lib/db";
import isAdminUser from "@/lib/isAdminUser";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await isAdminUser();
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
    return NextResponse.json({
      error: error,
    });
  }
}