"use client";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Input from "@/ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { schema } from "./schema";
import Select from "@/ui/Select";
import { optionLocations, optionTypes } from "@/data/data";
import Button from "@/ui/Button";
import toast from "react-hot-toast";
import { createNewListing, postImages } from "./service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import ModalLayout from "../../layout/ModalLayout";
const CreateModal = ({ handleHideModal }) => {
    const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUD_NAME;
    const UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET;
    const router = useRouter();
    const [images, setImages] = useState([]);
    const { mutateAsync, isPending } = useMutation({
        mutationFn: ({ data, imageUrls }) => createNewListing(data, imageUrls),
        mutationKey: ["listings"],
    });
    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            desc: "",
            beds: 5,
            hasFreeWifi: false,
            type: "luxury",
            location: "dubai",
            pricePerNight: 123,
        },
    });
    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            Object.keys(errors).forEach((key) => {
                var _a;
                const errorKey = key;
                const errorMessage = (_a = errors[errorKey]) === null || _a === void 0 ? void 0 : _a.message;
                if (errorMessage) {
                    toast.error(errorMessage);
                }
            });
        }
    }, [errors]);
    const uploadImage = (image, idx) => __awaiter(void 0, void 0, void 0, function* () {
        if (!image)
            return;
        const toastId = toast.loading(`Image ${idx + 1} is being uploaded`);
        const formData = new FormData();
        formData.append("file", image);
        if (UPLOAD_PRESET) {
            formData.append("upload_preset", UPLOAD_PRESET);
        }
        try {
            const imageUrl = yield postImages(CLOUD_NAME, formData);
            toast.success(`Successfully uploaded image ${idx + 1}`);
            toast.dismiss(toastId);
            return imageUrl;
        }
        catch (error) {
            console.error(error);
            toast.error(`Failed to upload image ${idx + 1}`);
        }
    });
    const onSubmit = (data) => __awaiter(void 0, void 0, void 0, function* () {
        if (!images.length)
            return toast.error("You must upload at least one image");
        const imageUrls = yield Promise.all(images.map((image, idx) => uploadImage(image, idx)));
        const newListing = yield mutateAsync({ data, imageUrls: imageUrls.filter(Boolean) });
        toast.success("Redirecting to listing...");
        router.push(`/details/${newListing.id}`);
    });
    const handleImage = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImages((prev) => [...prev, e.target.files[0]]);
        }
    };
    return (<ModalLayout isCreating document="listing" handleHideModal={handleHideModal}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full px-4 py-6 flex flex-col items-center gap-8">
        <Input type="text" register={register("name")} className="text-slate-400 w-[350px] outline-none p-2" placeholder="Arabian Paradise"/>
        <Input type="text" register={register("desc")} className="text-slate-400 w-[350px] outline-none p-2" placeholder="This hotel is amazing. It has this view....."/>
        <Select register={register("location")} data={optionLocations} className="text-slate-400 w-[350px] outline-none p-2 ml-2"/>
        <Select register={register("type")} data={optionTypes} className="text-slate-400 w-[350px] outline-none p-2 ml-2"/>
        <Input type="number" register={register("pricePerNight", { valueAsNumber: true })} className="text-slate-400 w-[350px] outline-none p-2" step={0.01} placeholder="$249.00"/>
        <Input type="number" register={register("beds", { valueAsNumber: true })} className="text-slate-400 w-[350px] outline-none p-2" step={1}/>
        <div className="text-slate-400 ml-4 items-center w-[350px] flex gap-4">
          <label>Free Wifi</label>
          <Input register={register("hasFreeWifi")} type="checkbox" id="freeWifi" className="w-4 h-4"/>
        </div>
        <label className="text-slate-400 w-[350px] ml-4" htmlFor="images">
          Upload Images
        </label>
        <input onChange={handleImage} type="file" className="text-slate-400" style={{ display: "none" }} id="images"/>
        <Button disabled={isPending} className="w-2/3 bg-blue-500 text-white px-4 py-2 rounded-xl disabled:bg-blue-700" label="Submit"/>
      </form>
    </ModalLayout>);
};
export default CreateModal;
