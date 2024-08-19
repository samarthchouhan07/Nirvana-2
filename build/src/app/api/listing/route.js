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
            const listings = yield db.listing.findMany({
                take: 10
            });
            return NextResponse.json(listings);
        }
        catch (error) {
            return NextResponse.json({
                error: error
            });
        }
    });
}
export function POST(req) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield isAdminUser();
            const body = yield req.json();
            console.log(body);
            Object.values(body).forEach((v) => {
                if (v === "") {
                    return NextResponse.json({
                        message: "Fill all fields",
                    });
                }
            });
            const { name, location, desc, type, pricePerNight, beds, hasFreeWifi, imageUrls, } = body;
            const newListing = yield db.listing.create({
                data: {
                    name,
                    location,
                    desc,
                    type,
                    pricePerNight,
                    beds,
                    hasFreeWifi,
                    imageUrls,
                },
            });
            return NextResponse.json(newListing);
        }
        catch (error) {
            return NextResponse.json({
                error: error,
            });
        }
    });
}
