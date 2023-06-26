import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../API";

const initialState = {
  isLoading: false,
  data: null,
  error: null,
};

export const createPassword = createAsyncThunk(
  "passwords/createPassword",
  // eslint-disable-next-line no-unused-vars
  async (payload, { rejectWithValue }) => {
    try {
      const response = await API.post("/api/v1/user/password", payload, {
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

const createPasswordSlice = createSlice({
  name: "passwords",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(createPassword.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createPassword.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(createPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.data = null;
      state.error = action.payload.error;
    });
  },
});

export default createPasswordSlice.reducer;
