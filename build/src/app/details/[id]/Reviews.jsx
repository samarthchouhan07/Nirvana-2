"use client ";
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
import React, { useState } from "react";
import Review from "./Review";
import { AiFillStar } from "react-icons/ai";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getReviewsByListing, postReview } from "./service";
import { useSession } from "next-auth/react";
import Pagination from "@/components/pagination/Pagination";
var Reviews = function (_a) {
    var id = _a.id;
    var session = useSession();
    console.log(session);
    var _b = useState(5), selectedStar = _b[0], setSelectedStar = _b[1];
    var _c = useState(""), text = _c[0], setText = _c[1];
    var queryClient = useQueryClient();
    var _d = useQuery({
        queryFn: function () { return getReviewsByListing(id); },
        queryKey: ["reviews"],
    }), reviews = _d.data, isPendingQuery = _d.isPending;
    var _e = useMutation({
        mutationFn: handleSubmit,
        onSuccess: function () {
            queryClient.invalidateQueries({
                queryKey: ["reviews"],
            });
            queryClient.invalidateQueries({
                queryKey: ["listings"],
            });
        },
    }), mutate = _e.mutate, isPending = _e.isPending;
    var itemsPerPage = 4;
    var _f = useState(0), itemOffset = _f[0], setItemOffset = _f[1];
    var endOffset = itemOffset + itemsPerPage;
    var currentReviews = reviews === null || reviews === void 0 ? void 0 : reviews.slice(itemOffset, endOffset);
    function handleSubmit(e) {
        return __awaiter(this, void 0, void 0, function () {
            var body, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        e.preventDefault();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (text === "")
                            return [2 /*return*/, toast.error("Review cant be empty")];
                        body = {
                            text: text,
                            stars: selectedStar,
                        };
                        return [4 /*yield*/, postReview(id, body)];
                    case 2:
                        _a.sent();
                        toast.success("Successfully posted a review");
                        setText("");
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    return (<>
      <div className="mt-8 flex items-center gap-6">
        {Array.from(Array(5).keys()).map(function (_, number) { return (<span key={number} onClick={function () { return setSelectedStar(number + 1); }} className={"".concat(selectedStar === number + 1 ? "scale-125" : "", "\n            cursor-pointer flex items-center gap-2 transition-all")}>
            {number + 1}
            <AiFillStar size={22} color="rgb(59, 130, 246)"/>
          </span>); })}
      </div>
      <div className="mt-8 flex items-center gap-28 border rounded-lg py-4 px-6 w-max">
        <input className="outline-none" type="text" placeholder="Leave your opinion..." onChange={function (e) { return setText(e.target.value); }} value={text}/>
        <button disabled={isPending} onClick={mutate} className="cursor-pointer rounded-lg py-2 px-6 text-xl text-white bg-blue-500 hover:bg-blue-400 transition-all">
          Post
        </button>
      </div>
      <div className="mt-16 h-[900px] flex flex-col gap-24 w-1/3">
        {currentReviews === null || currentReviews === void 0 ? void 0 : currentReviews.map(function (review) { return (<Review key={review.id} review={review}/>); })}
        <Pagination setItemOffset={setItemOffset} itemsPerPage={itemsPerPage} reviews={reviews}/>
      </div>
    </>);
};
export default Reviews;
