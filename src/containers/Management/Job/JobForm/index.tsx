import { Button } from "@/components";
import { ManagementJobKeys } from "@/constants";
import { useDialog } from "@/hooks";
import { Form, Input, Select, SelectItem, Textarea } from "@heroui/react";
import { Controller } from "react-hook-form";
import { JobHelpers } from "./helpers";
import { useJobForm } from "./useJobForm";

type Props = {
  id?: number;
};

export const JobForm = ({ id }: Props) => {
  const { hideDialog } = useDialog();

  const { control, onSubmit } = useJobForm({
    ...(id ? { id } : {}),
  });

  return (
    <Form className="grid w-full grid-cols-3 gap-5" onSubmit={onSubmit}>
      <Controller
        name={ManagementJobKeys.TITLE}
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
        name={ManagementJobKeys.YEAR_EXP}
        control={control}
        render={({
          field,
          fieldState: { invalid, error: { message } = { message: "" } },
        }) => (
          <Input
            label="Year of Experience"
            labelPlacement="outside"
            placeholder="Enter your year of experience"
            variant="bordered"
            isInvalid={invalid}
            errorMessage={message}
            {...field}
          />
        )}
      />
      <Controller
        name={ManagementJobKeys.TYPE}
        control={control}
        render={({
          field,
          fieldState: { invalid, error: { message } = { message: "" } },
        }) => (
          <Input
            label="Type"
            labelPlacement="outside"
            placeholder="Enter your type"
            variant="bordered"
            isInvalid={invalid}
            errorMessage={message}
            {...field}
          />
        )}
      />
      <Controller
        name={ManagementJobKeys.CONTRACT}
        control={control}
        render={({
          field,
          fieldState: { invalid, error: { message } = { message: "" } },
        }) => (
          <Input
            label="Contract"
            labelPlacement="outside"
            placeholder="Enter your contract"
            variant="bordered"
            isInvalid={invalid}
            errorMessage={message}
            {...field}
          />
        )}
      />
      <Controller
        name={ManagementJobKeys.PRICE_DESC}
        control={control}
        render={({
          field,
          fieldState: { invalid, error: { message } = { message: "" } },
        }) => (
          <Input
            label="Price Description"
            labelPlacement="outside"
            placeholder="Enter your price description"
            variant="bordered"
            isInvalid={invalid}
            errorMessage={message}
            {...field}
          />
        )}
      />
      <Controller
        name={ManagementJobKeys.RECRUITMENT_PROG}
        control={control}
        render={({
          field,
          fieldState: { invalid, error: { message } = { message: "" } },
        }) => (
          <Input
            label="Recruitment Program"
            labelPlacement="outside"
            placeholder="Enter your price recruitment program"
            variant="bordered"
            isInvalid={invalid}
            errorMessage={message}
            {...field}
          />
        )}
      />
      <Controller
        name={ManagementJobKeys.DEADLINE}
        control={control}
        render={({
          field,
          fieldState: { invalid, error: { message } = { message: "" } },
        }) => (
          <Input
            label="Deadline"
            labelPlacement="outside"
            placeholder="Enter your deadline"
            variant="bordered"
            isInvalid={invalid}
            errorMessage={message}
            {...field}
          />
        )}
      />
      <Controller
        name={ManagementJobKeys.LEVEL_DES}
        control={control}
        render={({
          field,
          fieldState: { invalid, error: { message } = { message: "" } },
        }) => (
          <Input
            label="Level Description"
            labelPlacement="outside"
            placeholder="Enter your level description"
            variant="bordered"
            isInvalid={invalid}
            errorMessage={message}
            {...field}
          />
        )}
      />
      <Controller
        name={ManagementJobKeys.LEVEL_CODE}
        control={control}
        render={({
          field,
          fieldState: { invalid, error: { message } = { message: "" } },
        }) => (
          <Input
            label="Level Code"
            labelPlacement="outside"
            placeholder="Enter your level code"
            variant="bordered"
            isInvalid={invalid}
            errorMessage={message}
            {...field}
          />
        )}
      />

      <Controller
        name={ManagementJobKeys.QUANTITY_OPENING}
        control={control}
        render={({
          field,
          fieldState: { invalid, error: { message } = { message: "" } },
        }) => (
          <Input
            label="Quantity Opening"
            labelPlacement="outside"
            placeholder="Enter your quantity opening"
            variant="bordered"
            isInvalid={invalid}
            errorMessage={message}
            {...field}
          />
        )}
      />
      <Controller
        name={ManagementJobKeys.IS_OPENING}
        control={control}
        render={({
          field,
          fieldState: { invalid, error: { message } = { message: "" } },
        }) => (
          <Select
            label="Opening"
            labelPlacement="outside"
            placeholder="Select your opening"
            variant="bordered"
            isInvalid={invalid}
            errorMessage={message}
            {...field}
          >
            {JobHelpers.openingApproveOptions.map((option) => (
              <SelectItem key={option.value}>{option.label}</SelectItem>
            ))}
          </Select>
        )}
      />
      <Controller
        name={ManagementJobKeys.IS_APPROVE}
        control={control}
        render={({
          field,
          fieldState: { invalid, error: { message } = { message: "" } },
        }) => (
          <Select
            label="Approve"
            labelPlacement="outside"
            placeholder="Select your approve"
            variant="bordered"
            isInvalid={invalid}
            errorMessage={message}
            {...field}
          >
            {JobHelpers.openingApproveOptions.map((option) => (
              <SelectItem key={option.value}>{option.label}</SelectItem>
            ))}
          </Select>
        )}
      />

      <Controller
        name={ManagementJobKeys.TECH_STACK_DESC}
        control={control}
        render={({
          field,
          fieldState: { invalid, error: { message } = { message: "" } },
        }) => (
          <Textarea
            label="Tech Stack Description"
            labelPlacement="outside"
            placeholder="Enter your tech stack description"
            variant="bordered"
            isInvalid={invalid}
            errorMessage={message}
            className="col-span-3"
            {...field}
          />
        )}
      />
      <Controller
        name={ManagementJobKeys.BENEFIT}
        control={control}
        render={({
          field,
          fieldState: { invalid, error: { message } = { message: "" } },
        }) => (
          <Textarea
            label="Benefits"
            labelPlacement="outside"
            placeholder="Enter your benefits"
            variant="bordered"
            isInvalid={invalid}
            errorMessage={message}
            className="col-span-3"
            {...field}
          />
        )}
      />
      <Controller
        name={ManagementJobKeys.DESC}
        control={control}
        render={({
          field,
          fieldState: { invalid, error: { message } = { message: "" } },
        }) => (
          <Textarea
            label="Benefits"
            labelPlacement="outside"
            placeholder="Enter your benefits"
            variant="bordered"
            isInvalid={invalid}
            errorMessage={message}
            className="col-span-3"
            {...field}
          />
        )}
      />

      {/* Actions */}
      <div className="col-span-3 flex w-full items-center justify-end gap-2">
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
