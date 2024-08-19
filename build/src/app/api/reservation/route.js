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
import db from "@/lib/db";
import { getCurrentUser } from "@/lib/currentUser";
import { NextResponse } from "next/server";
import { getDatesInRange } from "@/lib/dateToMilliseconds";
export function GET(req) {
    return __awaiter(this, void 0, void 0, function () {
        var currentUser, allReservations, queryError_1, userReservations, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 9, , 10]);
                    return [4 /*yield*/, getCurrentUser()];
                case 1:
                    currentUser = _a.sent();
                    console.log(currentUser);
                    if (!(currentUser === null || currentUser === void 0 ? void 0 : currentUser.isAdmin)) return [3 /*break*/, 6];
                    console.log("if block got hit ");
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, db.reservation.findMany({
                            include: {
                                listing: true
                            },
                        })];
                case 3:
                    allReservations = _a.sent();
                    console.log('All Reservations:', allReservations);
                    return [2 /*return*/, NextResponse.json(allReservations)];
                case 4:
                    queryError_1 = _a.sent();
                    console.error('Query failed:', queryError_1);
                    return [3 /*break*/, 5];
                case 5: return [3 /*break*/, 8];
                case 6:
                    console.log("else block got hit ");
                    return [4 /*yield*/, db.reservation.findMany({
                            where: {
                                userId: currentUser === null || currentUser === void 0 ? void 0 : currentUser.id,
                            },
                            include: {
                                listing: true,
                            },
                        })];
                case 7:
                    userReservations = _a.sent();
                    console.log(userReservations);
                    return [2 /*return*/, NextResponse.json(userReservations)];
                case 8: return [3 /*break*/, 10];
                case 9:
                    error_1 = _a.sent();
                    return [2 /*return*/, NextResponse.json({
                            error: error_1,
                        })];
                case 10: return [2 /*return*/];
            }
        });
    });
}
export function POST(req) {
    return __awaiter(this, void 0, void 0, function () {
        function generateChargeId() {
            return "charge_".concat(Math.random().toString(36).substring(2, 15));
        }
        var currentUser, body, startDate, endDate, listingId, daysDifference, listing, allBookedDates, getDates_1, isUnavailable, chargeId, newReservation, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, getCurrentUser()];
                case 1:
                    currentUser = _a.sent();
                    if (!currentUser || !currentUser.id) {
                        return [2 /*return*/, NextResponse.json({
                                error: "User not found or not authenticated",
                            })];
                    }
                    return [4 /*yield*/, req.json()];
                case 2:
                    body = _a.sent();
                    startDate = body.startDate, endDate = body.endDate, listingId = body.listingId, daysDifference = body.daysDifference;
                    return [4 /*yield*/, db.listing.findUnique({
                            where: {
                                id: listingId,
                            },
                            include: {
                                reservations: true,
                            },
                        })];
                case 3:
                    listing = _a.sent();
                    allBookedDates = listing === null || listing === void 0 ? void 0 : listing.reservations.flatMap(function (reservation) {
                        var reservedDates = reservation.reservedDates;
                        return reservedDates;
                    });
                    getDates_1 = getDatesInRange(startDate, endDate);
                    isUnavailable = allBookedDates && allBookedDates.some(function (date) { return getDates_1.includes(date); });
                    if (isUnavailable) {
                        return [2 /*return*/, NextResponse.json({
                                message: "You are trying to reserve a booked date!",
                            })];
                    }
                    chargeId = generateChargeId();
                    return [4 /*yield*/, db.reservation.create({
                            data: {
                                startDate: startDate,
                                endDate: endDate,
                                listingId: listingId,
                                daysDifference: daysDifference,
                                reservedDates: getDates_1,
                                userId: currentUser === null || currentUser === void 0 ? void 0 : currentUser.id,
                                chargeId: chargeId,
                            },
                        })];
                case 4:
                    newReservation = _a.sent();
                    return [2 /*return*/, NextResponse.json(newReservation)];
                case 5:
                    error_2 = _a.sent();
                    return [2 /*return*/, NextResponse.json({
                            error: error_2,
                        })];
                case 6: return [2 /*return*/];
            }
        });
    });
}
