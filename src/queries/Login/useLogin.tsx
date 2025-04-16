import { login } from "@/apis";
import { LoginPayload } from "@/types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export const useLogin = (
  options?: UseMutationOptions<unknown, Error, LoginPayload>,
) => {
  const { mutate, isPending } = useMutation<unknown, Error, LoginPayload>({
    mutationFn: login,
    ...options,
  });

  return {
    onLogin: mutate,
    isLoadingLogin: isPending,
  };
};
