"use client";
import React from "react";
import Card from "@/app/(pages)/reservations/Card";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteReservation,
  getUserReservations,
} from "@/app/(pages)/reservations/service";
import toast from "react-hot-toast";
import AdminLayout from "../../layout/AdminLayout";

const Reservations = () => {
  console.log("page got hit?");
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["reservations"],
    queryFn: getUserReservations,
  });
  console.log(data);

  const handleSuccess = () => {
    toast.success("Successfully deleted a reservation");
    queryClient.invalidateQueries({
      queryKey: ["reservations"],
    });
  };

  const { mutate } = useMutation({
    mutationFn: ({
      chargeId,
      reservationId,
    }: {
      chargeId: string;
      reservationId: string;
    }) => deleteReservation({ chargeId, reservationId }),
    onSuccess: handleSuccess,
  });

  return (
    <AdminLayout>
      <div className="p-6 lg:p-12 min-h-screen w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Reservations</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {data?.length > 0 ? (
            data?.map((reservation: any) => (
              <Card
                key={reservation.id}
                reservation={reservation}
                mutate={mutate}
              />
            ))
          ) : (
            <div className="col-span-full text-center">
              <h2 className="text-xl font-semibold text-gray-600">
                You have no reservations.
              </h2>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Reservations;
