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
export function getAllListings() {
    return __awaiter(this, void 0, void 0, function* () {
        const { data } = yield AXIOS_API.get(`/admin/listing/get-all-listings`);
        return data;
    });
}
export function getAllReservations() {
    return __awaiter(this, void 0, void 0, function* () {
        const { data } = yield AXIOS_API.get(`/admin/reservation/get-all-reservations`);
        return data;
    });
}
export function getAllRevenue() {
    return __awaiter(this, void 0, void 0, function* () {
        const { data } = yield AXIOS_API.get(`/admin/reservation/get-all-revenue`);
        return data;
    });
}
export function getAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const { data } = yield AXIOS_API.get(`/admin/user/get-all-users`);
        console.log(data);
        return data;
    });
}
export function deleteReview(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data } = yield AXIOS_API.delete(`/admin/review/${id}`);
        return data;
    });
}
