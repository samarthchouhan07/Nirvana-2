"use client";
import React, { useEffect, useState } from "react";
import ModalLayout from "../../layout/ModalLayout";
import Input from "@/ui/Input";
import Select from "@/ui/Select";
import { optionLocations, optionTypes } from "@/data/data";
import Button from "@/ui/Button";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getListingById } from "@/app/(pages)/details/service";
import { updateListing } from "../../(pages)/listings/service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ListingType, schema } from "./schema";
import { error } from "console";
import toast from "react-hot-toast";
import { postImages } from "./service";

type Props = {
  handleHideModal:()=>void
  listingId:string
};

const ListingModal = ({ handleHideModal, listingId }: Props) => {
  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUD_NAME;
  const UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET;
  const [images, setImages] = useState<any>([]);
  const router = useRouter();
  const { data: listing } = useQuery({
    queryFn: () => getListingById(listingId),
    queryKey: ["admin", "listings", { listingId }],
  });
  const { mutateAsync, isPending: isPendingMutation } = useMutation({
    mutationFn: ({ listingId, body }: any) =>
      updateListing({ listingId, body }),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ListingType>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    reset({ ...listing });
  }, [
    listing?.name,
    listing?.desc,
    listing?.beds,
    listing?.type,
    listing?.hasFreeWifi,
    listing?.location,
    listing?.pricePerNight,
    listing,
    reset
  ]);

  const handleImage = (e:any) => {
    console.log("handleImage got hit");
    if (e.target.files && e.target.files[0]) {
      setImages((prev: File[]) => [...prev, e.target.files![0]]);
    }
  };

  const uploadImage = async (image: any, idx: any) => {
    console.log(idx,image)
    if (!image) return;

    const toastId = toast.loading(`Image ${idx + 1} is being uploaded`);

    if (!UPLOAD_PRESET) {
      toast.error("Upload preset is not defined");
      return;
    }
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const imageUrl = await postImages(CLOUD_NAME, formData);
      toast.success(`Successfully uploaded image ${idx + 1}`);
      toast.dismiss(toastId);

      return imageUrl;
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data: any) => {
    console.log(data)
    const imageUrls = await Promise.all(
      images.map((image: any, idx: Number) => {
        console.log(image,idx)
        const imageUrl = uploadImage(image, idx);
        return imageUrl;
      })
    );
    const body = data;
    if (imageUrls?.length > 0) body.imageUrls = imageUrls;
    else body.imageUrls = listing.imageUrls;

    const updatedListing = await mutateAsync({ listingId, body });
    toast.success("Redirecting to listings..");
    router.push(`/details/${updatedListing.id}`);
  };
  return (
    <ModalLayout document="listing" handleHideModal={handleHideModal}>
      <form
    onSubmit={handleSubmit(onSubmit)}
    className="w-full px-4 py-6 flex flex-col items-center gap-8"
  >
        <Input
          className="w-[300px] px-2 py-2 rounded-xl"
          type="text"
          placeholder="Grand Hotel"
          register={register("name")}
        />
        <Input
          className="w-[300px] px-2 py-2 rounded-xl"
          type="text"
          placeholder="The hotel was great..."
          register={register("desc")}
        />
        <Select
          register={register("location")}
          data={optionLocations}
          className="w-[300px] px-2 py-2 rounded-xl"
        />
        <Select
          register={register("type")}
          data={optionTypes}
          className="w-[300px] px-2 py-2 rounded-xl"
        />
        <Input
          className="w-[300px] px-2 py-2 rounded-xl"
          type="number"
          placeholder="$249"
          register={register("pricePerNight", { valueAsNumber: true })}
          step={0.01}
        />
        <Input
          className="w-[300px] px-2 py-2 rounded-xl"
          type="number"
          register={register("beds", { valueAsNumber: true })}
        />
        <div className="text-slate-400 rounded-md ml-4 w-2/3 flex gap-4">
          <label htmlFor="freeWifi">Free Wifi</label>
          <Input
            className="h-4 w-4"
            type="checkbox"
            register={register("hasFreeWifi")}
            id="freeWifi"
          />
        </div>
        <label
          className="text-slate-400 rounded-md w-2/3 ml-4"
          htmlFor="images"
        >
          Upload Images
        </label>
        <input
          type="file"
          onChange={handleImage}
          style={{ display: "none" }}
          id="images"
        />
        <Button disabled={isPendingMutation} label="Submi" />
      </form>
    </ModalLayout>
  );
};

export default ListingModal;
