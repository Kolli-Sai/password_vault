import { configureStore } from "@reduxjs/toolkit";
import createUserReducer from "./createUser/createUserSlice";
import loginUserReducer from "./loginUser/loginUserSlice";
import isAuthenticatedReducer from "./isAuthenticated/isAuthenticatedSlice";
import logoutUser from "./logoutUser/logoutUser";
import createPassword from "./createPassword/createPassword";
import getAllPasswords from "./getAllPasswords/getAllPasswords";
import getPassword from "./getPassword/getPassword";
import updatePassword from "./updatePassword/updatePassword";
import deletePassword from "./deletePassword/deletePassword";

const store = configureStore({
  reducer: {
    createUser: createUserReducer,
    loginUser: loginUserReducer,
    isAuthenticated: isAuthenticatedReducer,
    logoutUser: logoutUser,
    createPassword: createPassword,
    getAllPasswords: getAllPasswords,
    getPassword: getPassword,
    updatePassword: updatePassword,
    deletePassword: deletePassword,
  },
});

export { store };
