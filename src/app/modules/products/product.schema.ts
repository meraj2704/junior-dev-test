import { z } from "zod";
export const ProductSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    price: z.string().min(1, "Price is required"),
    description: z.string().min(1, "Description is required"),
    quantity: z.string().min(1, "Quantity is required"),
    active: z.string(),
  }),
});
