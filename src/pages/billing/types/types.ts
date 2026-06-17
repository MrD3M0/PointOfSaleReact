export type T_BillingItem = {
  productId: string;
  quantity: number;
};

export type T_ShowBillingItem = {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  total?: number;
};

export type T_CreateBillingData = {
  discountType: string;
  discount: number;
  products: T_BillingItem[];
};
