import { answer } from "@/apis";
import { AnswerFormSchema } from "@/containers/User/UserInterview/AnswerForm/helpers";
import { AnswerResponse } from "@/types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export const useAnswer = (
  options?: UseMutationOptions<AnswerResponse, Error, AnswerFormSchema>,
) => {
  const { mutate, isPending } = useMutation<
    AnswerResponse,
    Error,
    AnswerFormSchema
  >({
    mutationFn: answer,
    ...options,
  });

  return {
    onSubmitAnswer: mutate,
    isLoadingSubmitAnswer: isPending,
  };
};
