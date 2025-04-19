import { RegisterKeys, RegisterRole } from "@/constants";
import { RegisterFormValues } from "@/types";
import { z } from "zod";

export const registerSchema = z
  .object({
    [RegisterKeys.PASSWORD]: z
      .string()
      .nonempty({
        message: "Password is required",
      })
      .min(8, { message: "Password must be at least 8 characters" }),
    [RegisterKeys.CONFIRM_PASSWORD]: z.string().nonempty({
      message: "Confirm password is required",
    }),
    [RegisterKeys.EMAIL]: z.string().email(),
    [RegisterKeys.FULLNAME]: z.string().nonempty({
      message: "Full name is required",
    }),
    [RegisterKeys.AVATAR]: z.string().nonempty({
      message: "Avatar is required",
    }),
    [RegisterKeys.ROLE]: z.string().nonempty({
      message: "Role is required",
    }),
  })
  .refine(
    (data) =>
      data[RegisterKeys.PASSWORD] === data[RegisterKeys.CONFIRM_PASSWORD],
    {
      message: "Passwords do not match",
      path: [RegisterKeys.CONFIRM_PASSWORD],
    },
  );

export const initialValues: RegisterFormValues = {
  [RegisterKeys.PASSWORD]: "",
  [RegisterKeys.CONFIRM_PASSWORD]: "",
  [RegisterKeys.EMAIL]: "",
  [RegisterKeys.FULLNAME]: "",
  [RegisterKeys.AVATAR]: "",
  [RegisterKeys.ROLE]: "",
};

export const roleOptions = [
  {
    label: "Business",
    value: RegisterRole.BUSINESS,
  },
  { label: "Candidate", value: RegisterRole.CANDIDATE },
];
