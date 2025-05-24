import { zodResolver } from "@hookform/resolvers/zod";
import GenerateQuestionHelpers, { GenerateQuestionFormSchema } from "./helpers";
import { FieldErrors, useForm } from "react-hook-form";
import { useGenerateQuestion } from "@/queries";
import { Toast } from "@/hooks";

type Props = {
  setQuestion: (question: string) => void;
  setJDText: (jdText: string) => void;
};

const useGenerateQuestionForm = ({ setQuestion, setJDText }: Props) => {
  const { handleSubmit, ...formReturns } = useForm<GenerateQuestionFormSchema>({
    defaultValues: GenerateQuestionHelpers.initialValues,
    resolver: zodResolver(GenerateQuestionHelpers.schema),
  });

  const { onGenerateQuestion, isLoadingGenerateQuestion } =
    useGenerateQuestion();

  const onValid = (values: GenerateQuestionFormSchema) => {
    onGenerateQuestion(values, {
      onSuccess: (data) => {
        setJDText(data.jdText);
        setQuestion(data.question);
        Toast.Success("Question generated successfully!");
      },
      onError: () => {
        Toast.Error("Error generating question");
      },
    });
  };

  const onInvalid = (errors: FieldErrors<GenerateQuestionFormSchema>) => {
    console.log("Form validation errors:", errors);
  };

  return {
    ...formReturns,
    onSubmit: handleSubmit(onValid, onInvalid),
    isLoadingGenerateQuestion,
  };
};

export default useGenerateQuestionForm;
