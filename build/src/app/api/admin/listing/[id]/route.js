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
export function GET(req, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield isAdminUser();
            const { id } = ctx.params;
            const listing = yield db.listing.findUnique({
                where: { id },
            });
            return NextResponse.json(listing);
        }
        catch (error) {
            console.log(error);
            return NextResponse.error();
        }
    });
}
export function PUT(req, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield isAdminUser();
            const { id } = ctx.params;
            const body = yield req.json();
            const updatedListing = yield db.listing.update({
                where: {
                    id,
                },
                data: Object.assign({}, body),
            });
            return NextResponse.json(updatedListing);
        }
        catch (error) {
            return NextResponse.error();
        }
    });
}
export function DELETE(req, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield isAdminUser();
            const { id } = ctx.params;
            const deletedListing = yield db.listing.delete({
                where: {
                    id,
                },
            });
            if (deletedListing) {
                return NextResponse.json({
                    message: "Listing has been deleted successfully ",
                }, { status: 200 });
            }
            else {
                return NextResponse.json({ message: "Listing doesnt exist" });
            }
        }
        catch (error) {
            return NextResponse.error();
        }
    });
}
