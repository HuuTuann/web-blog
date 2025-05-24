import { useContext } from "react";
import useAnswerForm from "./useAnswerForm";
import { InterviewContext } from "../InterviewProvider";
import { Form, Textarea } from "@heroui/react";
import { Controller } from "react-hook-form";
import { UserKeys } from "@/constants";
import { Button } from "@/components";
import { Divider } from "@heroui/divider";

const AnswerForm = () => {
  const { question, jdText, setEvaluate } = useContext(InterviewContext);

  const { control, isLoading, onSubmit } = useAnswerForm({
    question,
    jdText,
    setEvaluate,
  });

  if (!question || !jdText) return null;

  return (
    <div className="flex w-full flex-col gap-5">
      <Divider />
      <h2 className="text-2xl font-semibold">Answer the Question</h2>
      <Form className="flex w-full flex-col gap-5" onSubmit={onSubmit}>
        <Controller
          name={UserKeys.ANSWER}
          control={control}
          render={({
            field,
            fieldState: { invalid, error: { message } = { message: "" } },
          }) => (
            <Textarea
              label="Answer"
              labelPlacement="outside"
              placeholder="Enter your answer"
              variant="bordered"
              isInvalid={invalid}
              errorMessage={message}
              disabled={isLoading}
              {...field}
            />
          )}
        />

        {/* Actions */}
        <div className="flex w-full items-center justify-end gap-2">
          <Button type="submit" variant="ioSolid" isLoading={isLoading}>
            Submit Answer
          </Button>
        </div>
      </Form>
    </div>
  );
};
export default AnswerForm;
