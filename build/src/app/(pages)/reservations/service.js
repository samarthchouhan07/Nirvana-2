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
export function getUserReservations() {
    return __awaiter(this, void 0, void 0, function* () {
        const { data } = yield AXIOS_API.get(`/reservation`);
        return data;
    });
}
export function deleteReservation(_a) {
    return __awaiter(this, arguments, void 0, function* ({ chargeId, reservationId, }) {
        try {
            const { data: refundData } = yield refundPayment({ chargeId, reservationId });
            const { data } = yield AXIOS_API.delete(`/reservation/${reservationId}`);
            return { data };
        }
        catch (error) {
            throw new Error("Couldn't delete the reservation");
        }
    });
}
function refundPayment(_a) {
    return __awaiter(this, arguments, void 0, function* ({ chargeId, reservationId }) {
        try {
            const { data } = yield AXIOS_API.delete(`/square?chargeId=${chargeId}&reservation_id=${reservationId}`);
            return { data };
        }
        catch (error) {
            throw new Error("Couldn't refund the payment");
        }
    });
}
