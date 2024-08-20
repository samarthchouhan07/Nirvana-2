import db from "@/lib/db";
import isAdminUser from "@/lib/isAdminUser";
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";
import { NextRequest, NextResponse } from "next/server";

export const runtime = 'nodejs'



export async function GET(req: NextRequest) {
  try {
    const adminResponse = await isAdminUser();
    if (adminResponse.status === 403) {
      return adminResponse; 
    }
    const allUsers = await db.user.findMany({
      include: {
        reservations: true,
      },
    });
    return NextResponse.json(allUsers);
  } catch (error: any) {
    if (isDynamicServerError(error)){
      throw error
    }
    console.log(error);
    return NextResponse.json({
      error: error,
    });
  }
}
