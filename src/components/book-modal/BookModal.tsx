"use client";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import { format } from "currency-formatter";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Button from "@/ui/Button";
import { redirectToPaymentLink } from "./service";

type Props = {
  handleHideModal: ()=>void;
  listing: any;
};

const BookModal = ({ handleHideModal, listing }: Props) => {
  console.log(listing)
  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState<any>([
    new Date(),
    new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
  ]);
  const selectionRange = {
    startDate: dateRange[0],
    endDate: dateRange[1],
    key: "selection",
  };

  const calcDaysDiff = (): number | undefined => {
    const startDate = dateRange[0];
    const endDate = dateRange[1];
    if (startDate && endDate) {
      const startTimestamp = new Date(startDate).getTime();
      const endTimestamp = new Date(endDate).getTime();
      const currentTimestamp = new Date().getTime();
      const result = Math.ceil(
        (endTimestamp - currentTimestamp) / (1000 * 60 * 60 * 24)
      );
      return result;
    }
  };

  const daysDiff = calcDaysDiff() ?? 0;

  const handlePayment = async () => {
    setIsLoading(true);
    const startDate = dateRange[0];
    const endDate = dateRange[1];

    const daysDifference = calcDaysDiff();

    console.log(listing, startDate, endDate, daysDifference)
    await redirectToPaymentLink(listing, startDate, endDate, daysDifference);
    setIsLoading(false);
  };
  return (
    <div className="fixed z-30 backdrop-blur top-0 left-0 min-h-full mt-10 w-full flex items-center justify-center">
      <div className="bg-slate-100 w-1/3 max-h-[90vh] overflow-y-auto rounded-lg shadow-lg pb-4">
        <div className="p-4 border-b border-slate-500 flex items-center justify-between">
          <h3 className="font-semibold text-2xl">Book your hotel</h3>
          <AiOutlineClose
            size={20}
            className="cursor-pointer"
            onClick={handleHideModal}
          />
        </div>
        <div className="p-4 flex items-center justify-between">
          <h2 className="font-semibold text-[20px]">{listing.name}</h2>
          <span className="text-slate-800">
            {format(325.5, { locale: "en-US" })}
          </span>
        </div>
        <form className="p-4 flex flex-col gap-4 date-range-picker-container">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            disabledDates={listing?.reservations?.flatMap(({reservedDates}:any)=>reservedDates)}
            onChange={({ selection }) => {
              setDateRange([selection.startDate, selection.endDate]);
            }}
          />
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
          <Button
            onClick={handlePayment}
            disabled={isLoading}
            className="w-3/4 mx-auto cursor-pointer rounded-lg py-3 px-6 text-xl text-white bg-blue-500 transition-all hover:bg-blue-600"
            label="Submit"
          />
        </div>
      </div>
    </div>
  );
};

export default BookModal;
