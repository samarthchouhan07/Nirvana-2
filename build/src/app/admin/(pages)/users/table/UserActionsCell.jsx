"use client";
import React, { useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import { useUserHook } from "../../../hooks/user-hook";
import UserModal from "@/app/admin/modals/user-modal/UserModal";
const UserActionsCell = ({ userId }) => {
    const [showModal, setShowModal] = useState(false);
    const { handleDeleteUser, isPending } = useUserHook();
    const handleHideModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);
    return (<div className="flex">
      <button className="cursor-pointer disabled:bg-slate-200 px-2 py-1 rounded-xl" disabled={isPending} onClick={() => handleDeleteUser(userId)}>
        <FaTrash className={`${isPending ? "text-[#bdb2b2]" : "text-[#f00]"}`}/>
      </button>
      <button onClick={handleShowModal} className="cursor-pointer disabled:bg-slate-200 px-2 py-1 rounded-xl">
        <FaPen className="text-[#31b608]"/>
      </button>
      {showModal && (<UserModal userId={userId} handleHideModal={handleHideModal}/>)}
    </div>);
};
export default UserActionsCell;
