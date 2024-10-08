"use client";

import Image from "next/image";
import React from "react";
import image from "../../../../public/hr_1.jpg";
import Select from "@/ui/Select";
import { optionLocations, optionTypes } from "@/data/data";
import Input from "@/ui/Input";
import Button from "@/ui/Button";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema, FormSchema } from "./schema";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getFilteredListings } from "./service";
import Card from "@/components/best-hotels/Card";
import { z } from "zod";

type FormData = z.infer<typeof schema>;

const Catalog: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();


  const city = searchParams.get("city") || "";
  const min_price = searchParams.get("min_price") ? Number(searchParams.get("min_price")) : undefined;
  const max_price = searchParams.get("max_price") ? Number(searchParams.get("max_price")) : undefined;
  const type = searchParams.get("type") || "";

  const {
    city: city_name,
    value,
    image: locationImage,
  } = optionLocations.find((location) => location.value === city) || {};

  const defaultValues = {
    location: value || "",
    min_price: min_price,
    max_price: max_price,
    type: type || "",
  };

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const queryClient = useQueryClient();
  const { data: listings, isPending } = useQuery({
    queryFn: () => getFilteredListings(getValues()),
    queryKey: ["listings"],
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await getFilteredListings(data);
      queryClient.invalidateQueries({ queryKey: ["listings"] });
      const newUrl = `/catalog?city=${data.location}&min_price=${data.min_price}&max_price=${data.max_price}&type=${data.type}`;
      router.push(newUrl);
    } catch (error) {
      console.error("Error fetching listings:", error); 
    }
  };

  const displayImage = locationImage || image;


  return (
      <div className="min-h-screen w-full">
        <div className="relative h-3/5 w-full">
          <Image
            src={displayImage}
            className="brightness-50 h-screen w-full object-cover "
            alt=""
          />
          <h3 className="absolute text-6xl capitalize font-semibold flex items-center justify-center bottom-0 left-0 top-0 right-0 text-white">
            {city_name}
          </h3>
        </div>
        <div className="relative z-20 -mt-12 h-full w-full flex flex-col items-center ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="border w-2/3 h-28 border-slate-500 px-4 py-12 rounded-xl bg-blue-600 text-white flex justify-between items-center "
          >
            <div className="flex flex-col items-center gap-1">
              <h3 className="ml-1 text-[#efefef] font-semibold"> City </h3>
              <Select
                register={register("location")}
                data={optionLocations}
                className="text-blue-800 p-2 rounded-xl outline-none capitalize "
              />
            </div>
            <div className="flex flex-col items-center gap-1">
              <h3 className="ml-1 text-[#efefef] font-semibold ">Price</h3>
              <div className="flex items-center gap-2">
                <Input
                  register={register("min_price", { valueAsNumber: true })}
                  type="number"
                  placeholder="Min. Price"
                  className="text-blue-800 p-2 rounded-xl outline-none"
                />
                <Input
                  register={register("max_price", { valueAsNumber: true })}
                  type="number"
                  placeholder="Max. price"
                  className="text-blue-800 p-2 rounded-xl outline-none"
                />
              </div>
            </div>
            <div className="flex flex-col items-start gap-1">
              <h3 className="ml-1 text-[#efefef] font-semibold">Type of hotel</h3>
              <Select
                register={register("type")}
                data={optionTypes}
                className="text-blue-800 p-2 rounded-xl outline-none"
              />
            </div>
            <Button
              disabled={false}
              label="Search"
              className="mt-6 px-6 py-2 text-[20px] bg-white text-blue-600 rounded-xl transition-all hover:bg-[#efefef]"
            />
          </form>
          <div className="w-full mt-36 flex flex-wrap justify-center items-center gap-14">
            {(listings ?? []).length > 0 ? (
              listings?.map((place: any, idx: number) => (
                <Card key={idx} place={place} />
              ))
            ) : (
              <h2 className="text-center font-bold text-3xl text-slate-700">
                No Listings with those filters
              </h2>
            )}
          </div>
        </div>
      </div>
  );
};

export default Catalog;
