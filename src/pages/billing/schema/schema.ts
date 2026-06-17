import z from "zod";

export const billingItemSchema = z
  .object({
    discountType: z.enum(["Percentage", "Fixed"]),
    discount: z.coerce.number(),
  })
  .refine(
    (data) => {
      if (data.discountType === "Percentage") {
        return data.discount >= 0 && data.discount <= 100;
      }
      // Fixed
      return data.discount >= 0;
    },
    {
      message:
        "Discount must be between 0 and 100 for Percentage, or non-negative for Fixed",
      // Optionally point to the field that caused the error:
      path: ["discount"],
    },
  );

export type T_BillingItemSchema = z.infer<typeof billingItemSchema>;
