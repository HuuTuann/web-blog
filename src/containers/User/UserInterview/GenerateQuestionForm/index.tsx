import { Button } from "@/components";
import { Paths, UserKeys } from "@/constants";
import { Controller, useWatch } from "react-hook-form";
import useGenerateQuestionForm from "./useGenerateQuestionForm";
import { cn, Form, Input, Select, SelectItem, Textarea } from "@heroui/react";
import GenerateQuestionHelpers from "./helpers";
import { useContext, useState } from "react";
import { InterviewContext } from "../InterviewProvider";
import { useRouter } from "next/navigation";
import { Icons } from "@/assets";

const GenerateQuestionForm = () => {
  const router = useRouter();
  const [fileName, setFileName] = useState("");
  const { question, setQuestion, setJDText } = useContext(InterviewContext);

  const { control, isLoadingGenerateQuestion, onSubmit, setValue } =
    useGenerateQuestionForm({
      setQuestion,
      setJDText,
    });

  const [inputType, uploadFile] = useWatch({
    control,
    name: [UserKeys.INPUT_TYPE, UserKeys.UPLOAD_FILE],
  });

  if (question) return null;

  return (
    <Form className="flex w-full flex-col gap-5" onSubmit={onSubmit}>
      <Controller
        name={UserKeys.INPUT_TYPE}
        control={control}
        render={({
          field,
          fieldState: { invalid, error: { message } = { message: "" } },
        }) => (
          <Select
            label="Input Type"
            labelPlacement="outside"
            placeholder="Select input type"
            variant="bordered"
            disallowEmptySelection
            isInvalid={invalid}
            errorMessage={message}
            defaultSelectedKeys={["jdText"]}
            disabled={isLoadingGenerateQuestion}
            {...field}
          >
            {GenerateQuestionHelpers.inputTypeOptions.map((option) => (
              <SelectItem key={option.value}>{option.label}</SelectItem>
            ))}
          </Select>
        )}
      />
      {inputType === "uploadFile" ? (
        uploadFile ? (
          <div className="flex w-full items-center justify-between gap-2 rounded-lg border p-2 shadow-sm hover:shadow-md">
            <div className="flex flex-1 items-center gap-2">
              <p className="break-all text-sm text-gray-700">{fileName}</p>
            </div>
            <Button
              variant="ioLight"
              onPress={() => {
                setValue(UserKeys.UPLOAD_FILE, "");
              }}
            >
              Remove
            </Button>
          </div>
        ) : (
          <Controller
            name={UserKeys.UPLOAD_FILE}
            control={control}
            render={({
              fieldState: { invalid, error: { message } = { message: "" } },
            }) => (
              <div className="flex w-full flex-col items-start justify-center gap-2">
                <label
                  className={cn("text-sm font-medium text-gray-700", {
                    "text-red-500": invalid,
                  })}
                >
                  Upload File
                </label>
                <label
                  htmlFor="upload-file"
                  className={cn(
                    "flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4 text-center hover:bg-gray-100",
                    { "border-red-500": invalid },
                  )}
                >
                  <Icons.NoFile size={96} />
                  <p className="mt-2 text-sm text-slate-500">
                    Click or drag file to this area to upload
                  </p>
                </label>
                {invalid && <p className="text-sm text-red-500">{message}</p>}
                <Input
                  type="file"
                  id="upload-file"
                  accept=".pdf"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      console.log("🚀 ~ onChange={ ~ file:", file);
                      setFileName(file.name);
                      setValue(UserKeys.UPLOAD_FILE, file);
                    }
                  }}
                />
              </div>
            )}
          />
        )
      ) : (
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
      )}

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
            disallowEmptySelection
            isInvalid={invalid}
            errorMessage={message}
            defaultSelectedKeys={["vi"]}
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
