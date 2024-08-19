import { useQueries } from "@tanstack/react-query";
import { getMostReservedListings } from "../modals/create-modal/service";
import { getAllListings, getAllReservations, getAllRevenue, getAllUsers } from "../../admin/services/service";
export var useWidgetHook = function () {
    var _a = useQueries({
        queries: [
            {
                queryFn: getAllUsers,
                queryKey: ["admin", "users"],
            },
            {
                queryFn: getAllListings,
                queryKey: ["admin", "listings"],
            },
            {
                queryFn: getAllReservations,
                queryKey: ["admin", "reservations"],
            },
            {
                queryFn: getAllRevenue,
                queryKey: ["admin", "revenue"],
            },
            {
                queryFn: getMostReservedListings,
                queryKey: ["admin", "most-reserved-listing"],
            },
        ],
    }), usersQuery = _a[0], listingsQuery = _a[1], reservationsQuery = _a[2], revenueQuery = _a[3], mostReservedQuery = _a[4];
    return [
        usersQuery, listingsQuery, reservationsQuery, revenueQuery, mostReservedQuery
    ];
};
