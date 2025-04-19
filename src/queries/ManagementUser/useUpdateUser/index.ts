import { updateUser } from "@/apis";
import { UpdateUserPayload } from "@/types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export const useUpdateUser = (
  options?: UseMutationOptions<unknown, Error, UpdateUserPayload>,
) => {
  const { mutate, isPending } = useMutation<unknown, Error, UpdateUserPayload>({
    mutationFn: updateUser,
    ...options,
  });

  return {
    onUpdateUser: mutate,
    isLoadingUpdateUser: isPending,
  };
};
