import { httpService } from "@/services";
import { LoginPayload } from "@/types";

export const login = (payload: LoginPayload) => {
  return httpService.post("/auth/login", payload);
};
