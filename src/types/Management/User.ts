import { ManagementUserKeys } from "@/constants";
import { UseQueryOptions } from "@tanstack/react-query";
import { PageResponseType, ResponseType, TableParams } from "../Base";

export interface ListUsersResponse {
  [ManagementUserKeys.FULL_NAME]: string;
  [ManagementUserKeys.EMAIL]: string;
  [ManagementUserKeys.IS_ACTIVE]: boolean;
  [ManagementUserKeys.CREATED_AT]: string;
  [ManagementUserKeys.MODIFIED_AT]: string;
  [ManagementUserKeys.CREATED_BY]: string;
  [ManagementUserKeys.MODIFIED_BY]: string;
  [ManagementUserKeys.ROLE]: string;
  [ManagementUserKeys.AVATAR]: string;
  [ManagementUserKeys.ID]: number;
  [ManagementUserKeys.PASSWORD]: string;
}

export interface UseGetUserParams {
  defaultParams?: TableParams;
  options?: UseQueryOptions<
    PageResponseType<ListUsersResponse>,
    Error,
    PageResponseType<ListUsersResponse>
  >;
}

export interface UpdateUserPayload {
  [ManagementUserKeys.ID]: number;
  [ManagementUserKeys.FULL_NAME]: string;
  [ManagementUserKeys.PASSWORD]: string;
  [ManagementUserKeys.AVATAR]?: string;
}

export type UserDetailResponse = ListUsersResponse;

export interface GetUserDetailParams {
  [ManagementUserKeys.ID]: number;
}

export interface UseGetUserDetailParams {
  params?: GetUserDetailParams;
  options?: UseQueryOptions<
    ResponseType<UserDetailResponse>,
    Error,
    ResponseType<UserDetailResponse>
  >;
}

export type DeleteUserPayload = GetUserDetailParams;
