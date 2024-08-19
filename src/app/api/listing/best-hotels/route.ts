import { calcAndSortListings } from "@/lib/calcAndSortListing";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    try {
        const listings=await db.listing.findMany({
            include:{
                reviews:true
            }
        })
        console.log(listings)
        const sortedListings=calcAndSortListings(listings).slice(0,4)
        console.log(sortedListings)
        return NextResponse.json(sortedListings)
    } catch (error:any) {
        return NextResponse.json({
            error:error
        })
    }
}