import { Button } from "@/components";
import { ManagementJobKeys } from "@/constants";
import { GetJobResponse } from "@/types";

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
  handleUpdateJob: (id: number) => void,
  handleDeleteJob: (id: number) => void,
) => {
  const cellValue = job[columnKey as keyof GetJobResponse];

  switch (columnKey) {
    case ManagementJobKeys.TITLE:
    case ManagementJobKeys.YEAR_EXP:
    case ManagementJobKeys.TYPE:
    case ManagementJobKeys.CONTRACT:
    case ManagementJobKeys.IS_OPENING:
    case ManagementJobKeys.IS_APPROVE:
    case ManagementJobKeys.QUANTITY_OPENING:
      return cellValue;

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
      return (
        <div className="flex gap-2">
          <Button
            variant="ioBordered"
            onPress={() => handleUpdateJob(job[ManagementJobKeys.ID])}
          >
            Edit
          </Button>
          <Button
            variant="ioBordered"
            onPress={() => handleDeleteJob(job[ManagementJobKeys.ID])}
          >
            Delete
          </Button>
        </div>
      );

    default:
      return (
        <p className="overflow-hidden text-ellipsis">{cellValue as string}</p>
      );
  }
};
