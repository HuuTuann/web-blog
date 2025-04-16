import { useRegister } from "@/queries";
import { RegisterFormValues, RegisterPayload } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { initialValues, registerSchema } from "./helpers";

export const useRegisterForm = () => {
  const { handleSubmit, ...formReturns } = useForm<RegisterFormValues>({
    defaultValues: initialValues,
    mode: "onBlur",
    reValidateMode: "onBlur",
    shouldFocusError: true,
    resolver: zodResolver(registerSchema),
  });

  const { onRegister, isLoadingRegister } = useRegister(); // Assuming you want to use the login mutation here

  const handleLogin = (values: RegisterPayload) => {
    onRegister(values, {
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
    isLoadingRegister,
    onSubmit: handleSubmit(handleLogin),
  };
};
