import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  data: "",
  error: "",
};
export const createUser = createAsyncThunk(
  "auth/createUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8190/api/v1/auth/register",
        formData
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const createUserSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state) => {
      console.log(`state in pending -> ${state}`);
      state.isLoading = true;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      console.log(`action in fulfilled -> ${action}`);

      state.isLoading = false;
      state.data = action.payload;
      state.error = "";
    });
    builder.addCase(createUser.rejected, (state, action) => {
      console.log(`action in rejected -> ${action}`);

      state.isLoading = false;
      state.data = "";
      state.error = action.payload;
    });
  },
});

export default createUserSlice.reducer;
