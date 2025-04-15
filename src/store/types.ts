import { store } from "./store";

export type RootState = ReturnType<typeof store.getState>;
export type ProductType = {
  categoryId: number;
  createdAt: string;
  description: string;
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  stock: number;
};
