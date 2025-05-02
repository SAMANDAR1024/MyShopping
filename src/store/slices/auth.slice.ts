import { createSlice } from "@reduxjs/toolkit";
import { AuthSliceType } from "../types";

const initialState: AuthSliceType = {
  accessToken:
    typeof window !== "undefined"
      ? localStorage.getItem("accessToken") || undefined
      : undefined,
  user:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null") || undefined
      : undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (state, { payload }) => {
      state.accessToken = payload.accessToken;
      state.user = payload.user;
    },

    logout: (state) => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
      }
      state.accessToken = "";
      state.user = undefined;
    },
  },
});

export const { login, logout } = authSlice.actions;
