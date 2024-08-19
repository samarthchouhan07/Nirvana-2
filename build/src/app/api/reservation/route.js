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
import { getCurrentUser } from "@/lib/currentUser";
import { NextResponse } from "next/server";
import { getDatesInRange } from "@/lib/dateToMilliseconds";
export function GET(req) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const currentUser = yield getCurrentUser();
            console.log(currentUser);
            if (currentUser === null || currentUser === void 0 ? void 0 : currentUser.isAdmin) {
                console.log("if block got hit ");
                try {
                    const allReservations = yield db.reservation.findMany({
                        include: {
                            listing: true
                        },
                    });
                    console.log('All Reservations:', allReservations);
                    return NextResponse.json(allReservations);
                }
                catch (queryError) {
                    console.error('Query failed:', queryError);
                }
            }
            else {
                console.log("else block got hit ");
                const userReservations = yield db.reservation.findMany({
                    where: {
                        userId: currentUser === null || currentUser === void 0 ? void 0 : currentUser.id,
                    },
                    include: {
                        listing: true,
                    },
                });
                console.log(userReservations);
                return NextResponse.json(userReservations);
            }
        }
        catch (error) {
            return NextResponse.json({
                error: error,
            });
        }
    });
}
export function POST(req) {
    return __awaiter(this, void 0, void 0, function* () {
        function generateChargeId() {
            return `charge_${Math.random().toString(36).substring(2, 15)}`;
        }
        try {
            const currentUser = yield getCurrentUser();
            if (!currentUser || !currentUser.id) {
                return NextResponse.json({
                    error: "User not found or not authenticated",
                });
            }
            const body = yield req.json();
            const { startDate, endDate, listingId, daysDifference } = body;
            const listing = yield db.listing.findUnique({
                where: {
                    id: listingId,
                },
                include: {
                    reservations: true,
                },
            });
            const allBookedDates = listing === null || listing === void 0 ? void 0 : listing.reservations.flatMap((reservation) => {
                const reservedDates = reservation.reservedDates;
                return reservedDates;
            });
            const getDates = getDatesInRange(startDate, endDate);
            const isUnavailable = allBookedDates && allBookedDates.some((date) => getDates.includes(date));
            if (isUnavailable) {
                return NextResponse.json({
                    message: "You are trying to reserve a booked date!",
                });
            }
            const chargeId = generateChargeId();
            const newReservation = yield db.reservation.create({
                data: {
                    startDate,
                    endDate,
                    listingId: listingId,
                    daysDifference,
                    reservedDates: getDates,
                    userId: currentUser === null || currentUser === void 0 ? void 0 : currentUser.id,
                    chargeId,
                },
            });
            return NextResponse.json(newReservation);
        }
        catch (error) {
            return NextResponse.json({
                error: error,
            });
        }
    });
}
