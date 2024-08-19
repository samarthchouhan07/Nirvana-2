var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { getCurrentUser } from "@/lib/currentUser";
import { NextResponse } from "next/server";
import { Client, Environment, ApiError } from "square";
import { randomUUID } from 'crypto';
import db from "@/lib/db";
import { getDatesInRange } from "@/lib/dateToMilliseconds";
var squareAccessToken = process.env.SQUARE_ACCESS_TOKEN;
if (!squareAccessToken) {
    throw new Error("Square access token not found");
}
var squareClient = new Client({
    accessToken: squareAccessToken,
    environment: Environment.Sandbox,
});
export function POST(req) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, name_1, pricePerNight, listingId, startDate, endDate, daysDifference, currentUser, requestBody, result, reservedDates, reservationData, newReservation, error_1;
        var _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _f.trys.push([0, 7, , 8]);
                    return [4 /*yield*/, req.json()];
                case 1:
                    _a = _f.sent(), _b = _a.listing, name_1 = _b.name, pricePerNight = _b.pricePerNight, listingId = _b.id, startDate = _a.startDate, endDate = _a.endDate, daysDifference = _a.daysDifference;
                    return [4 /*yield*/, getCurrentUser()];
                case 2:
                    currentUser = _f.sent();
                    requestBody = {
                        idempotencyKey: randomUUID(),
                        order: {
                            locationId: process.env.SQUARE_LOCATION_ID,
                            lineItems: [
                                {
                                    name: name_1,
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
                            startDate: startDate,
                            endDate: endDate,
                            listingId: listingId,
                            pricePerNight: pricePerNight,
                            daysDifference: daysDifference,
                            userId: (_c = currentUser === null || currentUser === void 0 ? void 0 : currentUser.id) !== null && _c !== void 0 ? _c : undefined,
                            email: currentUser === null || currentUser === void 0 ? void 0 : currentUser.email,
                        },
                    };
                    return [4 /*yield*/, squareClient.checkoutApi.createPaymentLink(requestBody)];
                case 3:
                    result = (_f.sent()).result;
                    if (!((_d = result.paymentLink) === null || _d === void 0 ? void 0 : _d.url)) return [3 /*break*/, 5];
                    reservedDates = getDatesInRange(startDate, endDate);
                    reservationData = {
                        listingId: listingId,
                        startDate: startDate,
                        endDate: endDate,
                        chargeId: (_e = result.paymentLink.id) !== null && _e !== void 0 ? _e : undefined,
                        reservedDates: reservedDates,
                        daysDifference: Number(daysDifference),
                    };
                    if (currentUser === null || currentUser === void 0 ? void 0 : currentUser.id) {
                        reservationData.userId = currentUser.id;
                    }
                    return [4 /*yield*/, db.reservation.create({
                            data: reservationData,
                        })];
                case 4:
                    newReservation = _f.sent();
                    return [2 /*return*/, NextResponse.json({ checkoutUrl: result.paymentLink.url, reservation: newReservation })];
                case 5: return [2 /*return*/, NextResponse.json({ error: "Payment link creation failed" }, { status: 500 })];
                case 6: return [3 /*break*/, 8];
                case 7:
                    error_1 = _f.sent();
                    if (error_1 instanceof ApiError) {
                        console.error(error_1.errors);
                    }
                    else {
                        console.error(error_1);
                    }
                    return [2 /*return*/, NextResponse.error()];
                case 8: return [2 /*return*/];
            }
        });
    });
}
export function DELETE(req) {
    return __awaiter(this, void 0, void 0, function () {
        var searchParams, reservationId, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    searchParams = new URL(req.url).searchParams;
                    reservationId = searchParams.get("reservation_id");
                    if (!reservationId) {
                        throw new Error("Reservation ID not found");
                    }
                    return [4 /*yield*/, db.reservation.delete({
                            where: {
                                id: reservationId,
                            },
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/, NextResponse.json({ message: "Successfully cancelled the reservation, but there is no refund policy." })];
                case 2:
                    error_2 = _a.sent();
                    if (error_2 instanceof ApiError) {
                        console.error(error_2.errors);
                    }
                    else {
                        console.error(error_2);
                    }
                    return [2 /*return*/, NextResponse.error()];
                case 3: return [2 /*return*/];
            }
        });
    });
}
