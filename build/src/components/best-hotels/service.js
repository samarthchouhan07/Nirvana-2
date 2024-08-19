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
export function getBestHotels() {
    return __awaiter(this, void 0, void 0, function* () {
        const { data } = yield AXIOS_API.get(`/listing/best-hotels`);
        console.log(data);
        if (data) {
            const blurredImages = yield Promise.all(data.map((listing) => AXIOS_API.get(`/base64?url=${listing.imageUrls[0]}`)));
            const bestHotels = blurredImages.map((img, idx) => {
                const blurredImage = img.data;
                const currentHotel = data[idx];
                return Object.assign(Object.assign({}, currentHotel), { blurredImage });
            });
            return bestHotels;
        }
    });
}
