var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import db from "@/lib/db";
import isAdminUser from "@/lib/isAdminUser";
import { NextResponse } from "next/server";
export function GET(req) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield isAdminUser();
            const getAllReservations = yield db.reservation.findMany({
                include: {
                    listing: true,
                    user: true
                }
            });
            const allReservationsTotalPrice = getAllReservations.map((reservation) => {
                console.log(reservation);
                return Object.assign(Object.assign({}, reservation), { totalPrice: reservation.daysDifference * reservation.listing.pricePerNight });
            });
            return NextResponse.json(allReservationsTotalPrice);
        }
        catch (error) {
            return NextResponse.json({
                error: error,
            });
        }
    });
}
