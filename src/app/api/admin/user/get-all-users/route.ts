import db from "@/lib/db";
import isAdminUser from "@/lib/isAdminUser";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await isAdminUser();
    const allUsers = await db.user.findMany({
      include: {
        reservations: true,
      },
    });
    return NextResponse.json(allUsers);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({
      error: error,
    });
  }
}
