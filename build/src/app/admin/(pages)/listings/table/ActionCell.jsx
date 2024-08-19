"use client";
import React, { useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import ListingModal from "@/app/admin/modals/listing-modal/ListingModal";
import { useListingHook } from "@/app/admin/hooks/listing-hook";
const ActionsCell = ({ listingId }) => {
    const [showModal, setShowModal] = useState(false);
    const { handleDeleteListing, isPending } = useListingHook();
    const handleHideModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);
    return (<>
      <button onClick={() => handleDeleteListing(listingId)} disabled={isPending} className="cursor-pointer px-2 py-1 rounded-xl">
        <FaTrash className={`${isPending ? "text-[#bdb2b2]" : "text-[#f00]"}`}/>
      </button>
      <button onClick={handleShowModal} className="cursor-pointer disabled:bg-slate-200 px-2 py-1 rounded-xl">
        <FaPen className="text-[#31b608]"/>
      </button>
      {showModal && (<ListingModal handleHideModal={handleHideModal} listingId={listingId}/>)}
    </>);
};
export default ActionsCell;
