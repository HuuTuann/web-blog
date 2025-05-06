import {
  ManagementBlogKeys,
  ManagementBusinessKeys,
  ManagementJobKeys,
} from "@/constants";
import { stringifyParams } from "@/lib";
import { httpService } from "@/services";
import {
  GetBlogDetailParams,
  GetBusinessDetailParams,
  GetJobDetailParams,
  ParamsType,
  UserApplyFormPayload,
  UserProfilePayload,
} from "@/types";

export const getBusinessUser = async (params: ParamsType) => {
  return httpService.get(`/home/business?${stringifyParams(params)}`);
};

export const getBusinessUserDetail = async (
  params: GetBusinessDetailParams,
) => {
  return httpService.get(
    `/home/business/${params?.[ManagementBusinessKeys.ID]}`,
  );
};

export const getBlogsUser = async (params: ParamsType) => {
  return httpService.get(`/home/blog?${stringifyParams(params)}`);
};

export const getBlogsUserDetail = async (params: GetBlogDetailParams) => {
  return httpService.get(`/home/blog/${params?.[ManagementBlogKeys.ID]}`);
};

export const getJobsUser = async (params: ParamsType) => {
  return httpService.get(`/home/jobpost?${stringifyParams(params)}`);
};

export const getJobUserDetail = async (params: GetJobDetailParams) => {
  return httpService.get(`/home/jobpost/${params?.[ManagementJobKeys.ID]}`);
};

export const getUserProfile = async () => {
  return httpService.get("/api/account");
};

export const updateUserProfile = async (payload: UserProfilePayload) => {
  return httpService.put("/api/account", payload);
};

export const applyCV = async (payload: UserApplyFormPayload) => {
  return httpService.post("/api/candidate/apply", payload);
};
