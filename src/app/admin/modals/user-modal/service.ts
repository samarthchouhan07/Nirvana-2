import AXIOS_API from "@/utils/axiosApi";

export async function getUserById(userId:string){
    const {data} = await AXIOS_API.get(`/admin/user/${userId}`)
    return data
}

export async function updateUser({userId,data:data1}:any){
    const {data} = await AXIOS_API.put(`/admin/user/${userId}`,data1)
    return data
}