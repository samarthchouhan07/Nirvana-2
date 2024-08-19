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
export function DELETE(req, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield isAdminUser();
            const { id } = ctx.params;
            const review = yield db.review.delete({
                where: {
                    id,
                },
            });
            if (review) {
                return NextResponse.json({ message: "Successfully deleted the review" });
            }
            else {
                return NextResponse.json({
                    message: `Review with the id of ${id} doesnt exist`,
                });
            }
        }
        catch (error) {
            return NextResponse.error();
        }
    });
}
