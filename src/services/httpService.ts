import axios from "axios";
import { isEmpty } from "lodash";
import { getCookie, removeCookie } from "./accountService";

const publicPaths = ["/login", "/register"];

export const httpService = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVICE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

httpService.interceptors.request.use(
  (config) => {
    const token = getCookie();

    const isPublicPath = publicPaths.some((path) => config.url?.includes(path));

    if (!isPublicPath && isEmpty(token)) {
      window.open(`${process.env.NEXT_PUBLIC_WEB_URL}/login`, "_self");
      return Promise.reject("Unauthorized");
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
