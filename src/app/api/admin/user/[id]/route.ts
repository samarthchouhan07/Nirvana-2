import db from "@/lib/db";
import isAdminUser from "@/lib/isAdminUser";
import { NextResponse,NextRequest } from "next/server";

export async function GET(req:NextRequest,ctx:any){
    try {
        await isAdminUser()
        const {id}=ctx.params
        const user= await db.user.findUnique({
            where:{
                id
            }
        })
        return NextResponse.json(user)
    } catch (error:any) {
        console.log(error)
        return NextResponse.error()
    }
}

export async function PUT(req:NextRequest,ctx:any) {
    try {
        await isAdminUser()
        const {id}=ctx.params
        const body= await req.json()
        const updatedUser=await db.user.update({
            data:{
                ...body
            },
            where:{
                id
            }
        })
        return NextResponse.json(updatedUser)
    } catch (error:any) {
        return NextResponse.error()
    }
}

export async function DELETE(req:NextRequest,ctx:any){
    try {
        await isAdminUser()
        const {id}=ctx.params
        const deletedUser=await db.user.delete({
            where:{
                id
            }
        })
        if(deletedUser){
            return NextResponse.json({message:"user has been successfully deleted"},{status:200})
        }else{
            return NextResponse.json({message:`user with the id of ${id} doesnt exist `})
        }
    } catch (error:any) {
        return NextResponse.error()
    }
}