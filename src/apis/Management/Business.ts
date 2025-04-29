import { ManagementBusinessKeys } from "@/constants";
import { stringifyParams } from "@/lib";
import { httpService } from "@/services";
import {
  BusinessFormPayload,
  DeleteBusinessPayload,
  GetBusinessDetailParams,
  ParamsType,
} from "@/types";

export const getBusiness = async (params: ParamsType) => {
  return httpService.get(`/api/business?${stringifyParams(params)}`);
};

export const getBusinessDetail = async (params: GetBusinessDetailParams) => {
  return httpService.get(
    `/api/business/${params?.[ManagementBusinessKeys.ID]}`,
  );
};

export const createBusiness = async (payload: BusinessFormPayload) => {
  return httpService.post("/api/business", payload);
};

export const updateBusiness = async (payload: BusinessFormPayload) => {
  return httpService.put("/api/business", payload);
};

export const deleteBusiness = async (payload: DeleteBusinessPayload) => {
  return httpService.delete(
    `/api/business/${payload?.[ManagementBusinessKeys.ID]}`,
  );
};
