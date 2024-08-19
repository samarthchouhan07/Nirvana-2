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
            const listings = yield db.listing.findMany({
                include: {
                    reviews: true
                }
            });
            console.log(listings);
            const sortedListings = calcAndSortListings(listings).slice(0, 4);
            console.log(sortedListings);
            return NextResponse.json(sortedListings);
        }
        catch (error) {
            return NextResponse.json({
                error: error
            });
        }
    });
}
