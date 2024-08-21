"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillStar, AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { MdDashboard, MdHotel } from "react-icons/md";


const Sidebar = () => {
  const currentPage = usePathname().split("/")[2];
  const sidebarData = [
    {
      text: "Dashboard",
      icon: MdDashboard,
      href: "/admin/dashboard",
      isCurrentpage: currentPage === "dashboard",
    },
    {
      text: "Users",
      icon: AiOutlineUser,
      href: "/admin/users",
      isCurrentpage: currentPage === "users",
    },
    {
      text: "Listings",
      icon: MdHotel,
      href: "/admin/listings",
      isCurrentpage: currentPage === "listings",
    },
    {
      text: "Reviews",
      icon: AiFillStar,
      href: "/admin/reviews",
      isCurrentpage: currentPage === "reviews",
    },
  ];
  return (
    <div className="w-full flex flex-col justify-between">
      <div className="h-full w-full flex flex-col gap-10 col-span-1">
        {sidebarData.map((data: any, idx: any) => (
          <Link
            key={data.text}
            href={data.href}
            className={`flex items-center gap-2 p-3 rounded-xl transition-all cursor-pointer ${
              data.isCurrentpage && "bg-blue-600"
            }`}
          >
            <span>
                {
                    <data.icon color={data.isCurrentpage ? "#fff":"#cec7cc"}/>
                }
            </span>
            <span className={`${data.isCurrentpage ? "text-white":"text-[#cec7c7]"}`}>
                {data.text}
            </span>
            
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
