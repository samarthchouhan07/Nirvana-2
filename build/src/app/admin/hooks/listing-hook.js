import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteListing } from "../(pages)/listings/service";
export var useListingHook = function () {
    var queryClient = useQueryClient();
    var _a = useMutation({
        mutationFn: function (id) { return deleteListing(id); },
        onSuccess: handleSuccess,
    }), handleDeleteListing = _a.mutate, isPending = _a.isPending;
    function handleSuccess() {
        toast.success("Successfully deleted a listing");
        queryClient.invalidateQueries({
            queryKey: ["admin", "listings"],
        });
    }
    return {
        handleDeleteListing: handleDeleteListing,
        isPending: isPending,
    };
};
