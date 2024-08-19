var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { calcAndSortListings } from "@/lib/calcAndSortListing";
import db from "@/lib/db";
import { NextResponse } from "next/server";
export function GET(req) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { searchParams } = new URL(req.url);
            const location = searchParams.get("location");
            const min_price = searchParams.get("min_price");
            const max_price = searchParams.get("max_price");
            const type = searchParams.get("type");
            const minPriceNumber = min_price ? Number(min_price) : undefined;
            const maxPriceNumber = max_price ? Number(max_price) : undefined;
            const locationFilter = location ? location : undefined;
            const typeFilter = type ? type : undefined;
            console.log(minPriceNumber, maxPriceNumber, locationFilter, typeFilter);
            console.log(db.listing);
            const listings = yield db.listing.findMany({
                where: {
                    pricePerNight: {
                        gte: minPriceNumber,
                        lte: maxPriceNumber,
                    },
                    location: locationFilter,
                    type: typeFilter,
                },
                include: {
                    reviews: true
                }
            });
            console.log(listings);
            const sortedListings = calcAndSortListings(listings);
            console.log(sortedListings);
            return NextResponse.json(sortedListings);
        }
        catch (error) {
            return NextResponse.json({
                error: error,
            });
        }
    });
}
