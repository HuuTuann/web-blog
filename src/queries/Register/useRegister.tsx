import { register } from "@/apis";
import { RegisterPayload } from "@/types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export const useRegister = (
  options?: UseMutationOptions<unknown, Error, RegisterPayload>,
) => {
  const { mutate, isPending } = useMutation<unknown, Error, RegisterPayload>({
    mutationFn: register,
    ...options,
  });

  return {
    onRegister: mutate,
    isLoadingRegister: isPending,
  };
};
