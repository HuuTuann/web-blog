import { LoginKeys } from "@/constants";
import { LoginPayload } from "@/types";
import { z } from "zod";

export const loginSchema = z.object({
  [LoginKeys.EMAIL]: z.string().nonempty({ message: "Email is required" }),
  [LoginKeys.PASSWORD]: z
    .string()
    .nonempty({ message: "Password is required" }),
});

export const initialValues: LoginPayload = {
  [LoginKeys.EMAIL]: "tiendat2@gmail.com",
  [LoginKeys.PASSWORD]: "Tiendat12345#@",
};
