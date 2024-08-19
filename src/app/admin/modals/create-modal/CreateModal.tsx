"use client";

import Input from "@/ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ListingFormData, schema } from "./schema";
import Select from "@/ui/Select";
import { optionLocations, optionTypes } from "@/data/data";
import Button from "@/ui/Button";
import toast from "react-hot-toast";
import { createNewListing, postImages } from "./service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import ModalLayout from "../../layout/ModalLayout";
import { z } from "zod";

type Props = {
  handleHideModal: () => void;
};

const CreateModal = ({ handleHideModal }: Props) => {
  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUD_NAME as string;
  const UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET as string;
  const router = useRouter();
  const [images, setImages] = useState<File[]>([]);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, imageUrls }: { data: ListingFormData; imageUrls: string[] }) =>
      createNewListing(data, imageUrls),
    mutationKey: ["listings"],
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ListingFormData>({
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
        const errorKey = key as keyof typeof errors;
        const errorMessage = errors[errorKey]?.message;

        if (errorMessage) {
          toast.error(errorMessage);
        }
      });
    }
  }, [errors]);

  const uploadImage = async (image: File, idx: number): Promise<string | undefined> => {
    if (!image) return;
    const toastId = toast.loading(`Image ${idx + 1} is being uploaded`);
    const formData = new FormData();
    formData.append("file", image);
    if (UPLOAD_PRESET) {
      formData.append("upload_preset", UPLOAD_PRESET);
    }
    try {
      const imageUrl = await postImages(CLOUD_NAME, formData);
      toast.success(`Successfully uploaded image ${idx + 1}`);
      toast.dismiss(toastId);
      return imageUrl;
    } catch (error) {
      console.error(error);
      toast.error(`Failed to upload image ${idx + 1}`);
    }
  };

  const onSubmit = async (data: ListingFormData) => {
    if (!images.length) return toast.error("You must upload at least one image");
    const imageUrls = await Promise.all(
      images.map((image, idx) => uploadImage(image, idx))
    );
    const newListing = await mutateAsync({ data, imageUrls: imageUrls.filter(Boolean) as string[] });
    toast.success("Redirecting to listing...");
    router.push(`/details/${newListing.id}`);
  };

  const handleImage = (e:any) => {
    if (e.target.files && e.target.files[0]) {
      setImages((prev) => [...prev, e.target.files[0]]);
    }
  };

  return (
    <ModalLayout isCreating document="listing" handleHideModal={handleHideModal}>
      <form
    onSubmit={handleSubmit(onSubmit)}
    className="w-full px-4 py-6 flex flex-col items-center gap-8"
  >
        <Input
          type="text"
          register={register("name")}
          className="text-slate-400 w-[350px] outline-none p-2"
          placeholder="Arabian Paradise"
        />
        <Input
          type="text"
          register={register("desc")}
          className="text-slate-400 w-[350px] outline-none p-2"
          placeholder="This hotel is amazing. It has this view....."
        />
        <Select
          register={register("location")}
          data={optionLocations}
          className="text-slate-400 w-[350px] outline-none p-2 ml-2"
        />
        <Select
          register={register("type")}
          data={optionTypes}
          className="text-slate-400 w-[350px] outline-none p-2 ml-2"
        />
        <Input
          type="number"
          register={register("pricePerNight", { valueAsNumber: true })}
          className="text-slate-400 w-[350px] outline-none p-2"
          step={0.01}
          placeholder="$249.00"
        />
        <Input
          type="number"
          register={register("beds", { valueAsNumber: true })}
          className="text-slate-400 w-[350px] outline-none p-2"
          step={1}
        />
        <div className="text-slate-400 ml-4 items-center w-[350px] flex gap-4">
          <label>Free Wifi</label>
          <Input
            register={register("hasFreeWifi")}
            type="checkbox"
            id="freeWifi"
            className="w-4 h-4"
          />
        </div>
        <label className="text-slate-400 w-[350px] ml-4" htmlFor="images">
          Upload Images
        </label>
        <input
          onChange={handleImage}
          type="file"
          className="text-slate-400"
          style={{ display: "none" }}
          id="images"
        />
        <Button
          disabled={isPending}
          className="w-2/3 bg-blue-500 text-white px-4 py-2 rounded-xl disabled:bg-blue-700"
          label="Submit"
        />
      </form>
    </ModalLayout>
  );
};

export default CreateModal;
