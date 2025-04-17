import { stringifyParams } from "@/lib";
import { httpService } from "@/services";
import { ParamsType } from "@/types";

export const getUsers = async (params: ParamsType) => {
  return httpService.get(`/api/users?${stringifyParams(params)}`);
};
