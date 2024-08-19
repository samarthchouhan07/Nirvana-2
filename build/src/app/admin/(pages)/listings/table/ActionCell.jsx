"use client";
import React, { useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import ListingModal from "@/app/admin/modals/listing-modal/ListingModal";
import { useListingHook } from "@/app/admin/hooks/listing-hook";
var ActionsCell = function (_a) {
    var listingId = _a.listingId;
    var _b = useState(false), showModal = _b[0], setShowModal = _b[1];
    var _c = useListingHook(), handleDeleteListing = _c.handleDeleteListing, isPending = _c.isPending;
    var handleHideModal = function () { return setShowModal(false); };
    var handleShowModal = function () { return setShowModal(true); };
    return (<>
      <button onClick={function () { return handleDeleteListing(listingId); }} disabled={isPending} className="cursor-pointer px-2 py-1 rounded-xl">
        <FaTrash className={"".concat(isPending ? "text-[#bdb2b2]" : "text-[#f00]")}/>
      </button>
      <button onClick={handleShowModal} className="cursor-pointer disabled:bg-slate-200 px-2 py-1 rounded-xl">
        <FaPen className="text-[#31b608]"/>
      </button>
      {showModal && (<ListingModal handleHideModal={handleHideModal} listingId={listingId}/>)}
    </>);
};
export default ActionsCell;
