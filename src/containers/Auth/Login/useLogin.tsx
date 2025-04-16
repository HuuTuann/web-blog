import { LoginPayload } from "@/types/Login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { initialValues, loginSchema } from "./helpers";

export const useLogin = () => {
  return useForm<LoginPayload>({
    defaultValues: initialValues,
    mode: "onBlur",
    reValidateMode: "onBlur",
    shouldFocusError: true,
    resolver: zodResolver(loginSchema),
  });
};
