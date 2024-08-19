"use client"
import Image from 'next/image'
import person_image from '../../../../../../public/bianco_2.png'
import { format } from 'timeago.js'
import { FaPen, FaTrash } from "react-icons/fa"
import { useUserHook } from "../../../hooks/user-hook"
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai'
// import UserModal 
import React, { useState } from 'react'
import UserModal from '@/app/admin/modals/user-modal/UserModal'
import UserActionsCell from './UserActionsCell'

export const columns = [
    {
        accessorKey: "profilePhoto",
        header: "Profile Photo",
        cell: ({ row }:any) => {
            return (
                <Image
                    className="h-10 w-10 rounded-full object-cover"
                    height="40"
                    width="50"
                    src={person_image}
                    alt="Person image"
                />
            )
        }
    },
    {
        accessorKey: "username",
        header: "Username",
    },
    {
        accessorKey: "email",
        header: ({ column }:any) => {
            return (
                <button
                    className="flex items-center gap-1"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <span className="flex items-center">
                        <AiOutlineArrowUp />
                        <AiOutlineArrowDown />
                    </span>
                </button>
            )
        },
    },
    {
        accessorKey: "reservations",
        header: ({ column }:any) => {
            return (
                <button
                    className="Flex items-center gap-1"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Reservations
                    <span className="flex items-center">
                        <AiOutlineArrowUp />
                        <AiOutlineArrowDown />
                    </span>
                </button>
            )
        },
        cell: ({ row }:any) => {
            const value = row.getValue("reservations")?.length || 0
            return (
                <div>
                    {value} reservations
                </div>
            )
        }
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }:any) => {
            const value = row.getValue("createdAt")
            return (
                <div>
                    {format(value)}
                </div>
            )
        }
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell:  ({ row }: any) => <UserActionsCell userId={row.original.id} />,
    },
]