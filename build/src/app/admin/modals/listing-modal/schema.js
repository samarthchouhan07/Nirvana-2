import { z } from "zod";
import { optionLocations, optionTypes } from "@/data/data";
var locationValues = optionLocations.map(function (_a) {
    var value = _a.value;
    return value;
});
var typeValues = optionTypes.map(function (_a) {
    var value = _a.value;
    return value;
});
var schema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    desc: z.string().min(1, { message: "Description is required!" }),
    beds: z.number().min(1, { message: "Beds are required" }),
    hasFreeWifi: z.boolean().optional(),
    type: z.enum(typeValues),
    location: z.enum(locationValues),
    pricePerNight: z.number().min(15, { message: "Price must be above 15" }).max(50000, { message: "Price cant exceed 50000" })
});
export { schema };
