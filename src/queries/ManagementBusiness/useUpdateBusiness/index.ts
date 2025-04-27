import { updateBusiness } from "@/apis";
import { BusinessFormPayload } from "@/types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export const useUpdateBusiness = (
  options?: UseMutationOptions<unknown, Error, BusinessFormPayload>,
) => {
  const { mutate, isPending } = useMutation<
    unknown,
    Error,
    BusinessFormPayload
  >({
    mutationFn: updateBusiness,
    ...options,
  });

  return {
    onUpdateBusiness: mutate,
    isLoadingUpdateBusiness: isPending,
  };
};
