import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Listing = {
  id: string;
  location: string;
  name: string;
  pricePerNight: number;
  imageUrls: string[];
};

type Reservation = {
  id: string;
  listingId: string;
  startDate: Date;
  endDate: Date;
  daysDifference: number;
  chargeId: string;
  listing: Listing;
};

type Props = {
  reservation: Reservation;
  mutate: ({ chargeId, reservationId }: { chargeId: string; reservationId: string }) => void;
};

const Card = ({ reservation, mutate }: Props) => {
  
  return (
    <div className="flex flex-col w-[300px] min-h-full">
      <Link href={`/details/${reservation.listingId}`}>
        <Image
          src={reservation.listing.imageUrls[0]}
          alt={reservation.listing.name}
          className="rounded-xl shadow-xl"
          height={200}
          width={300}
        />
      </Link>
      <div className="p-2 mt-2 flex flex-col gap-4">
        <span className="font-semibold text-lg">{reservation.listing.location}</span>
        <span className="">{reservation.listing.name}</span>
        <div>
          <span className="text-slate-500">
            {format(new Date(reservation.startDate), "MMM do yyyy")}
          </span>
          <span className="px-2">-</span>
          <span className="text-slate-500">
            {format(new Date(reservation.endDate), "MMM do yyyy")}
          </span>
        </div>
        <div>Total Price: ${reservation.daysDifference * reservation.listing.pricePerNight}</div>
        <button
          onClick={() => mutate({ chargeId: reservation.chargeId, reservationId: reservation.id })}
          className="w-full py-2 bg-red-500 text-white rounded-xl transition-all hover:bg-red-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Card;
