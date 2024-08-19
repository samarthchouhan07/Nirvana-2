"use client";
import React from "react";
import { FaTrash } from "react-icons/fa";
import { useReviewHook } from "@/app/admin/hooks/review-hook";
var ReviewActionsCell = function (_a) {
    var reviewId = _a.reviewId;
    var _b = useReviewHook(), handleDeleteReview = _b.handleDeleteReview, isPending = _b.isPending;
    return (<button onClick={function () { return handleDeleteReview(reviewId); }} disabled={isPending} className="cursor-pointer disabled:bg-slate-200 px-2 py-1 rounded-xl">
      <FaTrash className={"".concat(isPending ? "text-[#bdb2b2]" : "text-[#f00]")}/>
    </button>);
};
export default ReviewActionsCell;
