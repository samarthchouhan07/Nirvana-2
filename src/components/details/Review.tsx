import Image from "next/image";
import React from "react";
import { AiFillStar } from "react-icons/ai";
import person_image from "../../../public/bianco_2.png"
import { format } from "date-fns";

type Props = { review: any };

const Review:React.FC<Props> = ({ review }) => {
  const createdAt = new Date(review.createdAt);
  console.log(review);
  return (
      <div className="w-full flex gap-4 ">
        <div className="w-14 h-14">
          <Image
          height="56" width="56"
            src={person_image}
            alt=""
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div>
          <h3 className="font-semibold text-[20px]">John Doe</h3>
          <span className="text-slate-700">
            {format(createdAt, "MMM do yyyy")}
          </span>
          <div className="mt-4 text-slate-800">{review.text}</div>
        </div>
        <span className="ml-auto flex items-center gap-2">
          {review.stars} <AiFillStar size={22} color="rgb(59,130,246)" />
        </span>
      </div>
  );
};

export default Review;
