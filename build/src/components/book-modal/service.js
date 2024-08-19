var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import AXIOS_API from "@/utils/axiosApi";
export const redirectToPaymentLink = (listing, startDate, endDate, daysDifference) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(listing, startDate, endDate, daysDifference);
        const { data: { checkoutUrl }, } = yield AXIOS_API.post("/square", {
            listing,
            startDate,
            endDate,
            daysDifference,
        });
        console.log(checkoutUrl);
        window.location.href = checkoutUrl;
    }
    catch (error) {
        console.error("Error redirecting to payment link:", error);
    }
});
