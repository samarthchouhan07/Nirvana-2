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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import Input from "@/ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { schema } from "./schema";
import Select from "@/ui/Select";
import { optionLocations, optionTypes } from "@/data/data";
import Button from "@/ui/Button";
import toast from "react-hot-toast";
import { createNewListing, postImages } from "./service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import ModalLayout from "../../layout/ModalLayout";
var CreateModal = function (_a) {
    var handleHideModal = _a.handleHideModal;
    var CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUD_NAME;
    var UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET;
    var router = useRouter();
    var _b = useState([]), images = _b[0], setImages = _b[1];
    var _c = useMutation({
        mutationFn: function (_a) {
            var data = _a.data, imageUrls = _a.imageUrls;
            return createNewListing(data, imageUrls);
        },
        mutationKey: ["listings"],
    }), mutateAsync = _c.mutateAsync, isPending = _c.isPending;
    var _d = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            desc: "",
            beds: 5,
            hasFreeWifi: false,
            type: "luxury",
            location: "dubai",
            pricePerNight: 123,
        },
    }), register = _d.register, handleSubmit = _d.handleSubmit, errors = _d.formState.errors;
    useEffect(function () {
        if (Object.keys(errors).length > 0) {
            Object.keys(errors).forEach(function (key) {
                var _a;
                var errorKey = key;
                var errorMessage = (_a = errors[errorKey]) === null || _a === void 0 ? void 0 : _a.message;
                if (errorMessage) {
                    toast.error(errorMessage);
                }
            });
        }
    }, [errors]);
    var uploadImage = function (image, idx) { return __awaiter(void 0, void 0, void 0, function () {
        var toastId, formData, imageUrl, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!image)
                        return [2 /*return*/];
                    toastId = toast.loading("Image ".concat(idx + 1, " is being uploaded"));
                    formData = new FormData();
                    formData.append("file", image);
                    if (UPLOAD_PRESET) {
                        formData.append("upload_preset", UPLOAD_PRESET);
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, postImages(CLOUD_NAME, formData)];
                case 2:
                    imageUrl = _a.sent();
                    toast.success("Successfully uploaded image ".concat(idx + 1));
                    toast.dismiss(toastId);
                    return [2 /*return*/, imageUrl];
                case 3:
                    error_1 = _a.sent();
                    console.error(error_1);
                    toast.error("Failed to upload image ".concat(idx + 1));
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var onSubmit = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var imageUrls, newListing;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!images.length)
                        return [2 /*return*/, toast.error("You must upload at least one image")];
                    return [4 /*yield*/, Promise.all(images.map(function (image, idx) { return uploadImage(image, idx); }))];
                case 1:
                    imageUrls = _a.sent();
                    return [4 /*yield*/, mutateAsync({ data: data, imageUrls: imageUrls.filter(Boolean) })];
                case 2:
                    newListing = _a.sent();
                    toast.success("Redirecting to listing...");
                    router.push("/details/".concat(newListing.id));
                    return [2 /*return*/];
            }
        });
    }); };
    var handleImage = function (e) {
        if (e.target.files && e.target.files[0]) {
            setImages(function (prev) { return __spreadArray(__spreadArray([], prev, true), [e.target.files[0]], false); });
        }
    };
    return (<ModalLayout isCreating document="listing" handleHideModal={handleHideModal}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full px-4 py-6 flex flex-col items-center gap-8">
        <Input type="text" register={register("name")} className="text-slate-400 w-[350px] outline-none p-2" placeholder="Arabian Paradise"/>
        <Input type="text" register={register("desc")} className="text-slate-400 w-[350px] outline-none p-2" placeholder="This hotel is amazing. It has this view....."/>
        <Select register={register("location")} data={optionLocations} className="text-slate-400 w-[350px] outline-none p-2 ml-2"/>
        <Select register={register("type")} data={optionTypes} className="text-slate-400 w-[350px] outline-none p-2 ml-2"/>
        <Input type="number" register={register("pricePerNight", { valueAsNumber: true })} className="text-slate-400 w-[350px] outline-none p-2" step={0.01} placeholder="$249.00"/>
        <Input type="number" register={register("beds", { valueAsNumber: true })} className="text-slate-400 w-[350px] outline-none p-2" step={1}/>
        <div className="text-slate-400 ml-4 items-center w-[350px] flex gap-4">
          <label>Free Wifi</label>
          <Input register={register("hasFreeWifi")} type="checkbox" id="freeWifi" className="w-4 h-4"/>
        </div>
        <label className="text-slate-400 w-[350px] ml-4" htmlFor="images">
          Upload Images
        </label>
        <input onChange={handleImage} type="file" className="text-slate-400" style={{ display: "none" }} id="images"/>
        <Button disabled={isPending} className="w-2/3 bg-blue-500 text-white px-4 py-2 rounded-xl disabled:bg-blue-700" label="Submit"/>
      </form>
    </ModalLayout>);
};
export default CreateModal;
