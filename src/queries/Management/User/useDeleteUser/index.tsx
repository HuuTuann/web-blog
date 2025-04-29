import { deleteUser } from "@/apis";
import { DeleteUserPayload } from "@/types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export const useDeleteUser = (
  options?: UseMutationOptions<unknown, Error, DeleteUserPayload>,
) => {
  const { mutate, isPending } = useMutation<unknown, Error, DeleteUserPayload>({
    mutationFn: deleteUser,
    ...options,
  });

  return {
    onDeleteUser: mutate,
    isLoadingDeleteUser: isPending,
  };
};
