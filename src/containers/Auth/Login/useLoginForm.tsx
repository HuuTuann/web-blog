import { useLogin } from "@/queries";
import { LoginPayload } from "@/types/Login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { initialValues, loginSchema } from "./helpers";

export const useLoginForm = () => {
  const { handleSubmit, ...formReturns } = useForm<LoginPayload>({
    defaultValues: initialValues,
    mode: "onBlur",
    reValidateMode: "onBlur",
    shouldFocusError: true,
    resolver: zodResolver(loginSchema),
  });

  const { onLogin, isLoadingLogin } = useLogin(); // Assuming you want to use the login mutation here

  const handleLogin = (values: LoginPayload) => {
    onLogin(values, {
      onSuccess: () => {
        // Handle successful login here, e.g., redirect or show a success message
      },
      onError: (error) => {
        // Handle error here, e.g., show an error message
        console.error("Login failed:", error);
      },
    });
  };

  return {
    ...formReturns,
    isLoadingLogin,
    onSubmit: handleSubmit(handleLogin),
  };
};
