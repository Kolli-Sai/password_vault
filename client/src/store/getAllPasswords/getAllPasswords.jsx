import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../API";

const initialState = {
  isLoading: false,
  data: [],
  error: null,
};

export const getAllPasswords = createAsyncThunk(
  "passwords/getAllPasswords",
  // eslint-disable-next-line no-unused-vars
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/api/v1/user/passwords", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.data;
      return data;
    } catch (error) {
      return { error: error.message };
    }
  }
);

const getAllPasswordsSlice = createSlice({
  name: "passwords",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllPasswords.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllPasswords.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(getAllPasswords.rejected, (state, action) => {
      state.isLoading = false;
      state.data = null;
      state.error = action.payload.error;
    });
  },
});

export default getAllPasswordsSlice.reducer;
