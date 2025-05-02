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

export type BAnnerType = {
  id: number;
  title: string;
  imageUrl: string;
  isActive: boolean;
  createdAt: string;
}[];

export type AuthSliceType = {
  accessToken?: string;
  user?: {
    id: number;
    name: string;
    email: string;
    password: string;
    image: string;
    phone: string;
    role: string;
  };
};

export type CartProductType = ProductType & { count: number };

export type CartState = {
  items: CartProductType[];
};

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: number;
  createdAt: string;
  imageUrl: string;
};

export type CategoriesType = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
}[];

export type CategoriesPage = {
  items: [
    {
      id: number;
      name: string;
      description: string;
      price: number;
      stock: number;
      categoryId: number;
      createdAt: string;
      imageUrl: string;
    }
  ];
  page: number;
  limit: number;
  totalItems: number;
};
