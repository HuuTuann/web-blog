import { deleteBlog } from "@/apis";
import { DeleteBlogPayload } from "@/types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export const useDeleteBlog = (
  options?: UseMutationOptions<unknown, Error, DeleteBlogPayload>,
) => {
  const { mutate, isPending } = useMutation<unknown, Error, DeleteBlogPayload>({
    mutationFn: deleteBlog,
    ...options,
  });

  return {
    onDeleteBlog: mutate,
    isLoadingDeleteBlog: isPending,
  };
};
