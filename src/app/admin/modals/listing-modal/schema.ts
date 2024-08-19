import {z} from "zod"
import { optionLocations,optionTypes } from "@/data/data"

const locationValues = optionLocations.map(({ value }: any) => value) as [string, ...string[]];
const typeValues = optionTypes.map(({ value }: any) => value) as [string, ...string[]];


const schema=z.object({
    name:z.string().min(1,{message:"Name is required"}),
    desc:z.string().min(1,{message:"Description is required!"}),
    beds:z.number().min(1,{message:"Beds are required"}),
    hasFreeWifi:z.boolean().optional(),
    type:z.enum(typeValues),
    location:z.enum(locationValues),
    pricePerNight:z.number().min(15,{message:"Price must be above 15"}).max(50000,{message:"Price cant exceed 50000"})
})

export type ListingType = z.infer<typeof schema>;

export {schema}