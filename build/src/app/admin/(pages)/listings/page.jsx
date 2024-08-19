"use client";
import React from "react";
import AdminLayout from "../../layout/AdminLayout";
import { DataTable } from "../../components/Data-table";
import { columns } from "./table/Column";
import { useQuery } from "@tanstack/react-query";
import { getAllListings } from "../../services/service";
import Loader from "@/ui/Loader";
var Listings = function () {
    var _a = useQuery({
        queryFn: getAllListings,
        queryKey: ["admin", "listings"],
    }), allListings = _a.data, isPending = _a.isPending;
    if (isPending) {
        return <Loader />;
    }
    return (<AdminLayout>
      <div className="ml-12 h-screen w-full">
        <h2 className="text-3xl text-slate-800 font-bold whitespace-nowrap">
          All Listings
        </h2>
        <div className="mt-2 h-2/3 w-[50vw]">
          <DataTable columns={columns} data={allListings}/>
        </div>
      </div>
    </AdminLayout>);
};
export default Listings;
