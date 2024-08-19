"use client";
import Image from "next/image";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import ActionsCell from "./ActionCell";
export var columns = [
    {
        accessorKey: "image",
        header: "Image",
        cell: function (_a) {
            var _b;
            var row = _a.row;
            var image = (_b = row.original) === null || _b === void 0 ? void 0 : _b.imageUrls[0];
            return (<div>
          <Image className="rounded-full object-cover" width={35} height={35} src={image} alt="listing's image"/>
        </div>);
        },
    },
    {
        accessorKey: "location",
        header: "Location",
        cell: function (_a) {
            var row = _a.row;
            var location = row.getValue("location");
            return <span className="capitalize">{location}</span>;
        },
    },
    {
        accessorKey: "pricePerNight",
        header: function (_a) {
            var column = _a.column;
            return (<button className="flex items-center gap-1" onClick={function () { return column.toggleSorting(column.getIsSorted() === "asc"); }}>
          Price per night
          <span className="flex items-center">
            <AiOutlineArrowUp />
            <AiOutlineArrowDown />
          </span>
        </button>);
        },
        cell: function (_a) {
            var row = _a.row;
            var pricePerNight = row.getValue("pricePerNight");
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
        cell: function (_a) {
            var row = _a.row;
            return <ActionsCell listingId={row.original.id}/>;
        },
    },
];
