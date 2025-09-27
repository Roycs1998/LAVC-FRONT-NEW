import axios from "axios";

export const api = axios.create({
  baseURL: `${process.env.NEXTAUTH_URL}/api`,
  withCredentials: true,
});

api.interceptors.response.use(
  (r) => r,
  (err) => Promise.reject(err)
);
