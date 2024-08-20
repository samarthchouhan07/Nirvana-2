import db from "@/lib/db";
import isAdminUser from "@/lib/isAdminUser";
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";
import { NextResponse,NextRequest } from "next/server";

export const runtime = 'nodejs'

  

export async function GET(req:NextRequest,ctx:any){
    try {
        const adminResponse = await isAdminUser();
    if (adminResponse.status === 403) {
      return adminResponse; 
    }
        const {id}=ctx.params
        const user= await db.user.findUnique({
            where:{
                id
            }
        })
        return NextResponse.json(user)
    } catch (error:any) {
        if (isDynamicServerError(error)){
            throw error
          }
        console.log(error)
        return NextResponse.error()
    }
}

export async function PUT(req:NextRequest,ctx:any) {
    try {
        const adminResponse = await isAdminUser();
    if (adminResponse.status === 403) {
      return adminResponse; 
    }
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
        if (isDynamicServerError(error)){
            throw error
          }
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
        if (isDynamicServerError(error)){
            throw error
          }
        return NextResponse.error()
    }
}