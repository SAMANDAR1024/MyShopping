import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartState, ProductType } from "../types";
import { toast } from "sonner";



const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductType>) => {
      const cartItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (cartItem) {
        cartItem.count += 1;
        toast.success("Savatchaga qoshildi")
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
    },
    removeCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    fullRemove: (state) => {
      state.items = [];
    },

    minusCount: (state, action: PayloadAction<number>) => {
      const minus = state.items.find((item) => item.id === action.payload);

      if (minus && minus.count > 1) {
        minus.count -= 1;
      } else {
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
    },
    plusCount: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        item.count += 1;
      }
    },
  },
});

export const { addToCart, fullRemove, removeCart, minusCount, plusCount } =
  cartSlice.actions;
export default cartSlice.reducer;
