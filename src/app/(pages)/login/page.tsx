"use client"
import Button from "@/ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/ui/Input";
import Image from "next/image";
import React, { useState } from "react";
import Paris from "../../../../public/paris.jpg"
import { useForm, SubmitHandler } from "react-hook-form";
import { schema, FormSchema } from "./schema";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    if (Object.keys(errors)?.length > 0) {
      toast.error("Enter valid data");
      return;
    }
    setIsLoading(true);
    try {
      const res = await signIn("credentials", { ...data, redirect: false });
      if (res?.error === null) {
        router.push("/");
      } else {
        toast.error("email or password is invalid");
      }
    } catch (error: any) {
      console.log(error);
    }
    setIsLoading(false);
  };
  
  return (
    <div className="relative h-screen w-full">
      <div className="relative h-full w-full">
        <Image
          src={Paris}
          alt="Login Page"
          className="brightness-50 h-full w-full object-cover"
        />
        <div className="h-[350px] w-[350px] bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg">
          <h2 className="text-center p-4 font-semibold text-slate-800 text-2xl border-b border-slate-500 ">
            Log into your account
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center justify-between gap-4 p-6"
          >
            <Input
              id="email"
              register={register("email")}
              type="email"
              placeholder="Email"
              className="w-full text-blue-800 p-2 rounded-xl outline-none"
            />
            {errors?.email && (
              <h5 className="text-red-600 font-medium">
                {errors.email.message}
              </h5>
            )}
            <Input
              id="password"
              register={register("password")}
              type="password"
              placeholder="Password"
              className="w-full text-blue-800 p-2 rounded-xl outline-none"
            />
            {errors?.password && (
              <h5 className="text-red-600 font-medium">
                {errors.password.message}
              </h5>
            )}
            <Button
              disabled={isLoading}
              label="Log in"
              className="mt-6 px-6 py-2 text-[20px] bg-blue-600 text-white rounded-xl transition-all hover:bg-[#1971d1]"
            />
          </form>
          <div className="text-center mt-4">
            <span className="text-slate-600">Don't have an account? </span>
            <button
              onClick={() => router.push("https://nirvana-2.vercel.app/signup")}
              className="text-blue-600 hover:underline"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
