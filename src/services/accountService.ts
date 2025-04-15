import Cookies from "js-cookie";

export const setCookie = (value: string, days: number) => {
  Cookies.set(process.env.NEXT_PUBLIC_ACCESS_TOKEN, value, {
    expires: days,
  });
};

export const getCookie = (): string | undefined => {
  return Cookies.get(process.env.NEXT_PUBLIC_ACCESS_TOKEN);
};

export const removeCookie = () => {
  Cookies.remove(process.env.NEXT_PUBLIC_ACCESS_TOKEN);
};
