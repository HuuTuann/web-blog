import { Icons } from "@/assets";
import { Button } from "@/components";
import { ManagementBusinessKeys } from "@/constants";
import { useDialog } from "@/hooks";
import { uploadImageToCloudinary } from "@/services";
import { Form, Image, Input, Textarea } from "@heroui/react";
import { isEmpty } from "lodash";
import { Controller, useWatch } from "react-hook-form";
import { useBusinessForm } from "./useBusinessForm";

type Props = {
  id?: number;
};

export const BusinessForm = ({ id }: Props) => {
  const isEdit = !!id;
  const { hideDialog } = useDialog();

  const { control, onSubmit, setValue } = useBusinessForm({
    ...(id ? { id } : {}),
  });

  const imageUrl = useWatch({
    control,
    name: ManagementBusinessKeys.IMAGE,
  });

  return (
    <Form className="grid w-full grid-cols-3 gap-5" onSubmit={onSubmit}>
      <Controller
        name={ManagementBusinessKeys.NAME}
        control={control}
        render={({
          field,
          fieldState: { invalid, error: { message } = { message: "" } },
        }) => (
          <Input
            label="Name"
            labelPlacement="outside"
            placeholder="Enter your name"
            variant="bordered"
            isInvalid={invalid}
            errorMessage={message}
            {...field}
          />
        )}
      />
      <Controller
        name={ManagementBusinessKeys.SIZE}
        control={control}
        render={({
          field,
          fieldState: { invalid, error: { message } = { message: "" } },
        }) => (
          <Input
            label="Size"
            labelPlacement="outside"
            placeholder="Enter your size"
            variant="bordered"
            isInvalid={invalid}
            errorMessage={message}
            {...field}
          />
        )}
      />
      <Controller
        name={ManagementBusinessKeys.NATIONALITY}
        control={control}
        render={({
          field,
          fieldState: { invalid, error: { message } = { message: "" } },
        }) => (
          <Input
            label="Nationality"
            labelPlacement="outside"
            placeholder="Enter your nationality"
            variant="bordered"
            isInvalid={invalid}
            errorMessage={message}
            {...field}
          />
        )}
      />
      <Controller
        name={ManagementBusinessKeys.SLOGAN}
        control={control}
        render={({
          field,
          fieldState: { invalid, error: { message } = { message: "" } },
        }) => (
          <Input
            label="Slogan"
            labelPlacement="outside"
            placeholder="Enter your slogan"
            variant="bordered"
            isInvalid={invalid}
            errorMessage={message}
            {...field}
          />
        )}
      />
      {!isEdit && (
        <>
          <Controller
            name={ManagementBusinessKeys.INDUSTRY}
            control={control}
            render={({
              field,
              fieldState: { invalid, error: { message } = { message: "" } },
            }) => (
              <Input
                isReadOnly={!isEmpty(id)}
                label="Industry"
                labelPlacement="outside"
                placeholder="Enter your industry"
                variant="bordered"
                isInvalid={invalid}
                errorMessage={message}
                {...field}
              />
            )}
          />
          <Controller
            name={ManagementBusinessKeys.WARD}
            control={control}
            render={({
              field,
              fieldState: { invalid, error: { message } = { message: "" } },
            }) => (
              <Input
                isReadOnly={!isEmpty(id)}
                label="Ward"
                labelPlacement="outside"
                placeholder="Enter your ward"
                variant="bordered"
                isInvalid={invalid}
                errorMessage={message}
                {...field}
              />
            )}
          />
          <Controller
            name={ManagementBusinessKeys.DISTRICT}
            control={control}
            render={({
              field,
              fieldState: { invalid, error: { message } = { message: "" } },
            }) => (
              <Input
                isReadOnly={!isEmpty(id)}
                label="District"
                labelPlacement="outside"
                placeholder="Enter your district"
                variant="bordered"
                isInvalid={invalid}
                errorMessage={message}
                {...field}
              />
            )}
          />
          <Controller
            name={ManagementBusinessKeys.CITY}
            control={control}
            render={({
              field,
              fieldState: { invalid, error: { message } = { message: "" } },
            }) => (
              <Input
                isReadOnly={!isEmpty(id)}
                label="City"
                labelPlacement="outside"
                placeholder="Enter your city"
                variant="bordered"
                isInvalid={invalid}
                errorMessage={message}
                {...field}
              />
            )}
          />
        </>
      )}
      <Controller
        name={ManagementBusinessKeys.WEBSITE}
        control={control}
        render={({
          field,
          fieldState: { invalid, error: { message } = { message: "" } },
        }) => (
          <Input
            label="Website"
            labelPlacement="outside"
            placeholder="Enter your website"
            variant="bordered"
            isInvalid={invalid}
            errorMessage={message}
            {...field}
          />
        )}
      />
      <Controller
        name={ManagementBusinessKeys.CONTACT}
        control={control}
        render={({
          field,
          fieldState: { invalid, error: { message } = { message: "" } },
        }) => (
          <Input
            label="Contact"
            labelPlacement="outside"
            placeholder="Enter your contact"
            variant="bordered"
            isInvalid={invalid}
            errorMessage={message}
            {...field}
          />
        )}
      />
      {!isEdit && (
        <Controller
          name={ManagementBusinessKeys.BENEFITS}
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
      )}
      <Controller
        name={ManagementBusinessKeys.DESCRIPTION}
        control={control}
        render={({
          field,
          fieldState: { invalid, error: { message } = { message: "" } },
        }) => (
          <Textarea
            label="Description"
            labelPlacement="outside"
            placeholder="Enter your description"
            variant="bordered"
            isInvalid={invalid}
            errorMessage={message}
            className="col-span-3"
            {...field}
          />
        )}
      />
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="Image"
          className="col-span-3 flex w-full rounded-md object-cover"
        />
      ) : (
        <Controller
          name={ManagementBusinessKeys.IMAGE}
          control={control}
          render={() => (
            <div className="col-span-3 w-full">
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
                      setValue(ManagementBusinessKeys.IMAGE, url);
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
