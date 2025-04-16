import { httpService } from "@/services";
import { RegisterPayload } from "@/types";

export const register = (payload: RegisterPayload) => {
  return httpService.post("/auth/register", payload);
};
