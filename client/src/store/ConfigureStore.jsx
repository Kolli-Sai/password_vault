import { configureStore } from "@reduxjs/toolkit";
import createUserReducer from "./createUser/createUserSlice";
import loginUserReducer from "./loginUser/loginUserSlice";
import isAuthenticatedSlice from "./isAuthenticated/isAuthenticatedSlice";
import logoutUser from "./logoutUser/logoutUser";

const store = configureStore({
  reducer: {
    createUser: createUserReducer,
    loginUser: loginUserReducer,
    isAuthenticated: isAuthenticatedSlice,
    logoutUser: logoutUser,
  },
});

export { store };
