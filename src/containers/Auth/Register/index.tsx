"use client";

import { Button, Link } from "@/components";
import { RegisterKeys } from "@/constants";
import { Form, Input } from "@heroui/react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { useRegisterForm } from "./useRegisterForm";

export const Register = () => {
  const router = useRouter();
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] =
    useState(false);
  const { isLoadingRegister, control, onSubmit } = useRegisterForm();

  return (
    <div className="flex min-w-96 flex-col items-center gap-2 rounded-3xl bg-slate-50 p-10">
      <h1 className="text-center text-3xl font-bold">Register</h1>
      <Form className="flex w-full flex-col gap-5 pt-3" onSubmit={onSubmit}>
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
        <Button
          type="submit"
          variant="ioSolid"
          className="mt-3 w-full"
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
