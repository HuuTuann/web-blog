import { createJob } from "@/apis";
import { JobFormPayload } from "@/types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export const useCreateJob = (
  options?: UseMutationOptions<unknown, Error, JobFormPayload>,
) => {
  const { mutate, isPending } = useMutation<unknown, Error, JobFormPayload>({
    mutationFn: createJob,
    ...options,
  });

  return {
    onCreateJob: mutate,
    isLoadingCreateJob: isPending,
  };
};
