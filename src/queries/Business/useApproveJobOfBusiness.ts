import { approveJobOfBusiness } from "@/apis";
import { ApproveJobPayload } from "@/types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export const useApproveJobOfBusiness = (
  options?: UseMutationOptions<unknown, Error, ApproveJobPayload>,
) => {
  const { mutate, isPending } = useMutation<unknown, Error, ApproveJobPayload>({
    mutationFn: approveJobOfBusiness,
    ...options,
  });

  return {
    onApproveJob: mutate,
    isLoadingApproveJob: isPending,
  };
};
