import { calcAndSortListings } from "@/lib/calcAndSortListing";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const location = searchParams.get("location");
    const min_price = searchParams.get("min_price");
    const max_price = searchParams.get("max_price");
    const type = searchParams.get("type");

    const minPriceNumber = min_price ? Number(min_price) : undefined;
    const maxPriceNumber = max_price ? Number(max_price) : undefined;
    const locationFilter = location ? location : undefined;
    const typeFilter = type ? type : undefined;


    console.log(minPriceNumber,maxPriceNumber,locationFilter,typeFilter)

    console.log(db.listing)
    const listings = await db.listing.findMany({
      where: {
        pricePerNight: {
          gte: minPriceNumber,
          lte: maxPriceNumber,
        },
        location: locationFilter,
        type: typeFilter,
      },
      include:{
        reviews:true
      }
    });
    console.log(listings)
    const sortedListings = calcAndSortListings(listings);
    console.log(sortedListings)
    return NextResponse.json(sortedListings);
  } catch (error: any) {
    return NextResponse.json({
      error: error,
    });
  }
}
