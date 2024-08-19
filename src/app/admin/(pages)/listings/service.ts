import AXIOS_API from "@/utils/axiosApi";

interface ListingUpdateBody {
  name: string;
  desc: string;
  beds: number;
  hasFreeWifi: boolean;
  type: string;
  location: string;
  pricePerNight: number;
  imageUrls: string[];
}

interface UpdateListingParams {
  listingId: string;
  body: ListingUpdateBody;
}


export async function deleteListing(id: string) {
  const { data } = await AXIOS_API.delete(`/admin/listing/${id}`);
  return data;
}

export async function updateListing({listingId,body}:UpdateListingParams){
  console.log(listingId,body)
  const {data:updatedListing}=await AXIOS_API.put(`/admin/listing/${listingId}`,body)
  return updatedListing
}