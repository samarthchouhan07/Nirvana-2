import AXIOS_API from "@/utils/axiosApi";

export async function getUserReservations() {
  const { data } = await AXIOS_API.get(`/reservation`);
  return data;
}

export async function deleteReservation({
  chargeId,
  reservationId,
}: {
  chargeId: string;
  reservationId: string;
}) {
  try {
    const { data: refundData } = await refundPayment({ chargeId, reservationId });
    const { data } = await AXIOS_API.delete(`/reservation/${reservationId}`);
    return { data };
  } catch (error) {
    throw new Error("Couldn't delete the reservation");
  }
}

async function refundPayment({ chargeId, reservationId }: { chargeId: string; reservationId: string }) {
  try {
    const { data } = await AXIOS_API.delete(
      `/square?chargeId=${chargeId}&reservation_id=${reservationId}`
    );
    return { data };
  } catch (error) {
    throw new Error("Couldn't refund the payment");
  }
}
