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
export function POST(req) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("got hit ?");
            const { text, stars } = yield req.json();
            console.log(text, stars);
            const currentUser = yield getCurrentUser();
            console.log(currentUser);
            if (!currentUser || !currentUser.id) {
                throw new Error("user not found");
            }
            const { id: userId } = currentUser;
            console.log(userId);
            const { searchParams } = new URL(req.url);
            const listingId = searchParams.get("id");
            console.log(listingId);
            if (!listingId) {
                throw new Error("listing id not found");
            }
            const createdReview = yield db.review.create({
                data: {
                    text,
                    stars,
                    listingId,
                    userId,
                },
                include: {
                    user: true,
                },
            });
            console.log(createdReview);
            return NextResponse.json(createdReview, { status: 201 });
        }
        catch (error) {
            return NextResponse.json({
                error: error,
            });
        }
    });
}
