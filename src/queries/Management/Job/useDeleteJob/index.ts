import { deleteJob } from "@/apis";
import { DeleteJobPayload } from "@/types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export const useDeleteJob = (
  options?: UseMutationOptions<unknown, Error, DeleteJobPayload>,
) => {
  const { mutate, isPending } = useMutation<unknown, Error, DeleteJobPayload>({
    mutationFn: deleteJob,
    ...options,
  });

  return {
    onDeleteJob: mutate,
    isLoadingDeleteJob: isPending,
  };
};
