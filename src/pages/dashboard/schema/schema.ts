export type T_Sales = {
  totalBills: number;
  totalSales: number;
};

export type T_BestProductSellers = {
  productId: string;
  totalQuantitySold: number;
  product: {
    id: string;
    name: string;
    price: number;
  };
};
export type T_ProductAlert = {
  name: string;
  shortName: string;
  price: number;
  quantity: number;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
};
