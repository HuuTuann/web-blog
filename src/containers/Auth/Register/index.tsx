"use client";

import { Icons } from "@/assets";
import { Button, Link } from "@/components";
import { RegisterKeys } from "@/constants";
import { uploadImageToCloudinary } from "@/services";
import { Form, Image, Input, Select, SelectItem } from "@heroui/react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useWatch } from "react-hook-form";
import { roleOptions } from "./helpers";
import { useRegisterForm } from "./useRegisterForm";

export const Register = () => {
  const router = useRouter();
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] =
    useState(false);
  const { isLoadingRegister, control, onSubmit, setValue } = useRegisterForm();

  const avatarUrl = useWatch({
    control,
    name: RegisterKeys.AVATAR,
  });

  return (
    <div className="flex max-h-[calc(100vh-4rem)] w-1/2 flex-col items-center gap-2 overflow-y-auto rounded-3xl bg-slate-50 p-10">
      <h1 className="text-center text-3xl font-bold">Register</h1>
      <Form className="grid w-full grid-cols-2 pt-3" onSubmit={onSubmit}>
        <Controller
          name={RegisterKeys.FULLNAME}
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
          name={RegisterKeys.EMAIL}
          control={control}
          render={({
            field,
            fieldState: { invalid, error: { message } = { message: "" } },
          }) => (
            <Input
              label="Email"
              labelPlacement="outside"
              placeholder="Enter your email"
              variant="bordered"
              isInvalid={invalid}
              errorMessage={message}
              {...field}
            />
          )}
        />
        <Controller
          name={RegisterKeys.PASSWORD}
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
          name={RegisterKeys.CONFIRM_PASSWORD}
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
        <Controller
          name={RegisterKeys.ROLE}
          control={control}
          render={({
            field,
            fieldState: { invalid, error: { message } = { message: "" } },
          }) => (
            <Select
              label="Role"
              labelPlacement="outside"
              placeholder="Enter your role"
              variant="bordered"
              isInvalid={invalid}
              errorMessage={message}
              {...field}
            >
              {roleOptions.map((option) => (
                <SelectItem key={option.value}>{option.label}</SelectItem>
              ))}
            </Select>
          )}
        />
        <div className="col-span-2">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt="Avatar"
              className="flex w-full rounded-md object-cover"
            />
          ) : (
            <Controller
              name={RegisterKeys.AVATAR}
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
                          setValue(RegisterKeys.AVATAR, url);
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
        </div>

        <Button
          type="submit"
          variant="ioSolid"
          className="col-span-2 mt-3 w-full"
          isLoading={isLoadingRegister}
        >
          Register
        </Button>
      </Form>
      <Link
        isBlock
        showAnchorIcon
        color="io"
        onPress={() => {
          router.push("/login");
        }}
      >
        Already have an account? Log In
      </Link>
    </div>
  );
};
