import { generateQuestionUpload } from "@/apis";
import { GenerateQuestionFormSchema } from "@/containers/User/UserInterview/GenerateQuestionForm/helpers";
import { GenerateQuestionResponse } from "@/types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export const useGenerateQuestionUpload = (
  options?: UseMutationOptions<
    GenerateQuestionResponse,
    Error,
    GenerateQuestionFormSchema
  >,
) => {
  const { mutate, isPending } = useMutation<
    GenerateQuestionResponse,
    Error,
    GenerateQuestionFormSchema
  >({
    mutationFn: generateQuestionUpload,
    ...options,
  });

  return {
    onGenerateQuestionUpload: mutate,
    isLoadingGenerateQuestionUpload: isPending,
  };
};
