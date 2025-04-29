import { createBusiness } from "@/apis";
import { BusinessFormPayload } from "@/types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export const useCreateBusiness = (
  options?: UseMutationOptions<unknown, Error, BusinessFormPayload>,
) => {
  const { mutate, isPending } = useMutation<
    unknown,
    Error,
    BusinessFormPayload
  >({
    mutationFn: createBusiness,
    ...options,
  });

  return {
    onCreateBusiness: mutate,
    isLoadingCreateBusiness: isPending,
  };
};
