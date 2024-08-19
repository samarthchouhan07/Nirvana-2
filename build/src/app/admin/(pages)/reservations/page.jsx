"use client";
import React from "react";
import Card from "@/app/(pages)/reservations/Card";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteReservation, getUserReservations, } from "@/app/(pages)/reservations/service";
import toast from "react-hot-toast";
import AdminLayout from "../../layout/AdminLayout";
var Reservations = function () {
    console.log("page got hit?");
    var queryClient = useQueryClient();
    var _a = useQuery({
        queryKey: ["reservations"],
        queryFn: getUserReservations,
    }), data = _a.data, isLoading = _a.isLoading;
    console.log(data);
    var handleSuccess = function () {
        toast.success("Successfully deleted a reservation");
        queryClient.invalidateQueries({
            queryKey: ["reservations"],
        });
    };
    var mutate = useMutation({
        mutationFn: function (_a) {
            var chargeId = _a.chargeId, reservationId = _a.reservationId;
            return deleteReservation({ chargeId: chargeId, reservationId: reservationId });
        },
        onSuccess: handleSuccess,
    }).mutate;
    return (<AdminLayout>
      <div className="p-6 lg:p-12 min-h-screen w-full bg-gray-50">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Reservations</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {(data === null || data === void 0 ? void 0 : data.length) > 0 ? (data === null || data === void 0 ? void 0 : data.map(function (reservation) { return (<Card key={reservation.id} reservation={reservation} mutate={mutate}/>); })) : (<div className="col-span-full text-center">
              <h2 className="text-xl font-semibold text-gray-600">
                You have no reservations.
              </h2>
            </div>)}
        </div>
      </div>
    </AdminLayout>);
};
export default Reservations;
