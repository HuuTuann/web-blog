"use client";

import { ManagementUserKeys } from "@/constants";
import { useGetUsers } from "@/queries";
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

export const ManagementUser = () => {
  const { users, totalPagesUsers, usersParams, setUsersParams } = useGetUsers();

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

  return (
    <Table
      aria-label="Example table with dynamic content"
      bottomContent={
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
            <SelectItem key={"15"}>15</SelectItem>
            <SelectItem key={"20"}>20</SelectItem>
          </Select>
          <Pagination
            aria-label="page-no"
            showControls
            initialPage={usersParams?.pageNo}
            total={totalPagesUsers}
            onChange={handlePageNoChange}
          />
        </div>
      }
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
      <TableBody>
        {users.map((user) => (
          <TableRow key={user[ManagementUserKeys.ID]}>
            {(columnKey) => (
              <TableCell className="overflow-hidden text-ellipsis text-nowrap">
                {renderCell(user, columnKey)}
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
