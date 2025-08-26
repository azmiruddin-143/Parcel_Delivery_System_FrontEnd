import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  useAllUsersQuery,
  useChangeUserStatusMutation,
} from "@/redux/features/auth/auth.api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";

// Define the User type to match your console data
type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Blocked";
};

// Helper function for badge variant based on status
const getStatusBadgeVariant = (status: "Active" | "Blocked") => {
  return status === "Blocked" ? "destructive" : "secondary";
};

// Define the columns for the table
const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={getStatusBadgeVariant(row.original.status)}>
        {row.original.status}
      </Badge>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [changeUserStatus] = useChangeUserStatusMutation();

      const handleChangeStatus = async (newStatus: "Active" | "Blocked") => {
        try {
          const payload = {
            userId: user._id,
            status: newStatus,
          };
          const result = await changeUserStatus(payload).unwrap();
          toast.success(`User ${user.name} status updated to ${newStatus}`);
          console.log(result);
        } catch (error) {
          console.error(error);
          const errorMessage = error?.data?.message || "Failed to update user status.";
          toast.error(errorMessage);
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => alert(`View details for ${user.name}`)}>
              View Details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {user.status === "Active" ? (
              <DropdownMenuItem
                onClick={() => handleChangeStatus("Blocked")}
              >
                Block User
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                onClick={() => handleChangeStatus("Active")}
              >
                Activate User
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const ManageAllUsers = () => {
  const { data: allUsers, isLoading, isError } = useAllUsersQuery(undefined);
  const [globalFilter, setGlobalFilter] = React.useState("");

  const tableData = React.useMemo(
    () => allUsers?.data || [],
    [allUsers]
  );

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  if (isLoading) {
    return <LoadingSkeleton></LoadingSkeleton>
  }

  if (isError) {
    return (
      <div className="p-4 text-center text-red-500">
        Error loading users. Please try again later.
      </div>
    );
  }

  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle>All Users</CardTitle>
        <CardDescription>Manage all user accounts.</CardDescription>
        <div className="flex items-center py-4 justify-between">
          <Input
            placeholder="Filter by name or email..."
            value={globalFilter ?? ""}
            onChange={(event) =>
              setGlobalFilter(String(event.target.value))
            }
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ManageAllUsers;