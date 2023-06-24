import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { default as axios } from "axios";

const initialState = {
  isLoading: false,
  data: null,
  error: "",
};

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  try {
    const response = await axios.get(
      "http://localhost:8190/api/v1/auth/logout"
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(`error in logout`);
  }
});

const logoutUserSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(logoutUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.error = "";
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.isLoading = false;
      state.data = null;
      state.error = action.error.message;
    });
  },
});

export default logoutUserSlice.reducer;
