"use client";

import { ManagementUserKeys } from "@/constants";
import { Toast, useDialog } from "@/hooks";
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
  const {
    users,
    totalPagesUsers,
    usersParams,
    setUsersParams,
    handleInvalidateUsers,
  } = useGetUsers();

  const { onDeleteUser } = useDeleteUser({
    onSuccess: () => {
      hideDialog();
      handleInvalidateUsers();
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
      pageNo,
    }));
  };

  const handleUpdateUser = (id: number) => {
    showDialog({
      title: "Update User",
      content: <UpdateUserForm id={id} />,
      options: {
        hideActions: true,
      },
    });
  };

  const handleDeleteUser = (id: number) => {
    showDialog({
      title: "Delete User",
      content: "Are you sure you want to delete this user?",
      options: {
        onOk: () => {
          onDeleteUser(
            {
              [ManagementUserKeys.ID]: id,
            },
            {
              onSuccess: () => {
                hideDialog();
                handleInvalidateUsers();
                Toast.Success("User deleted successfully");
              },
            },
          );
        },
        onCancel: () => {
          hideDialog();
        },
      },
    });
  };

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
          key={`pagination-${totalPagesUsers}-${usersParams?.pageNo}`}
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
