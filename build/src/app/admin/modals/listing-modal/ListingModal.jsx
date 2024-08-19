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
import React, { useEffect, useState } from "react";
import ModalLayout from "../../layout/ModalLayout";
import Input from "@/ui/Input";
import Select from "@/ui/Select";
import { optionLocations, optionTypes } from "@/data/data";
import Button from "@/ui/Button";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getListingById } from "@/app/details/[id]/service";
import { updateListing } from "../../(pages)/listings/service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";
import toast from "react-hot-toast";
import { postImages } from "./service";
const ListingModal = ({ handleHideModal, listingId }) => {
    const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUD_NAME;
    const UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET;
    const [images, setImages] = useState([]);
    const router = useRouter();
    const { data: listing } = useQuery({
        queryFn: () => getListingById(listingId),
        queryKey: ["admin", "listings", { listingId }],
    });
    const { mutateAsync, isPending: isPendingMutation } = useMutation({
        mutationFn: ({ listingId, body }) => updateListing({ listingId, body }),
    });
    const { register, handleSubmit, reset, formState: { errors }, } = useForm({
        resolver: zodResolver(schema),
    });
    useEffect(() => {
        reset(Object.assign({}, listing));
    }, [
        listing === null || listing === void 0 ? void 0 : listing.name,
        listing === null || listing === void 0 ? void 0 : listing.desc,
        listing === null || listing === void 0 ? void 0 : listing.beds,
        listing === null || listing === void 0 ? void 0 : listing.type,
        listing === null || listing === void 0 ? void 0 : listing.hasFreeWifi,
        listing === null || listing === void 0 ? void 0 : listing.location,
        listing === null || listing === void 0 ? void 0 : listing.pricePerNight,
        listing,
        reset
    ]);
    const handleImage = (e) => {
        console.log("handleImage got hit");
        if (e.target.files && e.target.files[0]) {
            setImages((prev) => [...prev, e.target.files[0]]);
        }
    };
    const uploadImage = (image, idx) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(idx, image);
        if (!image)
            return;
        const toastId = toast.loading(`Image ${idx + 1} is being uploaded`);
        if (!UPLOAD_PRESET) {
            toast.error("Upload preset is not defined");
            return;
        }
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", UPLOAD_PRESET);
        try {
            const imageUrl = yield postImages(CLOUD_NAME, formData);
            toast.success(`Successfully uploaded image ${idx + 1}`);
            toast.dismiss(toastId);
            return imageUrl;
        }
        catch (error) {
            console.error(error);
        }
    });
    const onSubmit = (data) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(data);
        const imageUrls = yield Promise.all(images.map((image, idx) => {
            console.log(image, idx);
            const imageUrl = uploadImage(image, idx);
            return imageUrl;
        }));
        const body = data;
        if ((imageUrls === null || imageUrls === void 0 ? void 0 : imageUrls.length) > 0)
            body.imageUrls = imageUrls;
        else
            body.imageUrls = listing.imageUrls;
        const updatedListing = yield mutateAsync({ listingId, body });
        toast.success("Redirecting to listings..");
        router.push(`/details/${updatedListing.id}`);
    });
    return (<ModalLayout document="listing" handleHideModal={handleHideModal}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full px-4 py-6 flex flex-col items-center gap-8">
        <Input className="w-[300px] px-2 py-2 rounded-xl" type="text" placeholder="Grand Hotel" register={register("name")}/>
        <Input className="w-[300px] px-2 py-2 rounded-xl" type="text" placeholder="The hotel was great..." register={register("desc")}/>
        <Select register={register("location")} data={optionLocations} className="w-[300px] px-2 py-2 rounded-xl"/>
        <Select register={register("type")} data={optionTypes} className="w-[300px] px-2 py-2 rounded-xl"/>
        <Input className="w-[300px] px-2 py-2 rounded-xl" type="number" placeholder="$249" register={register("pricePerNight", { valueAsNumber: true })} step={0.01}/>
        <Input className="w-[300px] px-2 py-2 rounded-xl" type="number" register={register("beds", { valueAsNumber: true })}/>
        <div className="text-slate-400 rounded-md ml-4 w-2/3 flex gap-4">
          <label htmlFor="freeWifi">Free Wifi</label>
          <Input className="h-4 w-4" type="checkbox" register={register("hasFreeWifi")} id="freeWifi"/>
        </div>
        <label className="text-slate-400 rounded-md w-2/3 ml-4" htmlFor="images">
          Upload Images
        </label>
        <input type="file" onChange={handleImage} style={{ display: "none" }} id="images"/>
        <Button disabled={isPendingMutation} label="Submi"/>
      </form>
    </ModalLayout>);
};
export default ListingModal;
