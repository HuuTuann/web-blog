import { updateBusinessProfile } from "@/apis";
import { BusinessFormPayload } from "@/types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export const useUpdateBusinessProfile = (
  options?: UseMutationOptions<unknown, Error, BusinessFormPayload>,
) => {
  const { mutate, isPending } = useMutation<
    unknown,
    Error,
    BusinessFormPayload
  >({
    mutationFn: updateBusinessProfile,
    ...options,
  });

  return {
    onUpdateBusinessProfile: mutate,
    isLoadingUpdateBusinessProfile: isPending,
  };
};
