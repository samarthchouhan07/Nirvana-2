var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getCurrentUser } from "@/lib/currentUser";
import db from "@/lib/db";
import { NextResponse } from "next/server";
export function DELETE(req, ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = ctx.params.id;
            const currentUser = yield getCurrentUser();
            const reservation = yield db.reservation.findUnique({
                where: {
                    id,
                },
                include: {
                    user: true,
                },
            });
            if ((reservation === null || reservation === void 0 ? void 0 : reservation.user.id) !== (currentUser === null || currentUser === void 0 ? void 0 : currentUser.id) && !(currentUser === null || currentUser === void 0 ? void 0 : currentUser.isAdmin)) {
                return NextResponse.json({
                    message: "user has no permissions to cancel the reservations",
                });
            }
            yield db.reservation.delete({
                where: {
                    id,
                },
            });
            return NextResponse.json({
                message: `Successfully deleted the reservation with id of ` + id,
            }, {
                status: 200,
            });
        }
        catch (error) {
            return NextResponse.json({
                error: error,
            });
        }
    });
}
