import { ManagementJobKeys } from "@/constants";
import { stringifyParams } from "@/lib";
import { httpService } from "@/services";
import {
  DeleteJobPayload,
  GetJobDetailParams,
  JobFormPayload,
  ParamsType,
} from "@/types";

export const getJobs = async (params: ParamsType) => {
  return httpService.get(`/api/job?${stringifyParams(params)}`);
};

export const getJobDetail = async (params: GetJobDetailParams) => {
  return httpService.get(`/api/job/${params?.[ManagementJobKeys.ID]}`);
};

export const createJob = async (payload: JobFormPayload) => {
  return httpService.post("/api/job", payload);
};

export const updateJob = async (payload: JobFormPayload) => {
  return httpService.put("/api/job", payload);
};

export const deleteJob = async (payload: DeleteJobPayload) => {
  return httpService.delete(`/api/job/${payload?.[ManagementJobKeys.ID]}`);
};
