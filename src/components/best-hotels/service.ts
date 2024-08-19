import AXIOS_API from "@/utils/axiosApi";

export async function getBestHotels() {
  const { data } = await AXIOS_API.get(`/listing/best-hotels`);
  console.log(data)
  if (data) {
    const blurredImages = await Promise.all(
      data.map((listing: any) =>
        AXIOS_API.get(`/base64?url=${listing.imageUrls[0]}`)
      )
    );
    const bestHotels=blurredImages.map((img:any,idx:any)=>{
        const blurredImage=img.data
        const currentHotel=data[idx]
        return {...currentHotel,blurredImage}
    })
    return bestHotels
  }
}
