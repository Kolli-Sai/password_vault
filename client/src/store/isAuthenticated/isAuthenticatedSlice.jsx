import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
};

const isAuthenticated = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, action) => {
      return void (state.token = action.payload);
    },
  },
});

export const { setToken } = isAuthenticated.actions;
export default isAuthenticated.reducer;
