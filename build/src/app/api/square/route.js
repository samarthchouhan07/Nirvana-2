var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getCurrentUser } from "@/lib/currentUser";
import { NextResponse } from "next/server";
import { Client, Environment, ApiError } from "square";
import { randomUUID } from 'crypto';
import db from "@/lib/db";
import { getDatesInRange } from "@/lib/dateToMilliseconds";
const squareAccessToken = process.env.SQUARE_ACCESS_TOKEN;
if (!squareAccessToken) {
    throw new Error("Square access token not found");
}
const squareClient = new Client({
    accessToken: squareAccessToken,
    environment: Environment.Sandbox,
});
export function POST(req) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        try {
            const { listing: { name, pricePerNight, id: listingId }, startDate, endDate, daysDifference } = yield req.json();
            const currentUser = yield getCurrentUser();
            const requestBody = {
                idempotencyKey: randomUUID(),
                order: {
                    locationId: process.env.SQUARE_LOCATION_ID,
                    lineItems: [
                        {
                            name,
                            quantity: daysDifference.toString(),
                            basePriceMoney: {
                                amount: BigInt(pricePerNight * 100),
                                currency: "USD",
                            },
                        },
                    ],
                },
                checkoutOptions: {
                    redirectUrl: "http://localhost:3000/success-page",
                },
                metadata: {
                    startDate,
                    endDate,
                    listingId,
                    pricePerNight,
                    daysDifference,
                    userId: (_a = currentUser === null || currentUser === void 0 ? void 0 : currentUser.id) !== null && _a !== void 0 ? _a : undefined,
                    email: currentUser === null || currentUser === void 0 ? void 0 : currentUser.email,
                },
            };
            const { result } = yield squareClient.checkoutApi.createPaymentLink(requestBody);
            if ((_b = result.paymentLink) === null || _b === void 0 ? void 0 : _b.url) {
                const reservedDates = getDatesInRange(startDate, endDate);
                const reservationData = {
                    listingId,
                    startDate,
                    endDate,
                    chargeId: (_c = result.paymentLink.id) !== null && _c !== void 0 ? _c : undefined,
                    reservedDates,
                    daysDifference: Number(daysDifference),
                };
                if (currentUser === null || currentUser === void 0 ? void 0 : currentUser.id) {
                    reservationData.userId = currentUser.id;
                }
                const newReservation = yield db.reservation.create({
                    data: reservationData,
                });
                return NextResponse.json({ checkoutUrl: result.paymentLink.url, reservation: newReservation });
            }
            else {
                return NextResponse.json({ error: "Payment link creation failed" }, { status: 500 });
            }
        }
        catch (error) {
            if (error instanceof ApiError) {
                console.error(error.errors);
            }
            else {
                console.error(error);
            }
            return NextResponse.error();
        }
    });
}
export function DELETE(req) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { searchParams } = new URL(req.url);
            const reservationId = searchParams.get("reservation_id");
            if (!reservationId) {
                throw new Error("Reservation ID not found");
            }
            yield db.reservation.delete({
                where: {
                    id: reservationId,
                },
            });
            return NextResponse.json({ message: "Successfully cancelled the reservation, but there is no refund policy." });
        }
        catch (error) {
            if (error instanceof ApiError) {
                console.error(error.errors);
            }
            else {
                console.error(error);
            }
            return NextResponse.error();
        }
    });
}
