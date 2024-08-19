import Loader from "@/ui/Loader";
import Image from "next/image";
import React from "react";
var BigWidget = function (_a) {
    var _b;
    var listing = _a.listing;
    console.log(listing);
    if (!listing) {
        return <Loader />;
    }
    return (<div className="h-full w-full mt-auto col-span-2 rounded-xl transition-all shadow-lg hover:shadow-xl p-4 ">
      <div className="flex flex-col gap-4 h-full">
        <h3 className="text-slate-700 text-start font-bold text-2xl">
          #1 Reserved Listing
        </h3>
        <div className="flex-grow">
          <Image alt="" src={listing === null || listing === void 0 ? void 0 : listing.imageUrls[0]} className="object-cover w-full h-64 rounded-md mb-4" width={400} height={200} blurDataURL={listing === null || listing === void 0 ? void 0 : listing.blurredImage} placeholder="blur"/>
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-slate-700 text-2xl">
              {listing === null || listing === void 0 ? void 0 : listing.name}
            </h3>
            <span className="flex items-center font-semibold gap-1">
              <h3 className="text-slate-500">Total reservations:</h3>
              <span className="text-slate-500">
                {(_b = listing === null || listing === void 0 ? void 0 : listing.reservations) === null || _b === void 0 ? void 0 : _b.length} reservations
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>);
};
export default BigWidget;
