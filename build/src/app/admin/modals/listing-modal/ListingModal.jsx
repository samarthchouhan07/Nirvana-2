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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useEffect, useState } from "react";
import ModalLayout from "../../layout/ModalLayout";
import Input from "@/ui/Input";
import Select from "@/ui/Select";
import { optionLocations, optionTypes } from "@/data/data";
import Button from "@/ui/Button";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getListingById } from "@/app/details/[id]/service";
import { updateListing } from "../../(pages)/listings/service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";
import toast from "react-hot-toast";
import { postImages } from "./service";
var ListingModal = function (_a) {
    var handleHideModal = _a.handleHideModal, listingId = _a.listingId;
    var CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUD_NAME;
    var UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET;
    var _b = useState([]), images = _b[0], setImages = _b[1];
    var router = useRouter();
    var listing = useQuery({
        queryFn: function () { return getListingById(listingId); },
        queryKey: ["admin", "listings", { listingId: listingId }],
    }).data;
    var _c = useMutation({
        mutationFn: function (_a) {
            var listingId = _a.listingId, body = _a.body;
            return updateListing({ listingId: listingId, body: body });
        },
    }), mutateAsync = _c.mutateAsync, isPendingMutation = _c.isPending;
    var _d = useForm({
        resolver: zodResolver(schema),
    }), register = _d.register, handleSubmit = _d.handleSubmit, reset = _d.reset, errors = _d.formState.errors;
    useEffect(function () {
        reset(__assign({}, listing));
    }, [
        listing === null || listing === void 0 ? void 0 : listing.name,
        listing === null || listing === void 0 ? void 0 : listing.desc,
        listing === null || listing === void 0 ? void 0 : listing.beds,
        listing === null || listing === void 0 ? void 0 : listing.type,
        listing === null || listing === void 0 ? void 0 : listing.hasFreeWifi,
        listing === null || listing === void 0 ? void 0 : listing.location,
        listing === null || listing === void 0 ? void 0 : listing.pricePerNight,
    ]);
    var handleImage = function (e) {
        console.log("handleImage got hit");
        if (e.target.files && e.target.files[0]) {
            setImages(function (prev) { return __spreadArray(__spreadArray([], prev, true), [e.target.files[0]], false); });
        }
    };
    var uploadImage = function (image, idx) { return __awaiter(void 0, void 0, void 0, function () {
        var toastId, formData, imageUrl, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(idx, image);
                    if (!image)
                        return [2 /*return*/];
                    toastId = toast.loading("Image ".concat(idx + 1, " is being uploaded"));
                    if (!UPLOAD_PRESET) {
                        toast.error("Upload preset is not defined");
                        return [2 /*return*/];
                    }
                    formData = new FormData();
                    formData.append("file", image);
                    formData.append("upload_preset", UPLOAD_PRESET);
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
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var onSubmit = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var imageUrls, body, updatedListing;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(data);
                    return [4 /*yield*/, Promise.all(images.map(function (image, idx) {
                            console.log(image, idx);
                            var imageUrl = uploadImage(image, idx);
                            return imageUrl;
                        }))];
                case 1:
                    imageUrls = _a.sent();
                    body = data;
                    if ((imageUrls === null || imageUrls === void 0 ? void 0 : imageUrls.length) > 0)
                        body.imageUrls = imageUrls;
                    else
                        body.imageUrls = listing.imageUrls;
                    return [4 /*yield*/, mutateAsync({ listingId: listingId, body: body })];
                case 2:
                    updatedListing = _a.sent();
                    toast.success("Redirecting to listings..");
                    router.push("/details/".concat(updatedListing.id));
                    return [2 /*return*/];
            }
        });
    }); };
    return (<ModalLayout document="listing" handleHideModal={handleHideModal}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full px-4 py-6 flex flex-col items-center gap-8">
        <Input className="w-[300px] px-2 py-2 rounded-xl" type="text" placeholder="Grand Hotel" register={register("name")}/>
        <Input className="w-[300px] px-2 py-2 rounded-xl" type="text" placeholder="The hotel was great..." register={register("desc")}/>
        <Select register={register("location")} data={optionLocations} className="w-[300px] px-2 py-2 rounded-xl"/>
        <Select register={register("type")} data={optionTypes} className="w-[300px] px-2 py-2 rounded-xl"/>
        <Input className="w-[300px] px-2 py-2 rounded-xl" type="number" placeholder="$249" register={register("pricePerNight", { valueAsNumber: true })} step={0.01}/>
        <Input className="w-[300px] px-2 py-2 rounded-xl" type="number" register={register("beds", { valueAsNumber: true })}/>
        <div className="text-slate-400 rounded-md ml-4 w-2/3 flex gap-4">
          <label htmlFor="freeWifi">Free Wifi</label>
          <Input className="h-4 w-4" type="checkbox" register={register("hasFreeWifi")} id="freeWifi"/>
        </div>
        <label className="text-slate-400 rounded-md w-2/3 ml-4" htmlFor="images">
          Upload Images
        </label>
        <input type="file" onChange={handleImage} style={{ display: "none" }} id="images"/>
        <Button disabled={isPendingMutation} label="Submi"/>
      </form>
    </ModalLayout>);
};
export default ListingModal;
