import { PrismaAdapter } from "@next-auth/prisma-adapter"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcryptjs from "bcryptjs"
import db from "@/lib/db"

export const authOptions:any = {
    adapter: PrismaAdapter(db),
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" }
            },
            async authorize(credentials:any) {
                const { email, password } = credentials

                const user = await db.user.findUnique({
                    where: {
                        email
                    }
                })

                if (!user) {
                    throw new Error("Invalid input")
                }

                const isCorrectPass = await bcryptjs.compare(password, user.password)

                if (!isCorrectPass) {
                    throw new Error("Invalid input")
                } else {
                    const { password, ...currentUser } = user

                    return currentUser
                }
            }
        })
    ],
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login"
    },
    callbacks: {
        async jwt({ token, user }:any) {
            if (user) token.isAdmin = user.isAdmin
            return token
        },
        async session({ session, token }:any) {
            session.user.isAdmin = token.isAdmin
            return session
        }
    },
    url: process.env.NEXTAUTH_URL
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }