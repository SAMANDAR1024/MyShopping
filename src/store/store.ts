import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cart.slice";
import likeReducer from "./slices/like.slice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    likeCart: likeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
