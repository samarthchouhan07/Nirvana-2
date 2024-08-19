import { getCurrentUser } from "./currentUser";
import { NextResponse } from "next/server";

const isAdminUser = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.isAdmin)
      return NextResponse.json(
        {
          message: "You are not an admin!",
        },
        {
          status: 403,
        }
      );
  } catch (error: any) {
    console.log(error);
  }
};

export default isAdminUser;