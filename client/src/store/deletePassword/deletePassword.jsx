import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../API";

const initialState = {
  isLoading: false,
  data: null,
  error: null,
};

export const deletePassword = createAsyncThunk(
  "passwords/deletePassword",
  // eslint-disable-next-line no-unused-vars
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.delete(`/api/v1/user/password/${id}`, {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      });
      const data = await response.data;
      return data;
    } catch (error) {
      return { error: error.message };
    }
  }
);

const deletePasswordSlice = createSlice({
  name: "passwords",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(deletePassword.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deletePassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(deletePassword.rejected, (state, action) => {
      state.isLoading = false;
      state.data = null;
      state.error = action.payload.error;
    });
  },
});

export default deletePasswordSlice.reducer;
