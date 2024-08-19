import { getCurrentUser } from "@/lib/currentUser";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, ctx: any) {
  try {
    const id = ctx.params.id;
    const currentUser = await getCurrentUser();
    const reservation = await db.reservation.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });
    if (reservation?.user.id !== currentUser?.id && !currentUser?.isAdmin) {
      return NextResponse.json({
        message: "user has no permissions to cancel the reservations",
      });
    }
    await db.reservation.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(
      {
        message: `Successfully deleted the reservation with id of ` + id,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json({
      error: error,
    });
  }
}
