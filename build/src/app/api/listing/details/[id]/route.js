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
import { NextResponse } from "next/server";
export function GET(req, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(ctx.params);
            const id = ctx.params.id;
            console.log(id);
            const listing = yield db.listing.findUnique({
                where: {
                    id,
                },
                include: {
                    reviews: true,
                    reservations: true,
                },
            });
            console.log(listing);
            if (!listing) {
                console.log(listing);
                throw new Error("listing error in route.ts /details/id");
            }
            const avgRating = (listing === null || listing === void 0 ? void 0 : listing.reviews.reduce((a, b) => {
                return a + b.stars;
            }, 0)) / (listing === null || listing === void 0 ? void 0 : listing.reviews.length);
            console.log(avgRating);
            return NextResponse.json(Object.assign(Object.assign({}, listing), { avgRating: avgRating ? Number(avgRating.toFixed(2)) : 0 }));
        }
        catch (error) {
            return NextResponse.json({
                error: error,
            });
        }
    });
}
