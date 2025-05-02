import { DateFormat } from "@/constants/DateFormat";
import { ParamsType } from "@/types";
import dayjs from "dayjs";
import { isEmpty } from "lodash";

export function formatDate(
  value: string | number | Date | dayjs.Dayjs,
  format = DateFormat.DEFAULT,
  { initValueFormat = "" } = {},
) {
  if (!value) return "";
  if (!isEmpty(initValueFormat)) {
    return dayjs(value, initValueFormat).format(format);
  }
  return dayjs(value).format(format);
}

export const stringifyParams = (params: ParamsType) => {
  let result = "";

  if (!params) return result;
  Object.keys(params).forEach((key) => {
    if (params[key]) {
      result += `${key}=${params[key]}&`;
    }
  });

  return result.slice(0, -1);
};

export const formatValueOrNull = (
  value: string | number | boolean | null | undefined,
  defaultValue: string | number | boolean = "--",
) => {
  if (!value) return defaultValue;
  return value;
};
