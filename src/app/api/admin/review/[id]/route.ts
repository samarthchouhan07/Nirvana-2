import db from "@/lib/db";
import isAdminUser from "@/lib/isAdminUser";
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";
import { NextRequest, NextResponse } from "next/server";

export const runtime = 'nodejs'


export async function DELETE(req: NextRequest, ctx: any) {
  try {
    const adminResponse = await isAdminUser();
    if (adminResponse.status === 403) {
      return adminResponse; 
    }
    const { id } = ctx.params;
    const review = await db.review.delete({
      where: {
        id,
      },
    });
    if (review) {
      return NextResponse.json({ message: "Successfully deleted the review" });
    } else {
      return NextResponse.json({
        message: `Review with the id of ${id} doesnt exist`,
      });
    }
  } catch (error: any) {
    if (isDynamicServerError(error)){
      throw error
    }
    return NextResponse.error();
  }
}
