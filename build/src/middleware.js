var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
export default function middleware(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield getToken({ req });
        const pathname = req.nextUrl.pathname;
        const urlOrigin = "http://localhost:3000/";
        if (pathname.includes('/admin') && !(token === null || token === void 0 ? void 0 : token.isAdmin)) {
            return NextResponse.redirect(urlOrigin);
        }
        if (!pathname.includes(`/login`) && !pathname.includes('/signup') && !token) {
            return NextResponse.redirect(urlOrigin + 'login');
        }
        if ((pathname.includes('/login') || pathname.includes('/signup')) && token) {
            return NextResponse.redirect(urlOrigin);
        }
        else {
            return NextResponse.next();
        }
    });
}
export const config = {
    matcher: ["/create", "/details/((?!general).*)", "/reservations", "/catalog", "/", "/login", "/signup", "/success-page", "/admin/dashboard", "/admin/users", "/admin/reservations", "/admin/listings"]
};
