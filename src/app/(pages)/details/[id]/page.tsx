"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { register } from "swiper/element";
import { AiFillStar } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import { format } from "currency-formatter";
import { FaBed } from "react-icons/fa";
import { TiWiFi } from "react-icons/ti";
import BookModal from "@/components/book-modal/BookModal";
import { useQuery } from "@tanstack/react-query";
import { getListingById } from "./service";
import Reviews from "@/components/details/Reviews";
import Loader from "@/ui/Loader";

type Props = {
  params: {
    id: string;
  };
};

register();

const HotelDetails = (ctx: any) => {
  console.log(ctx)
  const id = ctx.params?.id;
  const [showModal, setShowModal] = useState(false);
  const swiperElRef = useRef(null);
  console.log(id);
 

  const { data: listing, isPending  ,isError, error} = useQuery({
    queryKey: ["listings", { id }],
    queryFn: () => getListingById(id),
  });
  if (isError) {
    console.error("Error fetching listing:", error);
    return <p>Error loading listing details</p>;
  }

  if (!listing) {
    return <p>Listing not found</p>;
  }
  console.log(listing)

  const handleShowModal = () => setShowModal(true);
  const handleHideModal = () => setShowModal(false);

  if (isPending) {
    const style: React.CSSProperties = {
      marginTop: "5rem",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)",
      height: "100vh",
    };
    return (
      <div >
        <Loader />
      </div>
    );
  }
  return (
    <div
      className={`min-h-screen w-full mt-24 ${showModal && "overflow-hidden"}`}
    >
      {showModal && (
        <BookModal handleHideModal={handleHideModal} listing={listing} />
      )}
      <div className="h-full w-3/4 mx-auto">
        <div>
          <div className="w-full h-[750px] overflow-hidden mx-auto">
            <div className="w-full h-full">
              <Swiper
                modules={[Navigation]}
                ref={swiperElRef}
                slidesPerView={1}
                navigation
              >
                {listing?.imageUrls?.map((imageUrl: any) => (
                  <SwiperSlide key={imageUrl}>
                    <Image
                      className="h-[750px] w-full object-cover rounded-lg"
                      height={750}
                      width={750}
                      src={imageUrl}
                      blurDataURL={listing.blurredImage}
                      alt=""
                      placeholder="blur"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div className="mt-12 px-6 w-full flex items-center justify-between">
            <h2 className="font-bold text-4xl">{listing.name}</h2>
            <div>
              <span className="p-2 px-4 text-[22px] rounded-full bg-blue-600 text-white flex items-center gap-2 ">
                <AiFillStar color="white" />
                <span className="text-white">{listing.avgRating}</span>
              </span>
            </div>
          </div>
          <div className="mt-16 px-6 flex items-center gap-8">
            <span className="flex items-center gap-2">
              <CiLocationOn /> {listing.location}
            </span>
            <span className="flex items-center gap-2">
              {format(listing.pricePerNight, { locale: "en-US" })}/night
            </span>
            <span className="flex items-center gap-2">
              {listing.beds} <FaBed />
            </span>
            {listing.hasFreeWifi && (
              <span className="flex items-center gap-2">
                Free <TiWiFi />
              </span>
            )}
          </div>
          <div className="mt-16 px-6 w-full flex items-end justify-between">
            <p className="text-xl max-w-xl text-slate-700">
              {listing.desc}
            </p>
            <button
              onClick={handleShowModal}
              className="cursor-pointer rounded-lg py-2 px-6 text-xl text-white bg-blue-500"
            >
              Book
            </button>
          </div>
        </div>
        <Reviews id={id}/>
      </div>
    </div>
  );
};

export default HotelDetails;
