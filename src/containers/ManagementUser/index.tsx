"use client";

import { ManagementUserKeys } from "@/constants";
import { useDialog } from "@/hooks";
import { useDeleteUser, useGetUsers } from "@/queries";
import {
  Pagination,
  Select,
  SelectItem,
  SharedSelection,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { allColumnsForTable, renderCell } from "./allColumns";
import { UpdateUserForm } from "./UpdateUserForm";

export const ManagementUser = () => {
  const { showDialog, hideDialog } = useDialog();
  const { users, totalPagesUsers, usersParams, setUsersParams } = useGetUsers();

  const { onDeleteUser } = useDeleteUser({
    onSuccess: () => {
      hideDialog();
    },
  });

  const handlePageSizeChange = (keys: SharedSelection) => {
    const pageSize = Number(Array.from(keys)[0]);
    setUsersParams((prev) => ({
      ...prev,
      pageSize,
    }));
  };

  const handlePageNoChange = (pageNo: number) => {
    setUsersParams((prev) => ({
      ...prev,
      pageNo: pageNo - 1,
    }));
  };

  const handleUpdateUser = (id: string) => {
    showDialog({
      title: "Update User",
      content: <UpdateUserForm id={id} />,
      options: {
        hideActions: true,
      },
    });
  };

  const handleDeleteUser = (id: string) => {
    showDialog({
      title: "Delete User",
      content: "Are you sure you want to delete this user?",
      options: {
        onOk: () => {
          onDeleteUser({
            user_id: id,
          });
        },
        onCancel: () => {
          hideDialog();
        },
      },
    });
  };

  // const mockData: ListUsersResponse[] = [
  //   {
  //     [ManagementUserKeys.ID]: "user-001",
  //     [ManagementUserKeys.FULL_NAME]: "Nguyễn Văn A",
  //     [ManagementUserKeys.EMAIL]: "nguyenvana@example.com",
  //     [ManagementUserKeys.IS_ACTIVE]: true,
  //     [ManagementUserKeys.CREATED_AT]: "2023-01-15T08:30:00Z",
  //     [ManagementUserKeys.MODIFIED_AT]: "2023-06-20T14:25:00Z",
  //     [ManagementUserKeys.CREATED_BY]: "admin-001",
  //     [ManagementUserKeys.MODIFIED_BY]: "admin-002",
  //     [ManagementUserKeys.ROLE]: "Manager",
  //     [ManagementUserKeys.AVATAR]: "https://example.com/avatars/user-001.jpg",
  //   },
  //   {
  //     [ManagementUserKeys.ID]: "user-002",
  //     [ManagementUserKeys.FULL_NAME]: "Trần Thị B",
  //     [ManagementUserKeys.EMAIL]: "tranthib@example.com",
  //     [ManagementUserKeys.IS_ACTIVE]: false,
  //     [ManagementUserKeys.CREATED_AT]: "2023-02-10T10:15:00Z",
  //     [ManagementUserKeys.MODIFIED_AT]: "2023-05-05T09:40:00Z",
  //     [ManagementUserKeys.CREATED_BY]: "admin-001",
  //     [ManagementUserKeys.MODIFIED_BY]: "admin-001",
  //     [ManagementUserKeys.ROLE]: "Staff",
  //     [ManagementUserKeys.AVATAR]: "https://example.com/avatars/user-002.jpg",
  //   },
  //   {
  //     [ManagementUserKeys.ID]: "user-003",
  //     [ManagementUserKeys.FULL_NAME]: "Lê Văn C",
  //     [ManagementUserKeys.EMAIL]: "levanc@example.com",
  //     [ManagementUserKeys.IS_ACTIVE]: true,
  //     [ManagementUserKeys.CREATED_AT]: "2023-03-25T13:50:00Z",
  //     [ManagementUserKeys.MODIFIED_AT]: "2023-07-12T16:30:00Z",
  //     [ManagementUserKeys.CREATED_BY]: "admin-003",
  //     [ManagementUserKeys.MODIFIED_BY]: "admin-003",
  //     [ManagementUserKeys.ROLE]: "Admin",
  //     [ManagementUserKeys.AVATAR]: "https://example.com/avatars/user-003.jpg",
  //   },
  //   {
  //     [ManagementUserKeys.ID]: "user-004",
  //     [ManagementUserKeys.FULL_NAME]: "Lê Văn C",
  //     [ManagementUserKeys.EMAIL]: "levanc@example.com",
  //     [ManagementUserKeys.IS_ACTIVE]: true,
  //     [ManagementUserKeys.CREATED_AT]: "2023-03-25T13:50:00Z",
  //     [ManagementUserKeys.MODIFIED_AT]: "2023-07-12T16:30:00Z",
  //     [ManagementUserKeys.CREATED_BY]: "admin-003",
  //     [ManagementUserKeys.MODIFIED_BY]: "admin-003",
  //     [ManagementUserKeys.ROLE]: "Admin",
  //     [ManagementUserKeys.AVATAR]: "https://example.com/avatars/user-003.jpg",
  //   },
  //   {
  //     [ManagementUserKeys.ID]: "user-005",
  //     [ManagementUserKeys.FULL_NAME]: "Lê Văn C",
  //     [ManagementUserKeys.EMAIL]: "levanc@example.com",
  //     [ManagementUserKeys.IS_ACTIVE]: true,
  //     [ManagementUserKeys.CREATED_AT]: "2023-03-25T13:50:00Z",
  //     [ManagementUserKeys.MODIFIED_AT]: "2023-07-12T16:30:00Z",
  //     [ManagementUserKeys.CREATED_BY]: "admin-003",
  //     [ManagementUserKeys.MODIFIED_BY]: "admin-003",
  //     [ManagementUserKeys.ROLE]: "Admin",
  //     [ManagementUserKeys.AVATAR]: "https://example.com/avatars/user-003.jpg",
  //   },
  //   {
  //     [ManagementUserKeys.ID]: "user-006",
  //     [ManagementUserKeys.FULL_NAME]: "Nguyễn Văn A",
  //     [ManagementUserKeys.EMAIL]: "nguyenvana@example.com",
  //     [ManagementUserKeys.IS_ACTIVE]: true,
  //     [ManagementUserKeys.CREATED_AT]: "2023-01-15T08:30:00Z",
  //     [ManagementUserKeys.MODIFIED_AT]: "2023-06-20T14:25:00Z",
  //     [ManagementUserKeys.CREATED_BY]: "admin-001",
  //     [ManagementUserKeys.MODIFIED_BY]: "admin-002",
  //     [ManagementUserKeys.ROLE]: "Manager",
  //     [ManagementUserKeys.AVATAR]: "https://example.com/avatars/user-001.jpg",
  //   },
  //   {
  //     [ManagementUserKeys.ID]: "user-007",
  //     [ManagementUserKeys.FULL_NAME]: "Trần Thị B",
  //     [ManagementUserKeys.EMAIL]: "tranthib@example.com",
  //     [ManagementUserKeys.IS_ACTIVE]: false,
  //     [ManagementUserKeys.CREATED_AT]: "2023-02-10T10:15:00Z",
  //     [ManagementUserKeys.MODIFIED_AT]: "2023-05-05T09:40:00Z",
  //     [ManagementUserKeys.CREATED_BY]: "admin-001",
  //     [ManagementUserKeys.MODIFIED_BY]: "admin-001",
  //     [ManagementUserKeys.ROLE]: "Staff",
  //     [ManagementUserKeys.AVATAR]: "https://example.com/avatars/user-002.jpg",
  //   },
  //   {
  //     [ManagementUserKeys.ID]: "user-008",
  //     [ManagementUserKeys.FULL_NAME]: "Lê Văn C",
  //     [ManagementUserKeys.EMAIL]: "levanc@example.com",
  //     [ManagementUserKeys.IS_ACTIVE]: true,
  //     [ManagementUserKeys.CREATED_AT]: "2023-03-25T13:50:00Z",
  //     [ManagementUserKeys.MODIFIED_AT]: "2023-07-12T16:30:00Z",
  //     [ManagementUserKeys.CREATED_BY]: "admin-003",
  //     [ManagementUserKeys.MODIFIED_BY]: "admin-003",
  //     [ManagementUserKeys.ROLE]: "Admin",
  //     [ManagementUserKeys.AVATAR]: "https://example.com/avatars/user-003.jpg",
  //   },
  //   {
  //     [ManagementUserKeys.ID]: "user-009",
  //     [ManagementUserKeys.FULL_NAME]: "Lê Văn C",
  //     [ManagementUserKeys.EMAIL]: "levanc@example.com",
  //     [ManagementUserKeys.IS_ACTIVE]: true,
  //     [ManagementUserKeys.CREATED_AT]: "2023-03-25T13:50:00Z",
  //     [ManagementUserKeys.MODIFIED_AT]: "2023-07-12T16:30:00Z",
  //     [ManagementUserKeys.CREATED_BY]: "admin-003",
  //     [ManagementUserKeys.MODIFIED_BY]: "admin-003",
  //     [ManagementUserKeys.ROLE]: "Admin",
  //     [ManagementUserKeys.AVATAR]: "https://example.com/avatars/user-003.jpg",
  //   },
  //   {
  //     [ManagementUserKeys.ID]: "user-010",
  //     [ManagementUserKeys.FULL_NAME]: "Lê Văn C",
  //     [ManagementUserKeys.EMAIL]: "levanc@example.com",
  //     [ManagementUserKeys.IS_ACTIVE]: true,
  //     [ManagementUserKeys.CREATED_AT]: "2023-03-25T13:50:00Z",
  //     [ManagementUserKeys.MODIFIED_AT]: "2023-07-12T16:30:00Z",
  //     [ManagementUserKeys.CREATED_BY]: "admin-003",
  //     [ManagementUserKeys.MODIFIED_BY]: "admin-003",
  //     [ManagementUserKeys.ROLE]: "Admin",
  //     [ManagementUserKeys.AVATAR]: "https://example.com/avatars/user-003.jpg",
  //   },
  //   {
  //     [ManagementUserKeys.ID]: "user-011",
  //     [ManagementUserKeys.FULL_NAME]: "Lê Văn C",
  //     [ManagementUserKeys.EMAIL]: "levanc@example.com",
  //     [ManagementUserKeys.IS_ACTIVE]: true,
  //     [ManagementUserKeys.CREATED_AT]: "2023-03-25T13:50:00Z",
  //     [ManagementUserKeys.MODIFIED_AT]: "2023-07-12T16:30:00Z",
  //     [ManagementUserKeys.CREATED_BY]: "admin-003",
  //     [ManagementUserKeys.MODIFIED_BY]: "admin-003",
  //     [ManagementUserKeys.ROLE]: "Admin",
  //     [ManagementUserKeys.AVATAR]: "https://example.com/avatars/user-003.jpg",
  //   },
  //   {
  //     [ManagementUserKeys.ID]: "user-012",
  //     [ManagementUserKeys.FULL_NAME]: "Lê Văn C",
  //     [ManagementUserKeys.EMAIL]: "levanc@example.com",
  //     [ManagementUserKeys.IS_ACTIVE]: true,
  //     [ManagementUserKeys.CREATED_AT]: "2023-03-25T13:50:00Z",
  //     [ManagementUserKeys.MODIFIED_AT]: "2023-07-12T16:30:00Z",
  //     [ManagementUserKeys.CREATED_BY]: "admin-003",
  //     [ManagementUserKeys.MODIFIED_BY]: "admin-003",
  //     [ManagementUserKeys.ROLE]: "Admin",
  //     [ManagementUserKeys.AVATAR]: "https://example.com/avatars/user-003.jpg",
  //   },
  //   {
  //     [ManagementUserKeys.ID]: "user-013",
  //     [ManagementUserKeys.FULL_NAME]: "Lê Văn C",
  //     [ManagementUserKeys.EMAIL]: "levanc@example.com",
  //     [ManagementUserKeys.IS_ACTIVE]: true,
  //     [ManagementUserKeys.CREATED_AT]: "2023-03-25T13:50:00Z",
  //     [ManagementUserKeys.MODIFIED_AT]: "2023-07-12T16:30:00Z",
  //     [ManagementUserKeys.CREATED_BY]: "admin-003",
  //     [ManagementUserKeys.MODIFIED_BY]: "admin-003",
  //     [ManagementUserKeys.ROLE]: "Admin",
  //     [ManagementUserKeys.AVATAR]: "https://example.com/avatars/user-003.jpg",
  //   },
  //   {
  //     [ManagementUserKeys.ID]: "user-014",
  //     [ManagementUserKeys.FULL_NAME]: "Nguyễn Văn A",
  //     [ManagementUserKeys.EMAIL]: "nguyenvana@example.com",
  //     [ManagementUserKeys.IS_ACTIVE]: true,
  //     [ManagementUserKeys.CREATED_AT]: "2023-01-15T08:30:00Z",
  //     [ManagementUserKeys.MODIFIED_AT]: "2023-06-20T14:25:00Z",
  //     [ManagementUserKeys.CREATED_BY]: "admin-001",
  //     [ManagementUserKeys.MODIFIED_BY]: "admin-002",
  //     [ManagementUserKeys.ROLE]: "Manager",
  //     [ManagementUserKeys.AVATAR]: "https://example.com/avatars/user-001.jpg",
  //   },
  //   // {
  //   //   [ManagementUserKeys.ID]: "user-015",
  //   //   [ManagementUserKeys.FULL_NAME]: "Trần Thị B",
  //   //   [ManagementUserKeys.EMAIL]: "tranthib@example.com",
  //   //   [ManagementUserKeys.IS_ACTIVE]: false,
  //   //   [ManagementUserKeys.CREATED_AT]: "2023-02-10T10:15:00Z",
  //   //   [ManagementUserKeys.MODIFIED_AT]: "2023-05-05T09:40:00Z",
  //   //   [ManagementUserKeys.CREATED_BY]: "admin-001",
  //   //   [ManagementUserKeys.MODIFIED_BY]: "admin-001",
  //   //   [ManagementUserKeys.ROLE]: "Staff",
  //   //   [ManagementUserKeys.AVATAR]: "https://example.com/avatars/user-002.jpg",
  //   // },
  //   // {
  //   //   [ManagementUserKeys.ID]: "user-016",
  //   //   [ManagementUserKeys.FULL_NAME]: "Lê Văn C",
  //   //   [ManagementUserKeys.EMAIL]: "levanc@example.com",
  //   //   [ManagementUserKeys.IS_ACTIVE]: true,
  //   //   [ManagementUserKeys.CREATED_AT]: "2023-03-25T13:50:00Z",
  //   //   [ManagementUserKeys.MODIFIED_AT]: "2023-07-12T16:30:00Z",
  //   //   [ManagementUserKeys.CREATED_BY]: "admin-003",
  //   //   [ManagementUserKeys.MODIFIED_BY]: "admin-003",
  //   //   [ManagementUserKeys.ROLE]: "Admin",
  //   //   [ManagementUserKeys.AVATAR]: "https://example.com/avatars/user-003.jpg",
  //   // },
  //   // {
  //   //   [ManagementUserKeys.ID]: "user-017",
  //   //   [ManagementUserKeys.FULL_NAME]: "Lê Văn C",
  //   //   [ManagementUserKeys.EMAIL]: "levanc@example.com",
  //   //   [ManagementUserKeys.IS_ACTIVE]: true,
  //   //   [ManagementUserKeys.CREATED_AT]: "2023-03-25T13:50:00Z",
  //   //   [ManagementUserKeys.MODIFIED_AT]: "2023-07-12T16:30:00Z",
  //   //   [ManagementUserKeys.CREATED_BY]: "admin-003",
  //   //   [ManagementUserKeys.MODIFIED_BY]: "admin-003",
  //   //   [ManagementUserKeys.ROLE]: "Admin",
  //   //   [ManagementUserKeys.AVATAR]: "https://example.com/avatars/user-003.jpg",
  //   // },
  //   // {
  //   //   [ManagementUserKeys.ID]: "user-018",
  //   //   [ManagementUserKeys.FULL_NAME]: "Lê Văn C",
  //   //   [ManagementUserKeys.EMAIL]: "levanc@example.com",
  //   //   [ManagementUserKeys.IS_ACTIVE]: true,
  //   //   [ManagementUserKeys.CREATED_AT]: "2023-03-25T13:50:00Z",
  //   //   [ManagementUserKeys.MODIFIED_AT]: "2023-07-12T16:30:00Z",
  //   //   [ManagementUserKeys.CREATED_BY]: "admin-003",
  //   //   [ManagementUserKeys.MODIFIED_BY]: "admin-003",
  //   //   [ManagementUserKeys.ROLE]: "Admin",
  //   //   [ManagementUserKeys.AVATAR]: "https://example.com/avatars/user-003.jpg",
  //   // },
  // ];

  return (
    <div className="flex h-full w-full flex-col gap-4">
      <Table
        aria-label="Example table with dynamic content"
        isHeaderSticky
        isVirtualized
        classNames={{
          base: "h-[calc(100%-56px)]",
          wrapper: "!h-full",
        }}
      >
        <TableHeader columns={allColumnsForTable}>
          {(column) => (
            <TableColumn
              key={column.key}
              align={
                column.key === ManagementUserKeys.ACTIONS ? "center" : "start"
              }
              width={column.key === ManagementUserKeys.ACTIONS ? 80 : undefined}
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent="No users found">
          {users.map((user) => (
            <TableRow key={user[ManagementUserKeys.ID]}>
              {(columnKey) => (
                <TableCell className="overflow-hidden text-ellipsis text-nowrap">
                  {renderCell(
                    user,
                    columnKey,
                    handleUpdateUser,
                    handleDeleteUser,
                  )}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex w-full justify-center gap-2">
        <Select
          aria-label="page-size"
          variant="bordered"
          className="w-24"
          disallowEmptySelection
          defaultSelectedKeys={[usersParams?.pageSize?.toString() ?? "10"]}
          onSelectionChange={handlePageSizeChange}
        >
          <SelectItem key={"10"}>10</SelectItem>
          <SelectItem key={"20"}>20</SelectItem>
          <SelectItem key={"15"}>15</SelectItem>
        </Select>
        <Pagination
          aria-label="page-no"
          showControls
          initialPage={usersParams?.pageNo}
          total={totalPagesUsers}
          onChange={handlePageNoChange}
        />
      </div>
    </div>
  );
};
