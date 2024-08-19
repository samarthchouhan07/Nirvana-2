"use client";
import React, { useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import { useUserHook } from "../../../hooks/user-hook";
import UserModal from "@/app/admin/modals/user-modal/UserModal";
var UserActionsCell = function (_a) {
    var userId = _a.userId;
    var _b = useState(false), showModal = _b[0], setShowModal = _b[1];
    var _c = useUserHook(), handleDeleteUser = _c.handleDeleteUser, isPending = _c.isPending;
    var handleHideModal = function () { return setShowModal(false); };
    var handleShowModal = function () { return setShowModal(true); };
    return (<div className="flex">
      <button className="cursor-pointer disabled:bg-slate-200 px-2 py-1 rounded-xl" disabled={isPending} onClick={function () { return handleDeleteUser(userId); }}>
        <FaTrash className={"".concat(isPending ? "text-[#bdb2b2]" : "text-[#f00]")}/>
      </button>
      <button onClick={handleShowModal} className="cursor-pointer disabled:bg-slate-200 px-2 py-1 rounded-xl">
        <FaPen className="text-[#31b608]"/>
      </button>
      {showModal && (<UserModal userId={userId} handleHideModal={handleHideModal}/>)}
    </div>);
};
export default UserActionsCell;
