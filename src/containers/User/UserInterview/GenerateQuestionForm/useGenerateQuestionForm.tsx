import { zodResolver } from "@hookform/resolvers/zod";
import GenerateQuestionHelpers, { GenerateQuestionFormSchema } from "./helpers";
import { FieldErrors, useForm } from "react-hook-form";
import { useGenerateQuestion, useGenerateQuestionUpload } from "@/queries";
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

  const { onGenerateQuestionUpload, isLoadingGenerateQuestionUpload } =
    useGenerateQuestionUpload();

  const onValid = (values: GenerateQuestionFormSchema) => {
    const { inputType, ...restValues } = values;

    if (inputType === "uploadFile") {
      onGenerateQuestionUpload(restValues, {
        onSuccess: (data) => {
          setJDText(data.jdText);
          setQuestion(data.question);
          Toast.Success("Question generated successfully!");
        },
        onError: () => {
          Toast.Error("Error generating question");
        },
      });
    } else {
      onGenerateQuestion(restValues, {
        onSuccess: (data) => {
          setJDText(data.jdText);
          setQuestion(data.question);
          Toast.Success("Question generated successfully!");
        },
        onError: () => {
          Toast.Error("Error generating question");
        },
      });
    }
  };

  const onInvalid = (errors: FieldErrors<GenerateQuestionFormSchema>) => {
    console.log("Form validation errors:", errors);
  };

  return {
    ...formReturns,
    onSubmit: handleSubmit(onValid, onInvalid),
    isLoadingGenerateQuestion:
      isLoadingGenerateQuestion || isLoadingGenerateQuestionUpload,
  };
};

export default useGenerateQuestionForm;
