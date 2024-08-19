"use client";
import Image from "next/image";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import ActionsCell from "./ActionCell";
export const columns = [
    {
        accessorKey: "image",
        header: "Image",
        cell: ({ row }) => {
            var _a;
            const image = (_a = row.original) === null || _a === void 0 ? void 0 : _a.imageUrls[0];
            return (<div>
          <Image className="rounded-full object-cover" width={35} height={35} src={image} alt="listing's image"/>
        </div>);
        },
    },
    {
        accessorKey: "location",
        header: "Location",
        cell: ({ row }) => {
            const location = row.getValue("location");
            return <span className="capitalize">{location}</span>;
        },
    },
    {
        accessorKey: "pricePerNight",
        header: ({ column }) => {
            return (<button className="flex items-center gap-1" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Price per night
          <span className="flex items-center">
            <AiOutlineArrowUp />
            <AiOutlineArrowDown />
          </span>
        </button>);
        },
        cell: ({ row }) => {
            const pricePerNight = row.getValue("pricePerNight");
            return (<div>
          <span>$ {pricePerNight}</span>
        </div>);
        },
    },
    {
        accessorKey: "beds",
        header: "Beds",
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => <ActionsCell listingId={row.original.id}/>,
    },
];
