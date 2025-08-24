
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
import {   useConfirmParcelMutation, useGetIncomingParcelsQuery } from "@/redux/features/auth/auth.api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, ChevronDown, Edit, Trash } from "lucide-react";

import { Parcel } from "@/type";
import toast from "react-hot-toast";

// This type definition must be consistent across all files
// type Parcel = { ... }

const getStatusBadgeVariant = (status: string) => {
    switch (status) {
        case "Requested":
            return "default";
        case "Delivered":
            return "secondary";
        case "Cancelled":
        case "Returned":
        case "Held":
            return "destructive";
        case "Approved":
        case "Dispatched":
        case "In Transit":
        case "Picked":
            return "default";
        default:
            return "outline";
    }
};

const ViewIncomingParcels = () => {
    // Hooks must be called inside the component
    const { data: allParcels, isLoading, isError } = useGetIncomingParcelsQuery(undefined);
        const [cancelParcel] = useConfirmParcelMutation();
    const [globalFilter, setGlobalFilter] = React.useState("");
      // --- New handler functions ---
    const handleCancel = async (parcelId: string) => {
        try {
            await cancelParcel(parcelId).unwrap();
            toast.success(`Parcel has been cancelled.`);
        } catch (error) {
            const errorMessage = error?.data?.message || "Failed to cancel parcel. It might have already been processed.";
            toast.error(errorMessage);
        }
    };

    const handleEdit = (parcelId: string) => {
        alert(`Edit parcel with ID: ${parcelId}`);
    };

    const handleDelete = (parcelId: string) => {
        alert(`Delete parcel with ID: ${parcelId}`);
    };





    const tableData = React.useMemo(() => allParcels?.data?.data || [], [allParcels]);

    // Define columns inside the component to access state and handlers
    const columns: ColumnDef<Parcel>[] = [
        {
            accessorKey: "trackingId",
            header: "Tracking ID",
        },
        {
            accessorKey: "parcelType",
            header: "Parcel Type",
        },
        {
            accessorKey: "sender.name",
            header: "Sender Name",
            cell: ({ row }) => <span>{row.original.sender.name}</span>,
        },
        {
            accessorKey: "sender.email",
            header: "Sender Email",
            cell: ({ row }) => <span>{row.original.sender.email}</span>,
        },
        {
            accessorKey: "receiver.name",
            header: "Receiver Name",
            cell: ({ row }) => <span>{row.original.receiver.name}</span>,
        },
        {
            accessorKey: "receiver.email",
            header: "Receiver Email",
            cell: ({ row }) => <span>{row.original.receiver.email}</span>,
        },
        {
            accessorKey: "receiver.phone",
            header: "Receiver Phone",
            cell: ({ row }) => <span>{row.original.receiver.phone}</span>,
        },
        {
            accessorKey: "currentStatus",
            header: "Status",
            cell: ({ row }) => {
                const status = row.getValue("currentStatus") as string;
                return <Badge variant={getStatusBadgeVariant(status)}>{status}</Badge>;
            },
        },
        {
            accessorKey: "weight",
            header: "Weight (kg)",
        },
        {
            accessorKey: "deliveryAddress",
            header: "Delivery Address",
        },
        {
            accessorKey: "isBlocked",
            header: "Block Status",
            cell: ({ row }) => (
                <Badge variant={row.original.isBlocked ? "destructive" : "secondary"}>
                    {row.original.isBlocked ? "Blocked" : "Active"}
                </Badge>
            ),
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const parcel = row.original;
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
                            
                            {/* Only show 'Cancel Parcel' for 'Requested' or 'Approved' status */}
                            {/* {(parcel.currentStatus === 'Requested' || parcel.currentStatus === 'Approved') && (
                                <DropdownMenuItem onClick={() => handleCancel(parcel._id)}>
                                    Cancel Parcel
                                </DropdownMenuItem>
                            )} */}

                             <DropdownMenuItem onClick={() => handleCancel(parcel._id)}>
                                    Cancel Parcel
                                </DropdownMenuItem>
                            
                            <DropdownMenuSeparator />
                            
                            {/* Other action buttons */}
                            <DropdownMenuItem onClick={() => handleEdit(parcel._id)}>
                                <Edit className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(parcel._id)}>
                                <Trash className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

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
        return <div className="p-4 text-center">Loading parcels...</div>;
    }

    if (isError) {
        return <div className="p-4 text-center text-red-500">Error loading parcels. Please try again later.</div>;
    }

    return (
        <Card className="p-4">
            <CardHeader>
                <CardTitle>All Parcels</CardTitle>
                <CardDescription>Manage all incoming and outgoing parcels.</CardDescription>
                <div className="flex items-center py-4 justify-between">
                    <Input
                        placeholder="Filter by name or tracking ID..."
                        value={globalFilter ?? ""}
                        onChange={(event) => setGlobalFilter(String(event.target.value))}
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
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
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
            {/* The Dialog is now a top-level element, rendering conditionally */}
            
        </Card>
    );
};

export default ViewIncomingParcels;

