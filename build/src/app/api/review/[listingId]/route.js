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
            const { listingId } = ctx.params;
            const listing = yield db.listing.findUnique({
                where: {
                    id: listingId
                },
                include: {
                    reviews: true
                }
            });
            console.log(listing);
            const reviewIds = listing === null || listing === void 0 ? void 0 : listing.reviews.map(({ id }) => id);
            console.log(reviewIds);
            const reviews = yield db.review.findMany({
                where: {
                    id: {
                        in: reviewIds
                    }
                },
                include: {
                    user: true
                },
                orderBy: {
                    createdAt: "desc"
                }
            });
            return NextResponse.json(reviews, { status: 200 });
        }
        catch (error) {
            console.log("got error in the review/[listingId] ");
            return NextResponse.json({
                error: error
            });
        }
    });
}
