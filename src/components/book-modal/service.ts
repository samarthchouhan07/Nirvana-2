import AXIOS_API from "@/utils/axiosApi";

export const redirectToPaymentLink = async (
  listing: any,
  startDate: Date,
  endDate: Date,
  daysDifference: Number|undefined
) => {
  try {
    console.log(listing,startDate,endDate,daysDifference)
    const {
      data: { checkoutUrl },
    } = await AXIOS_API.post("/square", {
      listing,
      startDate,
      endDate,
      daysDifference,
    });
    console.log(checkoutUrl);
    window.location.href = checkoutUrl;
  } catch (error: any) {
    console.error("Error redirecting to payment link:", error);
  }
};
