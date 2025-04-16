import { DateFormat } from "@/constants/DateFormat";
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
