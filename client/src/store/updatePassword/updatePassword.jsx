import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../API";

const initialState = {
  isLoading: false,
  data: null,
  error: null,
};

export const updatePassword = createAsyncThunk(
  "passwords/updatePassword",
  // eslint-disable-next-line no-unused-vars
  async (id, { rejectWithValue }) => {
    try {
      const response = await API.patch(`/api/v1/user/password/${id}`, {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      });
      const data = await response.data;
      return data;
    } catch (error) {
      return { error: error.message };
    }
  }
);

const updatePasswordSlice = createSlice({
  name: "passwords",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(updatePassword.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updatePassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(updatePassword.rejected, (state, action) => {
      state.isLoading = false;
      state.data = null;
      state.error = action.payload.error;
    });
  },
});

export default updatePasswordSlice.reducer;
