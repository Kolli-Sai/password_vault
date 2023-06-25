import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
};

const isAuthenticatedSlice = createSlice({
  name: "isAuthenticated",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setToken } = isAuthenticatedSlice.actions;
export default isAuthenticatedSlice.reducer;
