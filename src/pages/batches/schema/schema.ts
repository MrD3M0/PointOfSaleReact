import z from "zod";

export const batchCreateInputSchema = z.object({
  productId: z
    .string({ message: "Product ID is required" })
    .min(1, "Product ID is required"),
  batchNumber: z
    .string()
    .min(1, "Batch number cannot be empty")
    .max(50, "Batch number must be at most 50 characters")
    .optional(),
  costPrice: z
    .number({ message: "Cost price is required" })
    .positive("Cost price must be a positive number"),
  price: z
    .number({ message: "Price is required" })
    .positive("Price must be a positive number"),
  quantity: z
    .number({ message: "Quantity is required" })
    .int("Quantity must be an integer")
    .nonnegative("Quantity cannot be negative")
    .default(0),
});

export type T_BatchCreateInput = z.infer<typeof batchCreateInputSchema>;
