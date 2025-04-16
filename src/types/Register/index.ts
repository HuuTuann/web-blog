import { RegisterKeys } from "@/constants";

export interface RegisterFormValues {
  [RegisterKeys.FULLNAME]: string;
  [RegisterKeys.PASSWORD]: string;
  [RegisterKeys.CONFIRM_PASSWORD]: string;
  [RegisterKeys.EMAIL]: string;
  [RegisterKeys.AVATAR]?: string;
}

export type RegisterPayload = Omit<
  RegisterFormValues,
  RegisterKeys.CONFIRM_PASSWORD
>;
