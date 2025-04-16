"use client";

import { Button, Link } from "@/components";
import { LoginKeys } from "@/constants";
import { Form, Input } from "@heroui/react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { useLoginForm } from "./useLoginForm";

export const Login = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const { isLoadingLogin, control, onSubmit } = useLoginForm();

  return (
    <div className="flex min-w-96 flex-col items-center gap-2 rounded-3xl bg-slate-50 p-10">
      <h1 className="text-center text-3xl font-bold">Login</h1>
      <Form className="flex w-full flex-col gap-5 pt-3" onSubmit={onSubmit}>
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
        <Button
          type="submit"
          variant="ioSolid"
          className="mt-3 w-full"
          isLoading={isLoadingLogin}
        >
          Login
        </Button>
      </Form>
      <Link
        isBlock
        showAnchorIcon
        color="io"
        onPress={() => router.push("/register")}
      >
        Create an account
      </Link>
    </div>
  );
};
