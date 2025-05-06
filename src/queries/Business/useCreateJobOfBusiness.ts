import { createJob } from "@/apis";
import { CreateJobFormPayload } from "@/types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export const useCreateJobOfBusiness = (
  options?: UseMutationOptions<unknown, Error, CreateJobFormPayload>,
) => {
  const { mutate, isPending } = useMutation<
    unknown,
    Error,
    CreateJobFormPayload
  >({
    mutationFn: createJob,
    ...options,
  });

  return {
    onCreateJob: mutate,
    isLoadingCreateJob: isPending,
  };
};
