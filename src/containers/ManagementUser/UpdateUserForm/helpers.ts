import { ManagementUserKeys } from "@/constants";
import { UpdateUserPayload, UserDetailResponse } from "@/types";
import { z } from "zod";

export const updateUserSchema = z.object({
  [ManagementUserKeys.ID]: z.string().nonempty(),
  [ManagementUserKeys.FULL_NAME]: z.string().nonempty({
    message: "Full name is required",
  }),
  [ManagementUserKeys.AVATAR]: z.string().optional(),
});

export const initialValues: UpdateUserPayload = {
  [ManagementUserKeys.ID]: "",
  [ManagementUserKeys.FULL_NAME]: "",
  [ManagementUserKeys.AVATAR]: "",
};

export const getInitialValues = (
  user?: UserDetailResponse,
): UpdateUserPayload => {
  return {
    ...initialValues,
    [ManagementUserKeys.ID]: user?.[ManagementUserKeys.ID] ?? "",
    [ManagementUserKeys.FULL_NAME]: user?.[ManagementUserKeys.FULL_NAME] ?? "",
    [ManagementUserKeys.AVATAR]: user?.[ManagementUserKeys.AVATAR] ?? "",
  };
};
