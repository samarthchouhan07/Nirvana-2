import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../(pages)/users/service";
import toast from "react-hot-toast";
export var useUserHook = function () {
    var queryClient = useQueryClient();
    var _a = useMutation({
        mutationFn: function (id) { return deleteUser(id); },
        onSuccess: handleSuccess,
    }), handleDeleteUser = _a.mutate, isPending = _a.isPending;
    function handleSuccess() {
        toast.success("Successfully deleted the user");
        queryClient.invalidateQueries({
            queryKey: ["admin", "users"],
        });
    }
    return {
        handleDeleteUser: handleDeleteUser,
        isPending: isPending,
    };
};
