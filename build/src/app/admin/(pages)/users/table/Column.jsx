"use client";
import Image from 'next/image';
import person_image from '../../../../../../public/bianco_2.png';
import { format } from 'timeago.js';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
// import UserModal 
import React from 'react';
import UserActionsCell from './UserActionsCell';
export var columns = [
    {
        accessorKey: "profilePhoto",
        header: "Profile Photo",
        cell: function (_a) {
            var row = _a.row;
            return (<Image className="h-10 w-10 rounded-full object-cover" height="40" width="50" src={person_image} alt="Person image"/>);
        }
    },
    {
        accessorKey: "username",
        header: "Username",
    },
    {
        accessorKey: "email",
        header: function (_a) {
            var column = _a.column;
            return (<button className="flex items-center gap-1" onClick={function () { return column.toggleSorting(column.getIsSorted() === "asc"); }}>
                    Email
                    <span className="flex items-center">
                        <AiOutlineArrowUp />
                        <AiOutlineArrowDown />
                    </span>
                </button>);
        },
    },
    {
        accessorKey: "reservations",
        header: function (_a) {
            var column = _a.column;
            return (<button className="Flex items-center gap-1" onClick={function () { return column.toggleSorting(column.getIsSorted() === "asc"); }}>
                    Reservations
                    <span className="flex items-center">
                        <AiOutlineArrowUp />
                        <AiOutlineArrowDown />
                    </span>
                </button>);
        },
        cell: function (_a) {
            var _b;
            var row = _a.row;
            var value = ((_b = row.getValue("reservations")) === null || _b === void 0 ? void 0 : _b.length) || 0;
            return (<div>
                    {value} reservations
                </div>);
        }
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
        cell: function (_a) {
            var row = _a.row;
            var value = row.getValue("createdAt");
            return (<div>
                    {format(value)}
                </div>);
        }
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: function (_a) {
            var row = _a.row;
            return <UserActionsCell userId={row.original.id}/>;
        },
    },
];
