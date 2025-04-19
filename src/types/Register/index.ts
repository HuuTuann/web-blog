import { RegisterKeys } from "@/constants";

export interface RegisterFormValues {
  [RegisterKeys.FULLNAME]: string;
  [RegisterKeys.PASSWORD]: string;
  [RegisterKeys.CONFIRM_PASSWORD]: string;
  [RegisterKeys.EMAIL]: string;
  [RegisterKeys.AVATAR]: string;
  [RegisterKeys.ROLE]: string;
}

export interface RegisterPayload
  extends Omit<
    RegisterFormValues,
    RegisterKeys.CONFIRM_PASSWORD | RegisterKeys.ROLE
  > {
  [RegisterKeys.ROLE]: number;
}
