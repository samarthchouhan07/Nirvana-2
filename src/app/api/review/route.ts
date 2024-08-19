import db from "@/lib/db";
import { getCurrentUser } from "@/lib/currentUser";
import { NextResponse, NextRequest } from "next/server";
import { tr } from "date-fns/locale";

export async function POST(req: NextRequest) {
  try {
    console.log("got hit ?")
    const { text, stars } = await req.json();
    console.log(text,stars)
    const currentUser = await getCurrentUser();

    console.log(currentUser)
    if (!currentUser || !currentUser.id) {
      throw new Error("user not found")
    }

    const { id: userId } = currentUser;
    console.log(userId)
    const { searchParams } = new URL(req.url);
    
    const listingId = searchParams.get("id");
    console.log(listingId)
    if (!listingId) {
      throw new Error("listing id not found")
    }
    const createdReview = await db.review.create({
      data: {
        text,
        stars,
        listingId,
        userId,
      },
      include: {
        user: true,
      },
    });
    console.log(createdReview)
    return NextResponse.json(createdReview, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({
      error: error,
    });
  }
}
