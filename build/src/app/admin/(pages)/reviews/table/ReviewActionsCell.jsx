"use client";
import React from "react";
import { FaTrash } from "react-icons/fa";
import { useReviewHook } from "@/app/admin/hooks/review-hook";
const ReviewActionsCell = ({ reviewId }) => {
    const { handleDeleteReview, isPending } = useReviewHook();
    return (<button onClick={() => handleDeleteReview(reviewId)} disabled={isPending} className="cursor-pointer disabled:bg-slate-200 px-2 py-1 rounded-xl">
      <FaTrash className={`${isPending ? "text-[#bdb2b2]" : "text-[#f00]"}`}/>
    </button>);
};
export default ReviewActionsCell;
