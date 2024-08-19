import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log(body)
    const { email, username, password } = body;
   console.log(email, username, password)
    const isExisting = await db.user.findUnique({
        where:{
            email
        }
    })
    console.log(isExisting)
    if(isExisting){
        return NextResponse.json({
            message:"You already registered",
            status:409
        })
    }
    const hashedPassword= await bcryptjs.hash(password,10)
    console.log(hashedPassword)
    await db.user.create({
        data:{
            email,username,password:hashedPassword
        }
    })
    return NextResponse.json({message:"User has registered successfully"},{status:201})
  } catch (error: any) {
    return NextResponse.json(
      { message: "An error occurred in register route", error: error.message },
      { status: 500 }
    );
  }
}