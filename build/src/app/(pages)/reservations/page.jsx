"use client";
import React from "react";
import Card from "./Card";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteReservation, getUserReservations } from "./service";
import toast from "react-hot-toast";
var Reservations = function () {
    var queryClient = useQueryClient();
    var _a = useQuery({
        queryKey: ["reservations"],
        queryFn: getUserReservations,
    }), data = _a.data, isLoading = _a.isLoading;
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
    return (<div className="mt-24 px-16 min-h-screen w-full">
      <div className="h-full w-full flex flex-wrap gap-12 ">
        {(data === null || data === void 0 ? void 0 : data.length) > 0 ? (data.map(function (reservation) { return (<Card key={reservation.id} reservation={reservation} mutate={mutate}/>); })) : (<h1 className="text-center text-3xl font-bold text-slate-700 ">
            You have no reservations.
          </h1>)}
      </div>
    </div>);
};
export default Reservations;
