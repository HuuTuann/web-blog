import { ManagementUserKeys } from "@/constants";
import { stringifyParams } from "@/lib";
import { httpService } from "@/services";
import {
  DeleteUserPayload,
  GetUserDetailParams,
  ParamsType,
  UpdateUserPayload,
} from "@/types";

export const getUsers = async (params: ParamsType) => {
  return httpService.get(`/api/users?${stringifyParams(params)}`);
};

export const getUserDetail = async (params: GetUserDetailParams) => {
  return httpService.get(`/api/users/${params?.[ManagementUserKeys.ID]}`);
};

export const updateUser = async (payload: UpdateUserPayload) => {
  console.log("🚀 ~ updateUser ~ payload:", payload);
  return httpService.put(`/api/users`, payload);
};

export const deleteUser = async (payload: DeleteUserPayload) => {
  return httpService.delete(`/api/users/${payload?.[ManagementUserKeys.ID]}`);
};
