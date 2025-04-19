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
  return httpService.get(`/api/users/${params.user_id}`);
};

export const updateUser = async (payload: UpdateUserPayload) => {
  return httpService.put(`/api/users`, payload);
};

export const deleteUser = async (payload: DeleteUserPayload) => {
  return httpService.delete(`/api/users/${payload.user_id}`);
};
