import axios from "axios";
import { getCookie, removeCookie } from "./accountService";

export const httpService = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVICE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

httpService.interceptors.request.use(
  (config) => {
    const token = getCookie();

    if (token) {
      config.headers.Authorization = token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

httpService.interceptors.response.use(
  (response) => response?.data,
  (error) => {
    if (error?.response?.status === 403) {
      removeCookie();
      window.open(`${process.env.NEXT_PUBLIC_WEB_URL}/login`, "_self");
    }
    return Promise.reject(error?.response?.data || error);
  },
);
