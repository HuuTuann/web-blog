"use client";

import { Button } from "@/components";
import { LoginKeys } from "@/constants";
import { LoginPayload } from "@/types";
import { Form, Input } from "@heroui/react";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { useLogin } from "./useLogin";

export const Login = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { control, handleSubmit } = useLogin();

  const onSubmit = (data: LoginPayload) => {
    console.log(data);
  };

  return (
    <div className="flex min-w-96 flex-col gap-5 rounded-3xl bg-slate-50 p-10">
      <h1 className="text-center text-3xl font-bold">Login</h1>
      <Form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name={LoginKeys.EMAIL}
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
          name={LoginKeys.PASSWORD}
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
              type={isVisible ? "text" : "password"}
              endContent={
                <button
                  aria-label="toggle password visibility"
                  className="focus:outline-none"
                  type="button"
                  onClick={() => setIsVisible((prev) => !prev)}
                >
                  {isVisible ? (
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
      </Form>
      <Button variant="ioSolid" onPress={() => handleSubmit(onSubmit)()}>
        Login
      </Button>
    </div>
  );
};
