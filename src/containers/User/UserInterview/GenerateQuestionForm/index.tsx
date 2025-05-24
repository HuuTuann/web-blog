import { Button } from "@/components";
import { Paths, UserKeys } from "@/constants";
import { Controller } from "react-hook-form";
import useGenerateQuestionForm from "./useGenerateQuestionForm";
import { Form, Select, SelectItem, Textarea } from "@heroui/react";
import GenerateQuestionHelpers from "./helpers";
import { useContext } from "react";
import { InterviewContext } from "../InterviewProvider";
import { useRouter } from "next/navigation";

const GenerateQuestionForm = () => {
  const router = useRouter();
  const { question, setQuestion, setJDText } = useContext(InterviewContext);

  const { control, isLoadingGenerateQuestion, onSubmit } =
    useGenerateQuestionForm({
      setQuestion,
      setJDText,
    });

  if (question) return null;

  return (
    <Form className="flex w-full flex-col gap-5" onSubmit={onSubmit}>
      <Controller
        name={UserKeys.JD_TEXT}
        control={control}
        render={({
          field,
          fieldState: { invalid, error: { message } = { message: "" } },
        }) => (
          <Textarea
            label="JD Text"
            labelPlacement="outside"
            placeholder="Enter your JD text"
            variant="bordered"
            isInvalid={invalid}
            errorMessage={message}
            disabled={isLoadingGenerateQuestion}
            {...field}
          />
        )}
      />
      <Controller
        name={UserKeys.INTERVIEW_LANGUAGE}
        control={control}
        render={({
          field,
          fieldState: { invalid, error: { message } = { message: "" } },
        }) => (
          <Select
            label="Interview Language"
            labelPlacement="outside"
            placeholder="Select interview language"
            variant="bordered"
            isInvalid={invalid}
            errorMessage={message}
            disabled={isLoadingGenerateQuestion}
            {...field}
          >
            {GenerateQuestionHelpers.languageOptions.map((option) => (
              <SelectItem key={option.value}>{option.label}</SelectItem>
            ))}
          </Select>
        )}
      />

      {/* Actions */}
      <div className="flex w-full items-center justify-end gap-2">
        <Button
          variant="ioLight"
          onClick={() => {
            router.push(Paths.USER);
          }}
        >
          Back to Home
        </Button>
        <Button
          type="submit"
          variant="ioSolid"
          isLoading={isLoadingGenerateQuestion}
        >
          Generate Questions
        </Button>
      </div>
    </Form>
  );
};

export default GenerateQuestionForm;
