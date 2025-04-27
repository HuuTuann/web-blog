import { ManagementBusinessKeys } from "@/constants";
import { formatDate } from "@/lib";
import { ListBusinessResponse } from "@/types";
import { Button } from "@heroui/react";
import { UserPen, UserRoundX } from "lucide-react";

export const allColumnsForTable = [
  {
    key: ManagementBusinessKeys.NAME,
    label: "Name",
  },
  {
    key: ManagementBusinessKeys.SIZE,
    label: "Size",
  },
  {
    key: ManagementBusinessKeys.NATIONALITY,
    label: "Nationality",
  },
  {
    key: ManagementBusinessKeys.SLOGAN,
    label: "Slogan",
  },
  {
    key: ManagementBusinessKeys.CREATED_BY,
    label: "Created",
  },
  {
    key: ManagementBusinessKeys.MODIFIED_BY,
    label: "Modified",
  },
  {
    key: ManagementBusinessKeys.ACTIONS,
    label: "Actions",
  },
];

export const renderCell = (
  managementBusiness: ListBusinessResponse,
  columnKey: React.Key,
  handleUpdateBusiness: (id: number) => void,
  handleDeleteBusiness: (id: number) => void,
) => {
  const cellValue = managementBusiness[columnKey as keyof ListBusinessResponse];

  switch (columnKey) {
    case ManagementBusinessKeys.NAME:
    case ManagementBusinessKeys.SIZE:
    case ManagementBusinessKeys.NATIONALITY:
    case ManagementBusinessKeys.SLOGAN:
      return cellValue;

    case ManagementBusinessKeys.CREATED_BY:
      const createdAt = managementBusiness[ManagementBusinessKeys.CREATED_AT];
      return (
        <div className="flex flex-col">
          <p className="text-bold text-small capitalize">{cellValue}</p>
          <p className="text-bold text-tiny capitalize text-default-400">
            {formatDate(createdAt)}
          </p>
        </div>
      );

    case ManagementBusinessKeys.MODIFIED_BY:
      const modifiedAt = managementBusiness[ManagementBusinessKeys.MODIFIED_AT];
      return (
        <div className="flex flex-col">
          <p className="text-bold text-small capitalize">{cellValue}</p>
          <p className="text-bold text-tiny capitalize text-default-400">
            {formatDate(modifiedAt)}
          </p>
        </div>
      );

    case ManagementBusinessKeys.ACTIONS:
      const id = managementBusiness[ManagementBusinessKeys.ID];

      return (
        <div className="flex items-center justify-center gap-2">
          <Button
            isIconOnly
            size="sm"
            variant="light"
            onPress={() => handleUpdateBusiness(id)}
          >
            <UserPen className="text-slate-400" size={24} />
          </Button>
          <Button
            isIconOnly
            size="sm"
            variant="light"
            color="danger"
            onPress={() => handleDeleteBusiness(id)}
          >
            <UserRoundX className="text-red-400" size={24} />
          </Button>
        </div>
      );

    default:
      return (
        <p className="overflow-hidden text-ellipsis">{cellValue as string}</p>
      );
  }
};
