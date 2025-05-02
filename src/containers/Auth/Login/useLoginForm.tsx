import { Paths, RoleKeys } from "@/constants";
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

  const { onLogin, isLoadingLogin } = useLogin();

  const handleNavigate = (role: RoleKeys) => {
    switch (role) {
      case RoleKeys.ADMIN:
        router.push(Paths.MANAGEMENT_USER);
        break;
      case RoleKeys.BUSINESS:
        router.push(Paths.USER);
        break;
      case RoleKeys.CANDIDATE:
        router.push(Paths.USER);
        break;
    }
  };

  const handleLogin = (values: LoginPayload) => {
    onLogin(values, {
      onSuccess: (data: unknown) => {
        if (
          data &&
          typeof data === "object" &&
          "data" in data &&
          "role" in data
        ) {
          setCookie((data as { data: string }).data, 7);
          handleNavigate((data as { role: RoleKeys }).role);
        }
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
