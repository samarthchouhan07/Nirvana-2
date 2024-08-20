var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";
import { getCurrentUser } from "./currentUser";
import { NextResponse } from "next/server";
export const runtime = 'nodejs';
const isAdminUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = yield getCurrentUser();
    try {
        if (!(currentUser === null || currentUser === void 0 ? void 0 : currentUser.isAdmin)) {
            return NextResponse.json({ message: "You are not an admin!" }, { status: 403 });
        }
        return NextResponse.next();
    }
    catch (error) {
        if (isDynamicServerError(error)) {
            throw error;
        }
        console.error("Error checking admin status:", error);
        return NextResponse.json({ message: "Error checking admin status" }, { status: 500 });
    }
});
export default isAdminUser;
