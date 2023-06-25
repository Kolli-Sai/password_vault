import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "./store/isAuthenticated/isAuthenticatedSlice";
import Cookies from "js-cookie";

export function useTokenSync() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get("access-token");
    dispatch(setToken(token));
  }, [dispatch]);
}
