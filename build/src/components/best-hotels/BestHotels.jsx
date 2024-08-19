"use client";
import React from "react";
import Card from "./Card";
import { useQuery } from "@tanstack/react-query";
import { getBestHotels } from "./service";
import Loader from "@/ui/Loader";
var BestHotels = function () {
    var _a = useQuery({
        queryKey: ["listings"],
        queryFn: getBestHotels
    }), data = _a.data, isPending = _a.isPending;
    console.log(data);
    if (isPending) {
        return (<div>
        <Loader />
      </div>);
    }
    return (<div className="h-full w-full my-36">
      <div className="h-full w-5/6 mx-auto flex flex-col justify-start">
        <h5 className="text-[20px] bg-blue-500 text-white rounded-full p-4 w-max">
          Explore Top
        </h5>
        <h2 className="text-4xl text-slate-800 font-bold mt-6 mb-12">
             Best Hotels
        </h2>
        <div className="flex flex-wrap items-center gap-14">
              {data === null || data === void 0 ? void 0 : data.map(function (place) { return (<Card key={place.id} place={place}/>); })}
        </div>
      </div>
    </div>);
};
export default BestHotels;
