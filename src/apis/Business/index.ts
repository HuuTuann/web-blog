import { stringifyParams } from "@/lib";
import { httpService } from "@/services";
import { ParamsType } from "@/types";

export const getBusinesses = async (params: ParamsType) => {
  return httpService.get(`/business/jobpost?${stringifyParams(params)}`);
};
