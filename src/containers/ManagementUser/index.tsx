"use client";

import { ManagementUserKeys } from "@/constants";
import { ManagementUserResponse } from "@/types";
import {
  Pagination,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { allColumnsForTable, renderCell } from "./allColumns";

export const ManagementUser = () => {
  const mockData: ManagementUserResponse[] = [
    {
      [ManagementUserKeys.ID]: "user-001",
      [ManagementUserKeys.FULL_NAME]: "Nguyễn Văn A",
      [ManagementUserKeys.EMAIL]: "nguyenvana@example.com",
      [ManagementUserKeys.IS_ACTIVE]: true,
      [ManagementUserKeys.CREATED_AT]: "2023-01-15T08:30:00Z",
      [ManagementUserKeys.MODIFIED_AT]: "2023-06-20T14:25:00Z",
      [ManagementUserKeys.CREATED_BY]: "admin-001",
      [ManagementUserKeys.MODIFIED_BY]: "admin-002",
      [ManagementUserKeys.ROLE]: "Manager",
      [ManagementUserKeys.AVATAR]: "https://example.com/avatars/user-001.jpg",
    },
    {
      [ManagementUserKeys.ID]: "user-002",
      [ManagementUserKeys.FULL_NAME]: "Trần Thị B",
      [ManagementUserKeys.EMAIL]: "tranthib@example.com",
      [ManagementUserKeys.IS_ACTIVE]: false,
      [ManagementUserKeys.CREATED_AT]: "2023-02-10T10:15:00Z",
      [ManagementUserKeys.MODIFIED_AT]: "2023-05-05T09:40:00Z",
      [ManagementUserKeys.CREATED_BY]: "admin-001",
      [ManagementUserKeys.MODIFIED_BY]: "admin-001",
      [ManagementUserKeys.ROLE]: "Staff",
      [ManagementUserKeys.AVATAR]: "https://example.com/avatars/user-002.jpg",
    },
    {
      [ManagementUserKeys.ID]: "user-003",
      [ManagementUserKeys.FULL_NAME]: "Lê Văn C",
      [ManagementUserKeys.EMAIL]: "levanc@example.com",
      [ManagementUserKeys.IS_ACTIVE]: true,
      [ManagementUserKeys.CREATED_AT]: "2023-03-25T13:50:00Z",
      [ManagementUserKeys.MODIFIED_AT]: "2023-07-12T16:30:00Z",
      [ManagementUserKeys.CREATED_BY]: "admin-003",
      [ManagementUserKeys.MODIFIED_BY]: "admin-003",
      [ManagementUserKeys.ROLE]: "Admin",
      [ManagementUserKeys.AVATAR]: "https://example.com/avatars/user-003.jpg",
    },
    {
      [ManagementUserKeys.ID]: "user-004",
      [ManagementUserKeys.FULL_NAME]: "Lê Văn C",
      [ManagementUserKeys.EMAIL]: "levanc@example.com",
      [ManagementUserKeys.IS_ACTIVE]: true,
      [ManagementUserKeys.CREATED_AT]: "2023-03-25T13:50:00Z",
      [ManagementUserKeys.MODIFIED_AT]: "2023-07-12T16:30:00Z",
      [ManagementUserKeys.CREATED_BY]: "admin-003",
      [ManagementUserKeys.MODIFIED_BY]: "admin-003",
      [ManagementUserKeys.ROLE]: "Admin",
      [ManagementUserKeys.AVATAR]: "https://example.com/avatars/user-003.jpg",
    },
    {
      [ManagementUserKeys.ID]: "user-005",
      [ManagementUserKeys.FULL_NAME]: "Lê Văn C",
      [ManagementUserKeys.EMAIL]: "levanc@example.com",
      [ManagementUserKeys.IS_ACTIVE]: true,
      [ManagementUserKeys.CREATED_AT]: "2023-03-25T13:50:00Z",
      [ManagementUserKeys.MODIFIED_AT]: "2023-07-12T16:30:00Z",
      [ManagementUserKeys.CREATED_BY]: "admin-003",
      [ManagementUserKeys.MODIFIED_BY]: "admin-003",
      [ManagementUserKeys.ROLE]: "Admin",
      [ManagementUserKeys.AVATAR]: "https://example.com/avatars/user-003.jpg",
    },
  ];

  return (
    <Table
      aria-label="Example table with dynamic content"
      bottomContent={
        <div className="flex w-full justify-center gap-2">
          <Select
            aria-label="page-size"
            defaultSelectedKeys={"5"}
            variant="bordered"
            className="w-24"
          >
            <SelectItem key="5">5</SelectItem>
            <SelectItem key="10">10</SelectItem>
            <SelectItem key="15">15</SelectItem>
          </Select>
          <Pagination
            aria-label="page-no"
            showControls
            initialPage={1}
            total={10}
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
        {mockData.map((row) => (
          <TableRow key={row[ManagementUserKeys.ID]}>
            {(columnKey) => (
              <TableCell className="overflow-hidden text-ellipsis text-nowrap">
                {renderCell(row, columnKey)}
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
