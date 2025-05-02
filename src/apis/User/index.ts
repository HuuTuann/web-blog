import { stringifyParams } from "@/lib";
import { httpService } from "@/services";
import { ParamsType, UserProfilePayload } from "@/types";

export const getBusinessUser = async (params: ParamsType) => {
  return httpService.get(`/home/business?${stringifyParams(params)}`);
};

export const getBlogsUser = async (params: ParamsType) => {
  return httpService.get(`/home/blog?${stringifyParams(params)}`);
};

export const getJobsUser = async (params: ParamsType) => {
  return httpService.get(`/home/jobpost?${stringifyParams(params)}`);
};

export const getUserProfile = async () => {
  return httpService.get("/api/account");
};

export const updateUserProfile = async (payload: UserProfilePayload) => {
  return httpService.put("/api/account", payload);
};
