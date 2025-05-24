import { generateQuestion } from "@/apis";
import { GenerateQuestionFormSchema } from "@/containers/User/UserInterview/GenerateQuestionForm/helpers";
import { GenerateQuestionResponse } from "@/types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export const useGenerateQuestion = (
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
    mutationFn: generateQuestion,
    ...options,
  });

  return {
    onGenerateQuestion: mutate,
    isLoadingGenerateQuestion: isPending,
  };
};
