import { Paths } from "@/constants";
import { useLogin } from "@/queries";
import { setCookie } from "@/services";
import { LoginPayload } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { initialValues, loginSchema } from "./helpers";

export const useLoginForm = () => {
  const router = useRouter();
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
      onSuccess: (data: any) => {
        setCookie(data?.data, 7);
        router.push(Paths.MANAGEMENT_USER);
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
