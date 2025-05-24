import { FieldErrors, useForm } from "react-hook-form";
import AnswerFormHelpers, { AnswerFormSchema } from "./helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAnswer } from "@/queries";
import { Toast } from "@/hooks";

type Props = {
  question: string;
  jdText: string;
  setEvaluate: (evaluate: string) => void;
};

const useAnswerForm = ({ question, jdText, setEvaluate }: Props) => {
  const { handleSubmit, ...formReturn } = useForm<AnswerFormSchema>({
    values: AnswerFormHelpers.getInitialValues(jdText, question),
    defaultValues: AnswerFormHelpers.initialValues,
    resolver: zodResolver(AnswerFormHelpers.schema),
  });

  const { onSubmitAnswer, isLoadingSubmitAnswer } = useAnswer();

  const onValid = (values: AnswerFormSchema) => {
    onSubmitAnswer(values, {
      onSuccess: (data) => {
        setEvaluate(data.evaluation);
        Toast.Success("Answer submitted successfully!");
      },
      onError: () => {
        Toast.Error("Failed to submit answer.");
      },
    });
  };

  const onInvalid = (errors: FieldErrors<AnswerFormSchema>) => {
    console.error("Form validation errors:", errors);
  };

  return {
    ...formReturn,
    onSubmit: handleSubmit(onValid, onInvalid),
    isLoading: isLoadingSubmitAnswer,
  };
};

export default useAnswerForm;
