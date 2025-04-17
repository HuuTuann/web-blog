import { ManagementUserKeys } from "@/constants";
import { UseQueryOptions } from "@tanstack/react-query";
import { PageResponseType, TableParams } from "../Base";

export interface ManagementUserResponse {
  [ManagementUserKeys.FULL_NAME]: string;
  [ManagementUserKeys.EMAIL]: string;
  [ManagementUserKeys.IS_ACTIVE]: boolean;
  [ManagementUserKeys.CREATED_AT]: string;
  [ManagementUserKeys.MODIFIED_AT]: string;
  [ManagementUserKeys.CREATED_BY]: string;
  [ManagementUserKeys.MODIFIED_BY]: string;
  [ManagementUserKeys.ROLE]: string;
  [ManagementUserKeys.AVATAR]: string;
  [ManagementUserKeys.ID]: string;
}

export interface UseGetUserParams {
  defaultParams?: TableParams;
  options?: UseQueryOptions<
    PageResponseType<ManagementUserResponse>,
    Error,
    PageResponseType<ManagementUserResponse>
  >;
}
