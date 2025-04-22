import { Icons } from "@/assets";
import { Button } from "@/components";
import { ManagementBlogKeys } from "@/constants";
import { useDialog } from "@/hooks";
import { uploadImageToCloudinary } from "@/services";
import { Form, Image, Input } from "@heroui/react";
import { Controller, useWatch } from "react-hook-form";
import { useBlogForm } from "./useBlogForm";

type Props = {
  id?: number;
};

export const BlogForm = ({ id }: Props) => {
  const { hideDialog } = useDialog();
  const { control, onSubmit, setValue } = useBlogForm({
    ...(id ? { id } : {}),
  });

  const imageUrl = useWatch({
    control,
    name: ManagementBlogKeys.IMAGE,
  });

  return (
    <Form className="flex w-full flex-col gap-5" onSubmit={onSubmit}>
      <Controller
        name={ManagementBlogKeys.TITLE}
        control={control}
        render={({
          field,
          fieldState: { invalid, error: { message } = { message: "" } },
        }) => (
          <Input
            label="Full Name"
            labelPlacement="outside"
            placeholder="Enter your full name"
            variant="bordered"
            isInvalid={invalid}
            errorMessage={message}
            {...field}
          />
        )}
      />

      <Controller
        name={ManagementBlogKeys.CONTENT}
        control={control}
        render={({
          field,
          fieldState: { invalid, error: { message } = { message: "" } },
        }) => (
          <Input
            label="Content"
            labelPlacement="outside"
            placeholder="Enter your content"
            variant="bordered"
            isInvalid={invalid}
            errorMessage={message}
            {...field}
          />
        )}
      />

      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="Image"
          className="flex w-full rounded-md object-cover"
        />
      ) : (
        <Controller
          name={ManagementBlogKeys.IMAGE}
          control={control}
          render={() => (
            <div className="w-full">
              <label className="text-sm font-medium text-gray-700">
                Avatar
              </label>
              <label
                htmlFor="avatar"
                className="flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4 text-center hover:bg-gray-100"
              >
                <Icons.NoImage size={96} />
                <p className="mt-2 text-sm text-slate-500">
                  Click or drag file to this area to upload
                </p>
              </label>
              <input
                type="file"
                id="avatar"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    try {
                      const url = await uploadImageToCloudinary(file);
                      setValue(ManagementBlogKeys.IMAGE, url);
                    } catch (error) {
                      console.error("Upload failed:", error);
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
          {id ? "Update" : "Create"}
        </Button>
      </div>
    </Form>
  );
};
