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
import Image from "next/image";
import React from "react";
import image from "../../../../public/hr_1.jpg";
import Select from "@/ui/Select";
import { optionLocations, optionTypes } from "@/data/data";
import Input from "@/ui/Input";
import Button from "@/ui/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getFilteredListings } from "./service";
import Card from "@/components/best-hotels/Card";
var Catalog = function () {
    var searchParams = useSearchParams();
    var city = searchParams.get("city");
    var min_price = searchParams.get("min_price");
    var max_price = searchParams.get("max_price");
    var type = searchParams.get("type");
    var router = useRouter();
    var _a = optionLocations.find(function (location) { return location.value === city; }) || {}, city_name = _a.city, value = _a.value, locationImage = _a.image;
    var defaultValues = {
        location: value || "",
        min_price: min_price ? Number(min_price) : undefined,
        max_price: max_price ? Number(max_price) : undefined,
        type: type || "",
    };
    var _b = useForm({
        defaultValues: defaultValues,
        resolver: zodResolver(schema),
    }), register = _b.register, handleSubmit = _b.handleSubmit, getValues = _b.getValues, errors = _b.formState.errors;
    var queryClient = useQueryClient();
    var _c = useQuery({
        queryFn: function () { return getFilteredListings(getValues()); },
        queryKey: ["listings"],
    }), listings = _c.data, isPending = _c.isPending;
    var onSubmit = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var newUrl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getFilteredListings(data)];
                case 1:
                    _a.sent();
                    queryClient.invalidateQueries({ queryKey: ["listings"] });
                    newUrl = "/catalog?city=".concat(data.location, "&min_price=").concat(data.min_price, "&max_price=").concat(data.max_price, "&type=").concat(data.type);
                    router.push(newUrl, { scroll: false });
                    return [2 /*return*/];
            }
        });
    }); };
    var displayImage = locationImage || image;
    return (<div className="min-h-screen w-full">
      <div className="relative h-3/5 w-full">
        <Image src={displayImage} className="brightness-50 h-screen w-full object-cover " alt=""/>
        <h3 className="absolute text-6xl capitalize font-semibold flex items-center justify-center bottom-0 left-0 top-0 right-0 text-white">
          {city_name}
        </h3>
      </div>
      <div className="relative z-20 -mt-12 h-full w-full flex flex-col items-center ">
        <form onSubmit={handleSubmit(onSubmit)} className="border w-2/3 h-28 border-slate-500 px-4 py-12 rounded-xl bg-blue-600 text-white flex justify-between items-center ">
          <div className="flex flex-col items-center gap-1">
            <h3 className="ml-1 text-[#efefef] font-semibold"> City </h3>
            <Select register={register("location")} data={optionLocations} className="text-blue-800 p-2 rounded-xl outline-none capitalize "/>
          </div>
          <div className="flex flex-col items-center gap-1">
            <h3 className="ml-1 text-[#efefef] font-semibold ">Price</h3>
            <div className="flex items-center gap-2">
              <Input register={register("min_price", { valueAsNumber: true })} type="number" placeholder="Min. Price" className="text-blue-800 p-2 rounded-xl outline-none"/>
              <Input register={register("max_price", { valueAsNumber: true })} type="number" placeholder="Max. price" className="text-blue-800 p-2 rounded-xl outline-none"/>
            </div>
          </div>
          <div className="flex flex-col items-start gap-1">
            <h3 className="ml-1 text-[#efefef] font-semibold">Type of hotel</h3>
            <Select register={register("type")} data={optionTypes} className="text-blue-800 p-2 rounded-xl outline-none"/>
          </div>
          <Button disabled={false} label="Search" className="mt-6 px-6 py-2 text-[20px] bg-white text-blue-600 rounded-xl transition-all hover:bg-[#efefef]"/>
        </form>
        <div className="w-full mt-36 flex flex-wrap justify-center items-center gap-14">
          {(listings !== null && listings !== void 0 ? listings : []).length > 0 ? (listings === null || listings === void 0 ? void 0 : listings.map(function (place, idx) { return (<Card key={idx} place={place}/>); })) : (<h2 className="text-center font-bold text-3xl text-slate-700">
              No Listings with those filters
            </h2>)}
        </div>
      </div>
    </div>);
};
export default Catalog;
