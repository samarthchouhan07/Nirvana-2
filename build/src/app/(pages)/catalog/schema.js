import { optionLocations, optionTypes } from "@/data/data";
import { z } from "zod";
const getEnumValues = (arr) => {
    if (arr.length === 0) {
        throw new Error("Array cannot be empty");
    }
    return arr.map(({ value }) => value);
};
export const schema = z.object({
    location: z.enum(getEnumValues(optionLocations)),
    min_price: z.number().min(15, { message: "Price can't be less than $15" }),
    max_price: z.number().max(50000, { message: "Price can't exceed more than $50k" }),
    type: z.enum(getEnumValues(optionTypes)),
});
