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
import bcryptjs from "bcryptjs";
export function POST(req) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = yield req.json();
            console.log(body);
            const { email, username, password } = body;
            console.log(email, username, password);
            const isExisting = yield db.user.findUnique({
                where: {
                    email
                }
            });
            console.log(isExisting);
            if (isExisting) {
                return NextResponse.json({
                    message: "You already registered",
                    status: 409
                });
            }
            const hashedPassword = yield bcryptjs.hash(password, 10);
            console.log(hashedPassword);
            yield db.user.create({
                data: {
                    email, username, password: hashedPassword
                }
            });
            return NextResponse.json({ message: "User has registered successfully" }, { status: 201 });
        }
        catch (error) {
            return NextResponse.json({ message: "An error occurred in register route", error: error.message }, { status: 500 });
        }
    });
}
