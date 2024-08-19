import db from "@/lib/db";
import isAdminUser from "@/lib/isAdminUser";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await isAdminUser();
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
    console.log(error);
    return NextResponse.json({
      error: error,
    });
  }
}
