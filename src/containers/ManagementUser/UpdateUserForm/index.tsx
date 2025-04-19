"use client";

import { Icons } from "@/assets";
import { Button } from "@/components";
import { ManagementUserKeys } from "@/constants";
import { uploadImageToCloudinary } from "@/services";
import { Form, Image, Input } from "@heroui/react";
import { Controller, useWatch } from "react-hook-form";
import { useUpdateUserForm } from "./useUpdateUserForm";

type Props = {
  id: string;
};

export const UpdateUserForm = ({ id }: Props) => {
  const { control, onSubmit, setValue } = useUpdateUserForm({
    id,
  });

  const avatarUrl = useWatch({
    control,
    name: ManagementUserKeys.AVATAR,
  });

  return (
    <Form className="flex w-full flex-col gap-5" onSubmit={onSubmit}>
      <Controller
        name={ManagementUserKeys.FULL_NAME}
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

      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt="Avatar"
          className="flex w-full rounded-md object-cover"
        />
      ) : (
        <Controller
          name={ManagementUserKeys.AVATAR}
          control={control}
          render={({ field: { value, onChange, ...restField } }) => (
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
                      setValue(ManagementUserKeys.AVATAR, url);
                    } catch (error) {
                      console.error("Upload failed:", error);
                    }
                  }
                }}
                className="hidden"
                {...restField}
              />
            </div>
          )}
        />
      )}
      <div className="flex w-full items-center justify-end gap-2">
        <Button variant="ioLight">Cancel</Button>
        <Button type="submit" variant="ioSolid">
          Save
        </Button>
      </div>
    </Form>
  );
};
