import { updateJob } from "@/apis";
import { JobFormPayload } from "@/types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export const useUpdateJob = (
  options?: UseMutationOptions<unknown, Error, JobFormPayload>,
) => {
  const { mutate, isPending } = useMutation<unknown, Error, JobFormPayload>({
    mutationFn: updateJob,
    ...options,
  });

  return {
    onUpdateJob: mutate,
    isLoadingUpdateJob: isPending,
  };
};
