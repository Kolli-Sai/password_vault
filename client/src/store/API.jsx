import axios from "axios";

export const API = axios.create({
  baseURL: "https://password-vault-server-eq9u.onrender.com",
});
