import db from "./db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Session } from "next-auth";

export async function getSession(): Promise<Session | null> {
    const session = await getServerSession(authOptions) as Session | null; 
    console.log("Session in getSession:", session); 
    return session;
}


export async function getCurrentUser(){
  try {
     const session=await getSession();
     console.log(session)
     if(!session?.user?.email){
        return null
     }
     const user=await db.user.findUnique({
        where:{
            email:session.user.email
        }
     })
     console.log(user)
     if(!user){
        return null
     }
     const {password,...currentUser}=user
     console.log(currentUser)
     return currentUser
  } catch (error:any) {
    console.log(error)
    return null
  }
}