import { UserKeys } from "@/constants";
import { UserProfileResponse } from "@/types";
import { z } from "zod";

const schema = z
  .object({
    [UserKeys.ID]: z.number().readonly(),
    [UserKeys.FULLNAME]: z.string().nonempty({
      message: "Full name is required",
    }),
    [UserKeys.AVATAR]: z.string().nonempty({
      message: "Avatar is required",
    }),
    [UserKeys.PASSWORD]: z
      .string()
      .nonempty({
        message: "Password is required",
      })
      .min(8, { message: "Password must be at least 8 characters" }),
    [UserKeys.CONFIRM_PASSWORD]: z.string().nonempty({
      message: "Confirm password is required",
    }),
  })
  .refine(
    (data) => data[UserKeys.PASSWORD] === data[UserKeys.CONFIRM_PASSWORD],
    {
      message: "Passwords do not match",
      path: [UserKeys.CONFIRM_PASSWORD],
    },
  );

const initialValues: ProfileFormSchema = {
  [UserKeys.ID]: 0,
  [UserKeys.FULLNAME]: "",
  [UserKeys.AVATAR]: "",
  [UserKeys.PASSWORD]: "",
  [UserKeys.CONFIRM_PASSWORD]: "",
};

const getInitialValues = (user?: UserProfileResponse): ProfileFormSchema => {
  return {
    ...initialValues,
    ...user,
  };
};

const ProfileHelpers = {
  schema,
  initialValues,
  getInitialValues,
};

export default ProfileHelpers;

export type ProfileFormSchema = z.infer<typeof schema>;
