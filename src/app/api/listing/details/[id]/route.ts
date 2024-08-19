import { calcAndSortListings } from "@/lib/calcAndSortListing";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, ctx: any) {
  try {
    console.log(ctx.params)
    const id = ctx.params.id;
    console.log(id)
    const listing = await db.listing.findUnique({
      where: {
        id,
      },
      include: {
        reviews: true,
        reservations: true,
      },
    });
    console.log(listing)
    if (!listing) {
      console.log(listing)
      throw new Error("listing error in route.ts /details/id");
    }
    const avgRating =
      listing?.reviews.reduce((a: any, b: any) => {
        return a + b.stars;
      }, 0) / listing?.reviews.length;
      console.log(avgRating)
    return NextResponse.json({
      ...listing,
      avgRating: avgRating ? Number(avgRating.toFixed(2)) : 0,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error,
    });
  }
}
