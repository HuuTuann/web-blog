import { deleteJobOfBusiness } from "@/apis";
import { DeleteJobPayload } from "@/types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export const useDeleteJobOfBusiness = (
  options?: UseMutationOptions<unknown, Error, DeleteJobPayload>,
) => {
  const { mutate, isPending } = useMutation<unknown, Error, DeleteJobPayload>({
    mutationFn: deleteJobOfBusiness,
    ...options,
  });

  return {
    onDeleteJob: mutate,
    isLoadingDeleteJob: isPending,
  };
};
