import { LoginKeys } from "@/constants";

export interface LoginPayload {
  [LoginKeys.EMAIL]: string;
  [LoginKeys.PASSWORD]: string;
}
