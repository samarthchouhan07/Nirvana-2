"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { AiOutlineHome } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { IoCreateOutline } from "react-icons/io5";
import CreateModal from "../modals/create-modal/CreateModal";
import { signOut } from "next-auth/react";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [popupUser, setPopupUser] = useState<boolean>(false);
  const currentPath = usePathname();

  const handleHideModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const toggleModal = () => setPopupUser((prev) => !prev);

  return (
    <div className="sticky top-0 left-0 w-full flex justify-between items-center">
      <Link href="/" className="flex items-center gap-2 transition-all">
        <h1 className="text-blue-600 text-2xl font-bold">Nirvana</h1>
        <AiOutlineHome size={25} color="rgb(37 99 235)" />
      </Link>
      <div className="flex items-center gap-6">
        {currentPath === "/admin/dashboard" && (
          <button
            onClick={handleShowModal}
            className="bg-[#4522f4] px-2 py-1 cursor-pointer rounded-xl transition hover:bg-[#5738f2]"
          >
            <IoCreateOutline size={20} color="#fff" />
          </button>
        )}
        <button className="cursor-pointer" onClick={toggleModal}>
          <FaUser size={22} color="rgb(37 99 235)" />
        </button>
        {popupUser && (
          <div
            onClick={toggleModal}
            className="absolute top-16 right-[10px] shadow-md flex flex-col items-center gap-4 p-4 bg-white rounded-xl"
          >
            <Link href="/admin/reservations">Reservations</Link>
            <button
              onClick={() => signOut()}
              className="text-slate-500 text-center"
            >
              Logout
            </button>
          </div>
        )}
        {showModal && <CreateModal handleHideModal={handleHideModal} />}
      </div>
    </div>
  );
};

export default Navbar;
