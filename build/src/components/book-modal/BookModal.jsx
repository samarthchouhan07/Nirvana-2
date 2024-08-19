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
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import { format } from "currency-formatter";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Button from "@/ui/Button";
import { redirectToPaymentLink } from "./service";
var BookModal = function (_a) {
    var _b, _c;
    var handleHideModal = _a.handleHideModal, listing = _a.listing;
    console.log(listing);
    var _d = useState(false), isLoading = _d[0], setIsLoading = _d[1];
    var _e = useState([
        new Date(),
        new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
    ]), dateRange = _e[0], setDateRange = _e[1];
    var selectionRange = {
        startDate: dateRange[0],
        endDate: dateRange[1],
        key: "selection",
    };
    var calcDaysDiff = function () {
        var startDate = dateRange[0];
        var endDate = dateRange[1];
        if (startDate && endDate) {
            var startTimestamp = new Date(startDate).getTime();
            var endTimestamp = new Date(endDate).getTime();
            var currentTimestamp = new Date().getTime();
            var result = Math.ceil((endTimestamp - currentTimestamp) / (1000 * 60 * 60 * 24));
            return result;
        }
    };
    var daysDiff = (_b = calcDaysDiff()) !== null && _b !== void 0 ? _b : 0;
    var handlePayment = function () { return __awaiter(void 0, void 0, void 0, function () {
        var startDate, endDate, daysDifference;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsLoading(true);
                    startDate = dateRange[0];
                    endDate = dateRange[1];
                    daysDifference = calcDaysDiff();
                    console.log(listing, startDate, endDate, daysDifference);
                    return [4 /*yield*/, redirectToPaymentLink(listing, startDate, endDate, daysDifference)];
                case 1:
                    _a.sent();
                    setIsLoading(false);
                    return [2 /*return*/];
            }
        });
    }); };
    return (<div className="fixed z-30 backdrop-blur top-0 left-0 min-h-full mt-10 w-full flex items-center justify-center">
      <div className="bg-slate-100 w-1/3 max-h-[90vh] overflow-y-auto rounded-lg shadow-lg pb-4">
        <div className="p-4 border-b border-slate-500 flex items-center justify-between">
          <h3 className="font-semibold text-2xl">Book your hotel</h3>
          <AiOutlineClose size={20} className="cursor-pointer" onClick={handleHideModal}/>
        </div>
        <div className="p-4 flex items-center justify-between">
          <h2 className="font-semibold text-[20px]">{listing.name}</h2>
          <span className="text-slate-800">
            {format(325.5, { locale: "en-US" })}
          </span>
        </div>
        <form className="p-4 flex flex-col gap-4 date-range-picker-container">
          <DateRangePicker ranges={[selectionRange]} minDate={new Date()} disabledDates={(_c = listing === null || listing === void 0 ? void 0 : listing.reservations) === null || _c === void 0 ? void 0 : _c.flatMap(function (_a) {
        var reservedDates = _a.reservedDates;
        return reservedDates;
    })} onChange={function (_a) {
            var selection = _a.selection;
            setDateRange([selection.startDate, selection.endDate]);
        }}/>
        </form>
        <div className="p-4 mt-4 border-t border-slate-500 flex items-end justify-between">
          <div className="text-slate-700 flex items-center gap-2">
            <span>{format(300, { locale: "en-US" })}</span>
            <span>X</span>
            <span>{calcDaysDiff()}</span>
          </div>
          <div className="text-slate-700 mt-4">
            Total Price : {format(300 * daysDiff, { locale: "en-US" })}
          </div>
        </div>
        <div className="w-full flex items-center mt-6">
          <Button onClick={handlePayment} disabled={isLoading} className="w-3/4 mx-auto cursor-pointer rounded-lg py-3 px-6 text-xl text-white bg-blue-500 transition-all hover:bg-blue-600" label="Submit"/>
        </div>
      </div>
    </div>);
};
export default BookModal;
