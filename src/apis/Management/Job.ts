import { ManagementJobKeys } from "@/constants";
import { stringifyParams } from "@/lib";
import { httpService } from "@/services";
import {
  ApproveJobPayload,
  CreateJobFormPayload,
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

export const createJob = async (payload: CreateJobFormPayload) => {
  return httpService.post("/api/job", payload);
};

export const updateJob = async (payload: JobFormPayload) => {
  return httpService.put("/api/job", payload);
};

export const deleteJob = async (payload: DeleteJobPayload) => {
  return httpService.delete(`/api/job/${payload?.[ManagementJobKeys.ID]}`);
};

export const approveJob = async (payload: ApproveJobPayload) => {
  return httpService.put(`/api/job/approve/${payload?.[ManagementJobKeys.ID]}`);
};
