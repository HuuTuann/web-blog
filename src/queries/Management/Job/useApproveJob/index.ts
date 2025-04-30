import { approveJob } from "@/apis";
import { ApproveJobPayload } from "@/types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export const useApproveJob = (
  options?: UseMutationOptions<unknown, Error, ApproveJobPayload>,
) => {
  const { mutate, isPending } = useMutation<unknown, Error, ApproveJobPayload>({
    mutationFn: approveJob,
    ...options,
  });

  return {
    onApproveJob: mutate,
    isLoadingApproveJob: isPending,
  };
};
