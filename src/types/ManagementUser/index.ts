import { ManagementUserKeys } from "@/constants";

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
