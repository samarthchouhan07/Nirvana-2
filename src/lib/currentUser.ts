import db from "./db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Session } from "next-auth";

export async function getSession(): Promise<Session | null> {
  try {
    const session = await getServerSession(authOptions) as Session | null;
    console.log("Session in getSession:", session);
    return session;
  } catch (error) {
    console.error("Error fetching session:", error);
    return null;
  }
}

export async function getCurrentUser() {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      return null;
    }
    
    const user = await db.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return null;
    }

    const { password, ...currentUser } = user;
    return currentUser;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
}
