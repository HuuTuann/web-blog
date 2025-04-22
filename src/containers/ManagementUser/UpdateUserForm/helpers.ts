import { ManagementUserKeys } from "@/constants";
import { UpdateUserPayload, UserDetailResponse } from "@/types";
import { z } from "zod";

export const updateUserSchema = z.object({
  [ManagementUserKeys.ID]: z.number().readonly(),
  [ManagementUserKeys.FULL_NAME]: z.string().nonempty({
    message: "Full name is required",
  }),
  [ManagementUserKeys.AVATAR]: z.string().optional(),
  [ManagementUserKeys.PASSWORD]: z.string().readonly(),
});

export const initialValues: UpdateUserPayload = {
  [ManagementUserKeys.ID]: 0,
  [ManagementUserKeys.FULL_NAME]: "",
  [ManagementUserKeys.AVATAR]: "",
  [ManagementUserKeys.PASSWORD]: "",
};

export const getInitialValues = (
  user?: UserDetailResponse,
): UpdateUserPayload => {
  return {
    ...initialValues,
    [ManagementUserKeys.ID]: user?.[ManagementUserKeys.ID] ?? 0,
    [ManagementUserKeys.FULL_NAME]: user?.[ManagementUserKeys.FULL_NAME] ?? "",
    [ManagementUserKeys.AVATAR]: user?.[ManagementUserKeys.AVATAR] ?? "",
    [ManagementUserKeys.PASSWORD]: user?.[ManagementUserKeys.PASSWORD] ?? "",
  };
};
