"use client";
import Image from 'next/image';
import person_image from '../../../../../../public/bianco_2.png';
import { format } from 'timeago.js';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
// import UserModal 
import React from 'react';
import UserActionsCell from './UserActionsCell';
export const columns = [
    {
        accessorKey: "profilePhoto",
        header: "Profile Photo",
        cell: ({ row }) => {
            return (<Image className="h-10 w-10 rounded-full object-cover" height="40" width="50" src={person_image} alt="Person image"/>);
        }
    },
    {
        accessorKey: "username",
        header: "Username",
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (<button className="flex items-center gap-1" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
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
        header: ({ column }) => {
            return (<button className="Flex items-center gap-1" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Reservations
                    <span className="flex items-center">
                        <AiOutlineArrowUp />
                        <AiOutlineArrowDown />
                    </span>
                </button>);
        },
        cell: ({ row }) => {
            var _a;
            const value = ((_a = row.getValue("reservations")) === null || _a === void 0 ? void 0 : _a.length) || 0;
            return (<div>
                    {value} reservations
                </div>);
        }
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => {
            const value = row.getValue("createdAt");
            return (<div>
                    {format(value)}
                </div>);
        }
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => <UserActionsCell userId={row.original.id}/>,
    },
];
