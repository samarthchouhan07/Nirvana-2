import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";
import { getCurrentUser } from "./currentUser";
import { NextRequest, NextResponse } from "next/server";

export const runtime = 'nodejs'

const isAdminUser = async (): Promise<NextResponse> => {
  const currentUser = await getCurrentUser();
  try {
    if (!currentUser?.isAdmin) {
      return NextResponse.json(
        { message: "You are not an admin!" },
        { status: 403 }
      );
    }
    return NextResponse.next(); 
  } catch (error) {
    if (isDynamicServerError(error)){
      throw error
    }
    console.error("Error checking admin status:", error);
    return NextResponse.json(
      { message: "Error checking admin status" },
      { status: 500 }
    );
  }
};

export default isAdminUser;
