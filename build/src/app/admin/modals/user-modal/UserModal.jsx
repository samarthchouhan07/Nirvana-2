"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { schema } from "./schema";
import ModalLayout from "../../layout/ModalLayout";
import Input from "@/ui/Input";
import Button from "@/ui/Button";
import { getUserById, updateUser } from "./service";
var UserModal = function (_a) {
    var userId = _a.userId, handleHideModal = _a.handleHideModal;
    var _b = useQuery({
        queryFn: function () { return getUserById(userId); },
        queryKey: ["admin", "users", { userId: userId }],
    }), user = _b.data, isPending = _b.isPending;
    useEffect(function () {
        if (user) {
            reset({ username: user.username, email: user.email });
        }
    }, [user]);
    var querClient = useQueryClient();
    var _c = useMutation({
        mutationFn: function (_a) {
            var userId = _a.userId, data = _a.data;
            return updateUser({ userId: userId, data: data });
        },
        onSuccess: function () {
            toast.success("Successfully updated the user ");
            querClient.invalidateQueries({
                queryKey: ["admin", "users"],
            });
        },
    }), handleUpdateUser = _c.mutate, isPendingMutation = _c.isPending;
    var _d = useForm({
        resolver: zodResolver(schema),
    }), register = _d.register, handleSubmit = _d.handleSubmit, reset = _d.reset;
    useEffect(function () {
        reset({
            username: user === null || user === void 0 ? void 0 : user.username,
            email: user === null || user === void 0 ? void 0 : user.email,
        });
    }, [user === null || user === void 0 ? void 0 : user.username, user === null || user === void 0 ? void 0 : user.email]);
    var onSubmit = function (data) {
        handleUpdateUser({ userId: userId, data: data });
        handleHideModal();
    };
    return (<ModalLayout document="User" handleHideModal={handleHideModal}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full px-4 py-6 flex flex-col items-center gap-8">
        <Input className="w-full px-2 py-3 rounded-xl" type="text" placeholder="samarth" register={register("username")}/>
        <Input className="w-full px-2 py-3 rounded-xl" type="email" placeholder="samarthchouhan@gmail.com" register={register("email")}/>
        <Button disabled={isPendingMutation} label="Submit" className="w-1/2 bg-blue-500 text-white px-4 py-2 rounded-xl disabled:bg-blue-700"/>
      </form>
    </ModalLayout>);
};
export default UserModal;
