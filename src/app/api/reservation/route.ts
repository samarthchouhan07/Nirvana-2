import db from "@/lib/db";
import { getCurrentUser } from "@/lib/currentUser";
import { NextResponse, NextRequest } from "next/server";
import { getDatesInRange } from "@/lib/dateToMilliseconds";

export async function GET(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    console.log(currentUser)
    if (currentUser?.isAdmin) {
      console.log("if block got hit ")
      try {
        const allReservations = await db.reservation.findMany({
          include: {
            listing:true
          },
        });
        
        console.log('All Reservations:', allReservations);
        return NextResponse.json(allReservations);
      } catch (queryError) {
        console.error('Query failed:', queryError);
      }
  }  else {
      console.log("else block got hit ")

      const userReservations = await db.reservation.findMany({
        where: {
          userId: currentUser?.id,
        },
        include: {
          listing: true,
        },
      });
      console.log(userReservations)
      return NextResponse.json(userReservations);
    }
  } catch (error: any) {
    return NextResponse.json({
      error: error,
    });
  }
}

export async function POST(req: NextRequest) {
  function generateChargeId() {
    return `charge_${Math.random().toString(36).substring(2, 15)}`;
  }
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || !currentUser.id) {
      return NextResponse.json({
        error: "User not found or not authenticated",
      });
    }
    const body = await req.json();
    const { startDate, endDate, listingId, daysDifference } = body;
    const listing = await db.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        reservations: true,
      },
    });
    const allBookedDates = listing?.reservations.flatMap((reservation: any) => {
      const reservedDates = reservation.reservedDates;
      return reservedDates;
    });
    const getDates = getDatesInRange(startDate, endDate);
    const isUnavailable =
      allBookedDates && allBookedDates.some((date) => getDates.includes(date));
    if (isUnavailable) {
      return NextResponse.json({
        message: "You are trying to reserve a booked date!",
      });
    }
    const chargeId = generateChargeId();
    const newReservation = await db.reservation.create({
      data: {
        startDate,
        endDate,
        listingId: listingId,
        daysDifference,
        reservedDates: getDates,
        userId: currentUser?.id,
        chargeId,
      },
    });
    return NextResponse.json(newReservation);
  } catch (error: any) {
    return NextResponse.json({
      error: error,
    });
  }
}
