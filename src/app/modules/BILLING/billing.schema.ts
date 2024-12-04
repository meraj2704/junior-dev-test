import { z } from "zod";

export const BillSchema = z.object({
  body: z.object({
    firstName: z.string().min(1, "Name is required"),
    companyName: z.string().optional(),
    streetAddress: z.string().min(2, "Street address is required"),
    apartment: z.string().optional(),
    townOrCity: z.string().min(1, "Town or City is required"),
    phoneNumber: z.string().min(1, "Phone Number is required"),
    email: z.string().min(1, "Email is required"),
    totalPrice: z.number().min(1, "Total Price is required"),
    products: z
      .array(
        z.object({
          _id: z.string().min(1, "Product ID is required"), // Assuming _id is a string
          price: z.number().min(0, "Price must be at least 0"), // Minimum price validation
          quantity: z.number().min(1, "Quantity must be at least 1"), // Minimum quantity validation
        })
      )
      .min(1, "At least one product is required"), // Ensures products array is not empty
  }),
});
