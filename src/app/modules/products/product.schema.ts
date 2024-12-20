import { z } from "zod";
export const ProductSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    price: z.string().min(1, "Price is required"),
    discountPercentage: z.string().optional(),
    discountedPrice: z.string().optional(),
    description: z.string().min(1, "Description is required"),
    quantity: z.string().min(1, "Quantity is required"),
    active: z.string(),
  }),
});
