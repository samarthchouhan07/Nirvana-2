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
export function getListingById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(id);
        const { data } = yield AXIOS_API.get(`/listing/details/${id}`);
        console.log(data);
        if (data) {
            const { data: base64 } = yield AXIOS_API.get(`/base64?url=${data.imageUrls[0]}`);
            data.blurredImage = base64;
        }
        return data;
    });
}
export function postReview(id, body) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data } = yield AXIOS_API.post(`/review?id=${id}`, body);
        console.log(data);
        return data;
    });
}
export function getReviewsByListing(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data } = yield AXIOS_API.get(`/review/${id}`);
        return data;
    });
}
