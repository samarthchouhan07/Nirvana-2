import AXIOS_API from "@/utils/axiosApi";

export async function getAllReviews(){
    const {data} = await AXIOS_API.get(`/admin/review`)
    return data
}