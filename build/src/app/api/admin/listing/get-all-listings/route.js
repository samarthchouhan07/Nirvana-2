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
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";
import { NextResponse } from "next/server";
export const runtime = 'nodejs';
export function GET(req) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const adminResponse = yield isAdminUser();
            if (adminResponse.status === 403) {
                return adminResponse;
            }
            const allListings = yield db.listing.findMany({});
            return NextResponse.json(allListings);
        }
        catch (error) {
            if (isDynamicServerError(error)) {
                throw error;
            }
            console.error(error);
            return NextResponse.json({
                error: error
            });
        }
    });
}
