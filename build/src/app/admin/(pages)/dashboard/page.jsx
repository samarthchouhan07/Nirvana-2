"use client";
import React from "react";
import AdminLayout from "../../layout/AdminLayout";
import { AiFillBank, AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { MdHotel } from "react-icons/md";
import { useWidgetHook } from "../../hooks/widget-hook";
import Widget from "../../components/Widget";
import BigWidget from "../../components/BigWidget";
import Chart from "../../components/Chart";
var Dashboard = function () {
    var _a = useWidgetHook(), usersQuery = _a[0], listingsQuery = _a[1], reservationsQuery = _a[2], revenueQuery = _a[3], mostReservedQuery = _a[4];
    console.log(revenueQuery.data);
    var widgetData = [
        {
            page: "users",
            data: usersQuery.data,
            icon: <AiOutlineUser color="#efefef"/>,
        },
        {
            page: "listings",
            data: listingsQuery.data,
            icon: <MdHotel color="#efefef"/>,
        },
        {
            page: "reservations",
            data: reservationsQuery.data,
            icon: <AiOutlineHome color="#efefef"/>,
        },
        {
            page: "revenue",
            data: revenueQuery.data,
            icon: <AiFillBank color="#efefef"/>,
        },
    ];
    console.log(widgetData);
    return <AdminLayout>
  <div className="ml-2 w-full h-full flex flex-col col-span-7 overflow-visible ">
    <div className="grid grid-cols-4 gap-8">
      {widgetData === null || widgetData === void 0 ? void 0 : widgetData.map(function (_a) {
            var page = _a.page, data = _a.data, icon = _a.icon;
            return (<Widget key={page} page={page} data={data} icon={icon}/>);
        })}
    </div>
    <div className="mt-28 grid grid-cols-7 gap-16">
      <BigWidget listing={mostReservedQuery.data}/>
      <Chart />
    </div>
  </div>
    </AdminLayout>;
};
export default Dashboard;
