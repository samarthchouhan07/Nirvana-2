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
    const allReservations = await db.reservation.findMany({
      include: {
        listing: true,
      },
    });
    if (allReservations.length === 0) return NextResponse.json(0);
    const allReservationsPrices = allReservations.map((reservation: any) => {
      return reservation.daysDifference * reservation.listing.pricePerNight;
    });
    const totalRevenue = allReservationsPrices.reduce((a: any, b: any) => a + b);
    return NextResponse.json(totalRevenue);
  } catch (error: any) {
    if (isDynamicServerError(error)){
      throw error
    }
    console.log(error);
    return NextResponse.json({
      error: error,
    });
  }
}
