import axiosInstance from "@/lib/axios-request";
import type { T_CreateBillingData } from "../types/types";
import { UrlConstants } from "@/constants/endpoints";

export const createBilling = async (data: T_CreateBillingData) => {
  // Check if discount is NaN, null, or undefined, and fall back to 0
  const safeDiscount = isNaN(data.discount) ? 0 : data.discount;

  const response = await axiosInstance.post(`${UrlConstants.BILLING_URL}`, {
    ...data,
    discount: safeDiscount, // Overwrites the discount with 0 if it was NaN
  });

  return response.data;
};
