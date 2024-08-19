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
const UserModal = ({ userId, handleHideModal }) => {
    const { data: user, isPending } = useQuery({
        queryFn: () => getUserById(userId),
        queryKey: ["admin", "users", { userId }],
    });
    const { register, handleSubmit, reset } = useForm({
        resolver: zodResolver(schema),
    });
    useEffect(() => {
        if (user) {
            reset({ username: user.username, email: user.email });
        }
    }, [user, reset]);
    const querClient = useQueryClient();
    const { mutate: handleUpdateUser, isPending: isPendingMutation } = useMutation({
        mutationFn: ({ userId, data }) => updateUser({ userId, data }),
        onSuccess: () => {
            toast.success("Successfully updated the user ");
            querClient.invalidateQueries({
                queryKey: ["admin", "users"],
            });
        },
    });
    useEffect(() => {
        reset({
            username: user === null || user === void 0 ? void 0 : user.username,
            email: user === null || user === void 0 ? void 0 : user.email,
        });
    }, [user === null || user === void 0 ? void 0 : user.username, user === null || user === void 0 ? void 0 : user.email, reset]);
    const onSubmit = (data) => {
        handleUpdateUser({ userId, data });
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
