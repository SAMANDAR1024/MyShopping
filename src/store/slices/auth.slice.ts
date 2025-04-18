import { createSlice } from "@reduxjs/toolkit";
type AuthSliceType = {
  accessToken?: string;
  user?: {
    id: number;
    name: string;
  };
};
const initialState: AuthSliceType = {
  accessToken: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (state, { payload }) => {
      state.accessToken = payload.accessToken;
      state.user = payload.user;
    },
  },
});

export const { login } = authSlice.actions;
