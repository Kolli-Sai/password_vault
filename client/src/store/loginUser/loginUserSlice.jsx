import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../API";

const initialState = {
  isLoading: false,
  data: null,
  error: "",
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await API.post("/api/v1/auth/login", credentials, {
        withCredentials: true, // Include cookies in the request
      });
      const data = await response.data;
      console.log(`data from login user->${data}`);
      return data;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const loginUserSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.error = "";
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.data = "";
      state.error = action.payload;
    });
  },
});

export default loginUserSlice.reducer;
