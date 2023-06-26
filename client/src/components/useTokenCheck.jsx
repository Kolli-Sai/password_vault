import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../store/isAuthenticated/isAuthenticatedSlice";

export const useTokenCheck = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // Token exists in localStorage
      // Perform necessary actions
      dispatch(setToken(token));
    } else {
      dispatch(setToken(""));
      // Token does not exist in localStorage
      // Perform necessary actions
    }
  }, []);
};
