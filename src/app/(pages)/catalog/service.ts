import AXIOS_API from "@/utils/axiosApi";
import { FormSchema } from "./schema";

export async function getFilteredListings(values: FormSchema) {
  const url = `/listing/filter?location=${values.location}&min_price=${values.min_price}&max_price=${values.max_price}&type=${values.type}`;
  const { data } = await AXIOS_API.get(url);
  
  if (data) {
    const blurredImages = await Promise.all(
      data.map((listing: any) => AXIOS_API.get(`/base64?url=${listing.imageUrls[0]}`))
    );
    
    const filteredHotels = blurredImages.map((img: any, idx: number) => {
      const blurredImage = img.data;
      const currentHotel = data[idx];
      return { ...currentHotel, blurredImage };
    });

    return filteredHotels;
  }
}
