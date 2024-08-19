"use client";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var Login = function () {
    var router = useRouter();
    var _a = useForm({
        resolver: zodResolver(schema),
    }), register = _a.register, handleSubmit = _a.handleSubmit, errors = _a.formState.errors;
    var _b = useState(false), isLoading = _b[0], setIsLoading = _b[1];
    var onSubmit = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var res, error_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (((_a = Object.keys(errors)) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                        toast.error("Enter valid data");
                        return [2 /*return*/];
                    }
                    setIsLoading(true);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, signIn("credentials", __assign(__assign({}, data), { redirect: false }))];
                case 2:
                    res = _b.sent();
                    if ((res === null || res === void 0 ? void 0 : res.error) === null) {
                        router.push("/");
                    }
                    else {
                        toast.error("email or password is invalid");
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    console.log(error_1);
                    return [3 /*break*/, 4];
                case 4:
                    setIsLoading(false);
                    return [2 /*return*/];
            }
        });
    }); };
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
