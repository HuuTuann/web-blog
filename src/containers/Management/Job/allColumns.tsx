import { ManagementJobKeys } from "@/constants";
import { GetJobResponse } from "@/types";
import { Button, Chip } from "@heroui/react";
import { Check, X } from "lucide-react";

export const allColumnsForTable = [
  {
    key: ManagementJobKeys.TITLE,
    label: "Title",
  },
  {
    key: ManagementJobKeys.YEAR_EXP,
    label: "Year of Experience",
  },
  {
    key: ManagementJobKeys.TYPE,
    label: "Type",
  },
  {
    key: ManagementJobKeys.CONTRACT,
    label: "Contract",
  },
  {
    key: ManagementJobKeys.IS_OPENING,
    label: "Is Opening",
  },
  {
    key: ManagementJobKeys.IS_APPROVE,
    label: "Is Approve",
  },
  {
    key: ManagementJobKeys.QUANTITY_OPENING,
    label: "Quantity Opening",
  },
  {
    key: ManagementJobKeys.CREATED_BY,
    label: "Created By",
  },
  {
    key: ManagementJobKeys.MODIFIED_BY,
    label: "Modified By",
  },
  {
    key: ManagementJobKeys.ACTIONS,
    label: "Actions",
  },
];

export const renderCell = (
  job: GetJobResponse,
  columnKey: React.Key,
  handleApproveJob: (id: number) => void,
  handleDeleteJob: (id: number) => void,
) => {
  const cellValue = job[columnKey as keyof GetJobResponse];

  switch (columnKey) {
    case ManagementJobKeys.TITLE:
    case ManagementJobKeys.YEAR_EXP:
    case ManagementJobKeys.TYPE:
    case ManagementJobKeys.CONTRACT:
    case ManagementJobKeys.QUANTITY_OPENING:
      return (
        <p className="max-w-60 overflow-hidden text-ellipsis">
          {cellValue as string}
        </p>
      );

    case ManagementJobKeys.IS_OPENING:
    case ManagementJobKeys.IS_APPROVE:
      return (
        <Chip
          size="sm"
          color={cellValue ? "success" : "default"}
          variant="flat"
        >
          {cellValue ? "Active" : "Inactive"}
        </Chip>
      );

    case ManagementJobKeys.CREATED_BY:
      return (
        <div className="flex flex-col">
          <p className="text-bold text-small capitalize">{cellValue}</p>
        </div>
      );

    case ManagementJobKeys.MODIFIED_BY:
      return (
        <div className="flex flex-col">
          <p className="text-bold text-small capitalize">{cellValue}</p>
        </div>
      );

    case ManagementJobKeys.ACTIONS:
      const { jobPostId, isApprove } = job;

      return (
        <div className="flex items-center justify-center gap-2">
          {!isApprove && (
            <Button
              isIconOnly
              size="sm"
              variant="light"
              onPress={() => handleApproveJob(jobPostId)}
            >
              <Check className="text-slate-400" size={24} />
            </Button>
          )}
          <Button
            isIconOnly
            size="sm"
            variant="light"
            color="danger"
            onPress={() => handleDeleteJob(jobPostId)}
          >
            <X className="text-red-400" size={24} />
          </Button>
        </div>
      );

    default:
      return (
        <p className="overflow-hidden text-ellipsis">{cellValue as string}</p>
      );
  }
};
