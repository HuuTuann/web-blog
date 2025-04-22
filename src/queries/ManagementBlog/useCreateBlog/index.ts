import { createBlog } from "@/apis";
import { BlogFormPayload } from "@/types/ManagementBlog";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export const useCreateBlog = (
  options?: UseMutationOptions<unknown, Error, BlogFormPayload>,
) => {
  const { mutate, isPending } = useMutation<unknown, Error, BlogFormPayload>({
    mutationFn: createBlog,
    ...options,
  });

  return {
    onCreateBlog: mutate,
    isLoadingCreateBlog: isPending,
  };
};
