import { Icons } from "@/assets";
import { Button } from "@/components";
import { UserKeys } from "@/constants";
import { useDialog } from "@/hooks";
import { uploadImageToCloudinary } from "@/services";
import { Form, Image, Input } from "@heroui/react";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Controller, useWatch } from "react-hook-form";
import useProfileForm from "./useProfileForm";

const ProfileForm = () => {
  const { hideDialog } = useDialog();
  const { control, isLoadingAction, onSubmit, setValue } = useProfileForm();
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] =
    useState(false);

  const avatarUrl = useWatch({
    control,
    name: UserKeys.AVATAR,
  });

  return (
    <Form className="flex w-full flex-col gap-5" onSubmit={onSubmit}>
      <Controller
        name={UserKeys.FULLNAME}
        control={control}
        render={({
          field,
          fieldState: { invalid, error: { message } = { message: "" } },
        }) => (
          <Input
            label="Title"
            labelPlacement="outside"
            placeholder="Enter your title"
            variant="bordered"
            isInvalid={invalid}
            errorMessage={message}
            {...field}
          />
        )}
      />
      <Controller
        name={UserKeys.PASSWORD}
        control={control}
        render={({
          field,
          fieldState: { invalid, error: { message } = { message: "" } },
        }) => (
          <Input
            label="Password"
            labelPlacement="outside"
            placeholder="Enter your password"
            variant="bordered"
            isInvalid={invalid}
            errorMessage={message}
            type={isVisiblePassword ? "text" : "password"}
            endContent={
              <button
                aria-label="toggle password visibility"
                className="focus:outline-none"
                type="button"
                onClick={() => setIsVisiblePassword((prev) => !prev)}
              >
                {isVisiblePassword ? (
                  <EyeOff className="pointer-events-none text-2xl text-slate-400" />
                ) : (
                  <Eye className="pointer-events-none text-2xl text-slate-400" />
                )}
              </button>
            }
            {...field}
          />
        )}
      />
      <Controller
        name={UserKeys.CONFIRM_PASSWORD}
        control={control}
        render={({
          field,
          fieldState: { invalid, error: { message } = { message: "" } },
        }) => (
          <Input
            label="Confirm Password"
            labelPlacement="outside"
            placeholder="Enter your password again"
            variant="bordered"
            isInvalid={invalid}
            errorMessage={message}
            type={isVisibleConfirmPassword ? "text" : "password"}
            endContent={
              <button
                aria-label="toggle password visibility"
                className="focus:outline-none"
                type="button"
                onClick={() => setIsVisibleConfirmPassword((prev) => !prev)}
              >
                {isVisibleConfirmPassword ? (
                  <EyeOff className="pointer-events-none text-2xl text-slate-400" />
                ) : (
                  <Eye className="pointer-events-none text-2xl text-slate-400" />
                )}
              </button>
            }
            {...field}
          />
        )}
      />
      <div className="w-full">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt="Avatar"
            className="flex w-full rounded-md object-cover"
          />
        ) : (
          <Controller
            name={UserKeys.AVATAR}
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
                        setValue(UserKeys.AVATAR, url);
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
      </div>

      {/* Actions */}
      <div className="flex w-full items-center justify-end gap-2">
        <Button variant="ioLight" onPress={hideDialog}>
          Cancel
        </Button>
        <Button type="submit" variant="ioSolid" isLoading={isLoadingAction}>
          Update
        </Button>
      </div>
    </Form>
  );
};

export default ProfileForm;
