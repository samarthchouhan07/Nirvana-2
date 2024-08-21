import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import db from "@/lib/db";
import NextAuth from "next-auth/next";

export const authOptions:any = {
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
      async authorize(credentials:any){
        console.log(credentials)
        const {email,password}=credentials
        const user =await db.user.findUnique({
            where:{
                email
            }
        })
        if(!user){
            throw new Error("invalid input")
        }
        const isCorrectPass=await bcryptjs.compare(password,user.password)
        if(!isCorrectPass){
            throw new Error("invalid input ")
        }else{
            const {password,...currentUser}=user
            console.log(currentUser)
            return currentUser
        }
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
    jwt({ token, user }: any) {
      if (user) token.isAdmin = user.isAdmin;
      return token;
    },
    session({ session, token }: any) {
      session.user.isAdmin = token.isAdmin;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };