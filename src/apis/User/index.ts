import { stringifyParams } from "@/lib";
import { httpService } from "@/services";
import { ParamsType } from "@/types";

export const getBusinessUser = async (params: ParamsType) => {
  return httpService.get(`/api//home/business?${stringifyParams(params)}`);
};

export const getBlogsUser = async (params: ParamsType) => {
  return httpService.get(`/api/home/blog?${stringifyParams(params)}`);
};

export const getJobsUser = async (params: ParamsType) => {
  return httpService.get(`/api/home/jobpost?${stringifyParams(params)}`);
};
