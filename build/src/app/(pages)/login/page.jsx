"use client";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Button from "@/ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/ui/Input";
import Image from "next/image";
import React, { useState } from "react";
import Paris from "../../../../public/paris.jpg";
import { useForm } from "react-hook-form";
import { schema } from "./schema";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
const Login = () => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: zodResolver(schema),
    });
    const [isLoading, setIsLoading] = useState(false);
    const onSubmit = (data) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        if (((_a = Object.keys(errors)) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            toast.error("Enter valid data");
            return;
        }
        setIsLoading(true);
        try {
            const res = yield signIn("credentials", Object.assign(Object.assign({}, data), { redirect: false }));
            if ((res === null || res === void 0 ? void 0 : res.error) === null) {
                router.push("/");
            }
            else {
                toast.error("email or password is invalid");
            }
        }
        catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    });
    return (<div className="relative h-screen w-full">
      <div className="relative h-full w-full">
        <Image src={Paris} alt="Login Page" className="brightness-50 h-full w-full object-cover"/>
        <div className="h-[350px] w-[350px] bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg">
          <h2 className="text-center p-4 font-semibold text-slate-800 text-2xl border-b border-slate-500 ">
            Log into your account
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-between gap-4 p-6">
            <Input id="email" register={register("email")} type="email" placeholder="Email" className="w-full text-blue-800 p-2 rounded-xl outline-none"/>
            {(errors === null || errors === void 0 ? void 0 : errors.email) && (<h5 className="text-red-600 font-medium">{errors.email.message}</h5>)}
            <Input id="password" register={register("password")} type="password" placeholder="Password" className="w-full text-blue-800 p-2 rounded-xl outline-none"/>
            {(errors === null || errors === void 0 ? void 0 : errors.password) && (<h5 className="text-red-600 font-medium">
                {errors.password.message}
              </h5>)}
            <Button disabled={false} label="Log in" className="mt-6 px-6 py-2 text-[20px] bg-blue-600 text-white rounded-xl transition-all hover:bg-[#1971d1]"/>
          </form>
        </div>
      </div>
    </div>);
};
export default Login;
