import Image from "next/image";
import Link from "next/link";
import React from "react";
var Card = function (_a) {
    var place = _a.place;
    var url = "/catalog?city=".concat(place.value, "&min_price=").concat(50, "&max_price=").concat(999, "&type=").concat("luxury");
    return (<Link href={url} className="cursor-pointer h-[500px] w-[350px] flex flex-wrap rounded-xl shadow-md">
      <div className="relative h-2/3 w-full ">
        <Image src={place.image} alt="" className="h-full w-full overflow-hidden rounded-tl-xl rounded-tr-xl object-cover"/>
        <div className="absolute right-0 bottom-0 capitalize p-4 bg-blue-700 text-white rounded-tl-xl font-semibold ">
          {place.value}
        </div>
      </div>
      <div className="flex flex-col gap-4 p-4">
        <h2 className="text-center text-2xl text-slate-800 font-semibold">
          {place.numOfPlaces} Places to stay
        </h2>
        <p className="text-center mt-2 text-lg text-slate-700">
          Discover the best hotel or apartment for your adventurous journey
        </p>
      </div>
    </Link>);
};
export default Card;
