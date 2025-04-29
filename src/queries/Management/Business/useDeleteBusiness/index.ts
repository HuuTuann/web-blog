import { deleteBusiness } from "@/apis";
import { DeleteBusinessPayload } from "@/types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export const useDeleteBusiness = (
  options?: UseMutationOptions<unknown, Error, DeleteBusinessPayload>,
) => {
  const { mutate, isPending } = useMutation<
    unknown,
    Error,
    DeleteBusinessPayload
  >({
    mutationFn: deleteBusiness,
    ...options,
  });

  return {
    onDeleteBusiness: mutate,
    isLoadingDeleteBusiness: isPending,
  };
};
