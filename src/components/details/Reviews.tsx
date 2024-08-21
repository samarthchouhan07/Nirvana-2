"use client ";
import React, { useState } from "react";
import Review from "./Review";
import { AiFillStar } from "react-icons/ai";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getReviewsByListing, postReview } from "../../app/(pages)/details/[id]/service"
import { useSession } from "next-auth/react";
import Pagination from "@/components/pagination/Pagination";

type Props = {
  id: any;
};

const Reviews:React.FC<Props> = ({ id }) => {
  const session = useSession();
  console.log(session);
  const [selectedStar, setSelectedStar] = useState(5);
  const [text, setText] = useState("");
  const queryClient = useQueryClient();

  const { data: reviews, isPending: isPendingQuery } = useQuery({
    queryFn: () => getReviewsByListing(id),
    queryKey: ["reviews"],
  });

  const { mutate, isPending } = useMutation({
    mutationFn: handleSubmit,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reviews"],
      });
      queryClient.invalidateQueries({
        queryKey: ["listings"],
      });
    },
  });

  const itemsPerPage = 4;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentReviews = reviews?.slice(itemOffset, endOffset);
  
  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      if (text === "") return toast.error("Review cant be empty");
      const body = {
        text,
        stars: selectedStar,
      };
      await postReview(id, body);
      toast.success("Successfully posted a review");
      setText("");
    } catch (error: any) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="mt-8 flex items-center gap-6">
        {Array.from(Array(5).keys()).map((_, number) => (
          <span
            key={number}
            onClick={() => setSelectedStar(number + 1)}
            className={`${selectedStar === number + 1 ? "scale-125" : ""}
            cursor-pointer flex items-center gap-2 transition-all`}
          >
            {number + 1}
            <AiFillStar size={22} color="rgb(59, 130, 246)" />
          </span>
        ))}
      </div>
      <div className="mt-8 flex items-center gap-28 border rounded-lg py-4 px-6 w-max">
        <input
          className="outline-none"
          type="text"
          placeholder="Leave your opinion..."
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <button
          disabled={isPending}
          onClick={mutate}
          className="cursor-pointer rounded-lg py-2 px-6 text-xl text-white bg-blue-500 hover:bg-blue-400 transition-all"
        >
          Post
        </button>
      </div>
      <div className="mt-16 h-[900px] flex flex-col gap-24 w-1/3">
        {currentReviews?.map((review: any) => (
          <Review key={review.id} review={review} />
        ))}
        <Pagination
          setItemOffset={setItemOffset}
          itemsPerPage={itemsPerPage}
          reviews={reviews}
        />
      </div>
    </>
  );
};

export default Reviews;
