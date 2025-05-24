import { UserKeys } from "@/constants";
import { z } from "zod";

const schema = z.object({
  [UserKeys.JD_TEXT]: z.string().nonempty({
    message: "JD text is required",
  }),
  [UserKeys.INTERVIEW_LANGUAGE]: z.string().nonempty({
    message: "Interview language is required",
  }),
});

const initialValues: GenerateQuestionFormSchema = {
  [UserKeys.JD_TEXT]: "",
  [UserKeys.INTERVIEW_LANGUAGE]: "vi",
};

const languageOptions = [
  { label: "English", value: "en" },
  { label: "Vietnamese", value: "vi" },
];

const GenerateQuestionHelpers = {
  schema,
  initialValues,
  languageOptions,
};

export default GenerateQuestionHelpers;
export type GenerateQuestionFormSchema = z.infer<typeof schema>;
