import { getCurrentUser } from "@/lib/currentUser";
import { NextRequest, NextResponse} from "next/server"
import { Client, Environment, ApiError } from "square";
import { randomUUID } from 'crypto';
import db from "@/lib/db";
import { getDatesInRange } from "@/lib/dateToMilliseconds";

const squareAccessToken = process.env.SQUARE_ACCESS_TOKEN;
if (!squareAccessToken) {
  throw new Error("Square access token not found");
}

const squareClient = new Client({
  accessToken: squareAccessToken,
  environment: Environment.Sandbox,
});

export async function POST(req: NextRequest) {
  try {
    const {
      listing: { name, pricePerNight, id: listingId },
      startDate,
      endDate,
      daysDifference
    } = await req.json();

    const currentUser = await getCurrentUser();

    const requestBody = {
      idempotencyKey: randomUUID(),
      order: {
        locationId: process.env.SQUARE_LOCATION_ID as string,
        lineItems: [
          {
            name,
            quantity: daysDifference.toString(),
            basePriceMoney: {
              amount: BigInt(pricePerNight * 100),
              currency: "USD",
            },
          },
        ],
      },
      checkoutOptions: {
        redirectUrl: "https://nirvana-2.vercel.app/success-page",
      },
      metadata: {
        startDate,
        endDate,
        listingId,
        pricePerNight,
        daysDifference,
        userId: currentUser?.id ?? undefined, 
        email: currentUser?.email,
      },
    };

    const { result } = await squareClient.checkoutApi.createPaymentLink(requestBody);

    if (result.paymentLink?.url) {
      const reservedDates = getDatesInRange(startDate, endDate);

      const reservationData: any = {
        listingId,
        startDate,
        endDate,
        chargeId: result.paymentLink.id ?? undefined,
        reservedDates,
        daysDifference: Number(daysDifference),
      };
      
      if (currentUser?.id) {
        reservationData.userId = currentUser.id;
      }
      
      const newReservation = await db.reservation.create({
        data: reservationData,
      });
      

      return NextResponse.json({ checkoutUrl: result.paymentLink.url, reservation: newReservation });
    } else {
      return NextResponse.json({ error: "Payment link creation failed" }, { status: 500 });
    }
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(error.errors);
    } else {
      console.error(error);
    }
    return NextResponse.error();
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const reservationId = searchParams.get("reservation_id");

    if (!reservationId) {
      throw new Error("Reservation ID not found");
    }

    await db.reservation.delete({
      where: {
        id: reservationId,
      },
    });

    return NextResponse.json({ message: "Successfully cancelled the reservation, but there is no refund policy." });
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(error.errors);
    } else {
      console.error(error);
    }
    return NextResponse.error();
  }
}
