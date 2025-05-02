import { updateUserProfile } from "@/apis";
import { UserProfilePayload } from "@/types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export const useUpdateUserProfile = (
  options?: UseMutationOptions<unknown, Error, UserProfilePayload>,
) => {
  const { mutate, isPending } = useMutation<unknown, Error, UserProfilePayload>(
    {
      mutationFn: updateUserProfile,
      ...options,
    },
  );

  return {
    onUpdateUserProfile: mutate,
    isLoadingUpdateUserProfile: isPending,
  };
};
