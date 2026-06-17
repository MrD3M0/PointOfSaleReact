import axiosInstance from "@/lib/axios-request";
import type { T_CreateBillingData } from "../types/types";
import { UrlConstants } from "@/constants/endpoints";

export const createBilling = async (data: T_CreateBillingData) => {
  const response = await axiosInstance.post(
    `${UrlConstants.BILLING_URL}`,
    data,
  );
  return response.data;
};
