import { updateBlog } from "@/apis";
import { BlogFormPayload } from "@/types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export const useUpdateBlog = (
  options?: UseMutationOptions<unknown, Error, BlogFormPayload>,
) => {
  const { mutate, isPending } = useMutation<unknown, Error, BlogFormPayload>({
    mutationFn: updateBlog,
    ...options,
  });

  return {
    onUpdateBlog: mutate,
    isLoadingUpdateBlog: isPending,
  };
};
