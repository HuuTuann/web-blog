import { updateJobOfBusiness } from "@/apis";
import { JobFormPayload } from "@/types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export const useUpdateJobOfBusiness = (
  options?: UseMutationOptions<unknown, Error, JobFormPayload>,
) => {
  const { mutate, isPending } = useMutation<unknown, Error, JobFormPayload>({
    mutationFn: updateJobOfBusiness,
    ...options,
  });

  return {
    onUpdateJob: mutate,
    isLoadingUpdateJob: isPending,
  };
};
