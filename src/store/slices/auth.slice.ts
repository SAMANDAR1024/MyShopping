import { createSlice } from "@reduxjs/toolkit";
type AuthSliceType = {
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
