import { applyCV } from "@/apis";
import { UserApplyFormPayload } from "@/types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export const useApplyCV = (
  options?: UseMutationOptions<unknown, Error, UserApplyFormPayload>,
) => {
  const { mutate, isPending } = useMutation<
    unknown,
    Error,
    UserApplyFormPayload
  >({
    mutationFn: applyCV,
    ...options,
  });

  return {
    onApplyCV: mutate,
    isLoadingApplyCV: isPending,
  };
};
