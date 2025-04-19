import { ManagementUserKeys } from "@/constants";
import { formatDate } from "@/lib";
import { ListUsersResponse } from "@/types";
import { Button, Chip, User } from "@heroui/react";
import { UserPen, UserRoundX } from "lucide-react";

export const allColumnsForTable = [
  {
    key: ManagementUserKeys.FULL_NAME,
    label: "Name",
  },
  {
    key: ManagementUserKeys.IS_ACTIVE,
    label: "Status",
  },
  {
    key: ManagementUserKeys.ROLE,
    label: "Role",
  },
  {
    key: ManagementUserKeys.CREATED_BY,
    label: "Created",
  },
  {
    key: ManagementUserKeys.MODIFIED_BY,
    label: "Modified",
  },
  {
    key: ManagementUserKeys.ACTIONS,
    label: "Actions",
  },
];

export const renderCell = (
  managementUser: ListUsersResponse,
  columnKey: React.Key,
  handleUpdateUser: (id: string) => void,
  handleDeleteUser: (id: string) => void,
) => {
  const cellValue = managementUser[columnKey as keyof ListUsersResponse];

  switch (columnKey) {
    case ManagementUserKeys.FULL_NAME:
      const avatarUrl = managementUser[ManagementUserKeys.AVATAR];
      const user = {
        name: managementUser[ManagementUserKeys.FULL_NAME],
        email: managementUser[ManagementUserKeys.EMAIL],
      };

      return (
        <User
          avatarProps={{ radius: "full", size: "sm", src: avatarUrl }}
          classNames={{
            description: "text-default-500",
          }}
          description={user.email}
          name={cellValue}
        >
          {user.email}
        </User>
      );
    case ManagementUserKeys.IS_ACTIVE:
      return (
        <Chip
          size="sm"
          color={cellValue ? "success" : "default"}
          variant="flat"
        >
          {cellValue ? "Active" : "Inactive"}
        </Chip>
      );
    case ManagementUserKeys.CREATED_BY:
      const createdAt = managementUser[ManagementUserKeys.CREATED_AT];
      return (
        <div className="flex flex-col">
          <p className="text-bold text-small capitalize">{cellValue}</p>
          <p className="text-bold text-tiny capitalize text-default-400">
            {formatDate(createdAt)}
          </p>
        </div>
      );

    case ManagementUserKeys.MODIFIED_BY:
      const modifiedAt = managementUser[ManagementUserKeys.MODIFIED_AT];
      return (
        <div className="flex flex-col">
          <p className="text-bold text-small capitalize">{cellValue}</p>
          <p className="text-bold text-tiny capitalize text-default-400">
            {formatDate(modifiedAt)}
          </p>
        </div>
      );

    case ManagementUserKeys.ACTIONS:
      const id = managementUser[ManagementUserKeys.ID];

      return (
        <div className="flex items-center justify-center gap-2">
          <Button
            isIconOnly
            size="sm"
            variant="light"
            onPress={() => handleUpdateUser(id)}
          >
            <UserPen className="text-slate-400" size={24} />
          </Button>
          <Button
            isIconOnly
            size="sm"
            variant="light"
            color="danger"
            onPress={() => handleDeleteUser(id)}
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
