import { UserKeys } from "@/constants";
import { z } from "zod";

const schema = z
  .object({
    [UserKeys.INPUT_TYPE]: z.string().optional(),
    [UserKeys.JD_TEXT]: z.string().optional(),
    [UserKeys.UPLOAD_FILE]: z.any().optional(),
    [UserKeys.INTERVIEW_LANGUAGE]: z.string().nonempty({
      message: "Interview language is required",
    }),
  })
  .refine(
    (data) =>
      data[UserKeys.INPUT_TYPE] !== "uploadFile" || data[UserKeys.UPLOAD_FILE],
    {
      message: "File upload is required",
      path: [UserKeys.UPLOAD_FILE],
    },
  )
  .refine(
    (data) => data[UserKeys.INPUT_TYPE] !== "jdText" || data[UserKeys.JD_TEXT],
    {
      message: "JD text is required",
      path: [UserKeys.JD_TEXT],
    },
  );

const initialValues: GenerateQuestionFormSchema = {
  [UserKeys.INPUT_TYPE]: "jdText",
  [UserKeys.JD_TEXT]: "",
  [UserKeys.UPLOAD_FILE]: "",
  [UserKeys.INTERVIEW_LANGUAGE]: "vi",
};

const languageOptions = [
  { label: "English", value: "en" },
  { label: "Vietnamese", value: "vi" },
];

const inputTypeOptions = [
  { label: "Input Manually", value: "jdText" },
  { label: "Upload File", value: "uploadFile" },
];

const GenerateQuestionHelpers = {
  schema,
  initialValues,
  languageOptions,
  inputTypeOptions,
};

export default GenerateQuestionHelpers;

export type GenerateQuestionFormSchema = z.infer<typeof schema>;
