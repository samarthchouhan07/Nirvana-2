import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteReview } from "../services/service";
export var useReviewHook = function () {
    var queryClient = useQueryClient();
    var _a = useMutation({
        mutationFn: function (id) { return deleteReview(id); },
        onSuccess: handleSuccess
    }), handleDeleteReview = _a.mutate, isPending = _a.isPending;
    function handleSuccess() {
        toast.success("Successfully deleted the review");
        queryClient.invalidateQueries({
            queryKey: ["admin", "reviews"]
        });
    }
    return {
        handleDeleteReview: handleDeleteReview,
        isPending: isPending
    };
};
