var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import db from "./db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
export function getSession() {
    return __awaiter(this, void 0, void 0, function* () {
        const session = yield getServerSession(authOptions);
        console.log("Session in getSession:", session);
        return session;
    });
}
export function getCurrentUser() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const session = yield getSession();
            console.log(session);
            if (!((_a = session === null || session === void 0 ? void 0 : session.user) === null || _a === void 0 ? void 0 : _a.email)) {
                return null;
            }
            const user = yield db.user.findUnique({
                where: {
                    email: session.user.email
                }
            });
            console.log(user);
            if (!user) {
                return null;
            }
            const { password } = user, currentUser = __rest(user, ["password"]);
            console.log(currentUser);
            return currentUser;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    });
}
