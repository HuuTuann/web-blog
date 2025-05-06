import { ManagementJobKeys } from "@/constants";
import { stringifyParams } from "@/lib";
import { httpService } from "@/services";
import {
  ApproveJobPayload,
  DeleteJobPayload,
  GetJobDetailParams,
  JobFormPayload,
  ParamsType,
} from "@/types";

export const getJobOfBusiness = async (params: ParamsType) => {
  return httpService.get(`/api/business/jobpost?${stringifyParams(params)}`);
};

export const getJobDetailOfBusiness = async (params: GetJobDetailParams) => {
  return httpService.get(`/api/job/${params?.[ManagementJobKeys.ID]}`);
};

export const createJobOfBusiness = async (payload: JobFormPayload) => {
  return httpService.post("/api/job", payload);
};

export const updateJobOfBusiness = async (payload: JobFormPayload) => {
  return httpService.put("/api/job", payload);
};

export const deleteJobOfBusiness = async (payload: DeleteJobPayload) => {
  return httpService.delete(`/api/job/${payload?.[ManagementJobKeys.ID]}`);
};

export const approveJobOfBusiness = async (payload: ApproveJobPayload) => {
  return httpService.put(`/api/job/approve/${payload?.[ManagementJobKeys.ID]}`);
};
