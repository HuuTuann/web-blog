import { useRegister } from "@/queries";
import { RegisterFormValues, RegisterPayload } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { initialValues, registerSchema } from "./helpers";

export const useRegisterForm = () => {
  const router = useRouter();
  const { handleSubmit, ...formReturns } = useForm<RegisterFormValues>({
    defaultValues: initialValues,
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
    resolver: zodResolver(registerSchema),
  });

  const { onRegister, isLoadingRegister } = useRegister();

  const handleLogin = (values: RegisterFormValues) => {
    const payload: RegisterPayload = {
      ...values,
      roleId: Number(values.roleId),
    };

    onRegister(payload, {
      onSuccess: () => {
        router.push("/login"); // Redirect to login page after successful registration
      },
      onError: (error) => {
        // Handle error here, e.g., show an error message
        console.error("Register failed:", error);
      },
    });
  };

  return {
    ...formReturns,
    isLoadingRegister,
    onSubmit: handleSubmit(handleLogin),
  };
};
