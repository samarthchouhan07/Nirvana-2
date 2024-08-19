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
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import db from "@/lib/db";
import NextAuth from "next-auth/next";
export const authOptions = {
    adapter: PrismaAdapter(db),
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: {
                    label: "password",
                    type: "password",
                },
            },
            authorize(credentials) {
                return __awaiter(this, void 0, void 0, function* () {
                    console.log(credentials);
                    const { email, password } = credentials;
                    const user = yield db.user.findUnique({
                        where: {
                            email
                        }
                    });
                    if (!user) {
                        throw new Error("invalid input");
                    }
                    const isCorrectPass = yield bcryptjs.compare(password, user.password);
                    if (!isCorrectPass) {
                        throw new Error("invalid input ");
                    }
                    else {
                        const { password } = user, currentUser = __rest(user, ["password"]);
                        console.log(currentUser);
                        return currentUser;
                    }
                });
            }
        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
    },
    callbacks: {
        jwt({ token, user }) {
            if (user)
                token.isAdmin = user.isAdmin;
            return token;
        },
        session({ session, token }) {
            session.user.isAdmin = token.isAdmin;
            return session;
        },
    },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
