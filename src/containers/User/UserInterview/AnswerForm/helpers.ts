import { UserKeys } from "@/constants";
import { z } from "zod";

const schema = z.object({
  [UserKeys.JD_TEXT]: z.string().nonempty({
    message: "JD text is required",
  }),
  [UserKeys.QUESTION]: z.string().nonempty({
    message: "Question is required",
  }),
  [UserKeys.ANSWER]: z.string().nonempty({
    message: "Answer is required",
  }),
});

const initialValues: AnswerFormSchema = {
  [UserKeys.JD_TEXT]: "",
  [UserKeys.QUESTION]: "",
  [UserKeys.ANSWER]: "",
};

const getInitialValues = (
  jdText: string,
  question: string,
): AnswerFormSchema => ({
  [UserKeys.JD_TEXT]: jdText,
  [UserKeys.QUESTION]: question,
  [UserKeys.ANSWER]: "",
});

const AnswerFormHelpers = {
  schema,
  initialValues,
  getInitialValues,
};

export default AnswerFormHelpers;
export type AnswerFormSchema = z.infer<typeof schema>;
