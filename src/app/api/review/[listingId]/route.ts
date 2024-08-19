import db from "@/lib/db";
import { NextResponse,NextRequest } from "next/server";

export async function GET(req:NextRequest,ctx:any){
    try {
        console.log(ctx.params)
        const {listingId}=ctx.params
        const listing=await db.listing.findUnique({
            where:{
                id:listingId
            },
            include:{
                reviews:true
            }
        })
        console.log(listing)
        const reviewIds=listing?.reviews.map(({id})=>id)
        console.log(reviewIds)
        const reviews=await db.review.findMany({
            where:{
                id: {
                    in: reviewIds 
                }
            },
            include:{
                user:true
            },
            orderBy:{
                createdAt:"desc"
            }
        })
        return NextResponse.json(reviews,{status:200})
    } catch (error:any) {
        console.log("got error in the review/[listingId] ")
        return NextResponse.json({
            error:error
        })
    }
}