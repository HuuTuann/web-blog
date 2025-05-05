import { useDialog } from "@/hooks";
import useApplyForm from "./useApplyForm";
import { Form, Spinner } from "@heroui/react";
import { Controller, useWatch } from "react-hook-form";
import { Icons } from "@/assets";
import { uploadPDFToCloudinary } from "@/services";
import { UserKeys } from "@/constants";
import { Button } from "@/components";
import { useState } from "react";

type Props = {
  id: number;
};

const ApplyForm = ({ id }: Props) => {
  const { hideDialog } = useDialog();
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState("");

  const { control, onSubmit, setValue } = useApplyForm({
    id,
  });

  const fileUrl = useWatch({
    control,
    name: UserKeys.FILE,
  });

  return (
    <Form className="flex w-full flex-col gap-5" onSubmit={onSubmit}>
      {fileUrl ? (
        <div className="flex w-full items-center justify-between gap-2 rounded-lg border p-2 shadow-sm hover:shadow-md">
          <div className="flex flex-1 items-center gap-2">
            <p className="break-all text-sm text-gray-700">{fileName}</p>
          </div>
          <Button
            variant="ioLight"
            onPress={() => {
              setValue(UserKeys.FILE, "");
            }}
          >
            Remove
          </Button>
        </div>
      ) : (
        <Controller
          name={UserKeys.FILE}
          control={control}
          render={() => (
            <div className="flex w-full flex-col items-start justify-center gap-2">
              <label className="text-sm font-medium text-gray-700">CV</label>
              {isLoading ? (
                <div className="flex w-full justify-center">
                  <Spinner size="lg" />
                </div>
              ) : (
                <label
                  htmlFor="avatar"
                  className="flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4 text-center hover:bg-gray-100"
                >
                  <Icons.NoFile size={96} />
                  <p className="mt-2 text-sm text-slate-500">
                    Click or drag file to this area to upload
                  </p>
                </label>
              )}
              <input
                type="file"
                id="avatar"
                accept=".pdf"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    try {
                      setIsLoading(true);
                      const { url, name } = await uploadPDFToCloudinary(file);
                      setValue(UserKeys.FILE, url);
                      setFileName(name);
                    } catch (error) {
                      console.error("Upload failed:", error);
                    } finally {
                      setIsLoading(false);
                    }
                  }
                }}
                className="hidden"
              />
            </div>
          )}
        />
      )}

      {/* Actions */}
      <div className="flex w-full items-center justify-end gap-2">
        <Button variant="ioLight" onPress={hideDialog}>
          Cancel
        </Button>
        <Button type="submit" variant="ioSolid">
          Apply
        </Button>
      </div>
    </Form>
  );
};

export default ApplyForm;
