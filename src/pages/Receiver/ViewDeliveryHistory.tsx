
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
import { useGetDeliveredParcelsQuery, useGetSingleParcelQuery, useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuCheckboxItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, ChevronDown } from "lucide-react";
import { Parcel } from "@/type";
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
// Define the columns for your table
const getStatusBadgeVariant = (status: string) => {
    switch (status) {
        case "Requested":
            return { backgroundColor: "bg-blue-100 dark:bg-blue-900", textColor: "text-blue-700 dark:text-blue-200" };
        case "Approved":
            return { backgroundColor: "bg-green-100 dark:bg-green-900", textColor: "text-green-700 dark:text-green-200" };
        case "Dispatched":
            return { backgroundColor: "bg-yellow-100 dark:bg-yellow-900", textColor: "text-yellow-700 dark:text-yellow-200" };
        case "In Transit":
            return { backgroundColor: "bg-purple-100 dark:bg-purple-900", textColor: "text-purple-700 dark:text-purple-200" };
        case "Picked":
            return { backgroundColor: "bg-teal-100 dark:bg-teal-900", textColor: "text-teal-700 dark:text-teal-200" };
        case "Delivered":
            return { backgroundColor: "bg-gray-200 dark:bg-gray-700", textColor: "text-gray-800 dark:text-gray-300" };
        case "Cancelled":
        case "Returned":
        case "Held":
            return { backgroundColor: "bg-red-100 dark:bg-red-900", textColor: "text-red-700 dark:text-red-200" };
        default:
            return { backgroundColor: "bg-gray-100 dark:bg-gray-800", textColor: "text-gray-500 dark:text-gray-400" };
    }
};

const ViewDeliveryHistory = () => {
    const { data: userInfo, isLoading: userLoading, isError: userError } = useUserInfoQuery(undefined);
    const receiverId = userInfo?.data?._id;

    const { data: deliveredParcels, isLoading: parcelsLoading, isError: parcelsError } = useGetDeliveredParcelsQuery(receiverId, {
        skip: !receiverId,
    });

    const [globalFilter, setGlobalFilter] = React.useState("");

    const [isDetailsDialogOpen, setIsDetailsDialogOpen] = React.useState(false);
    const [selectedParcelId, setSelectedParcelId] = React.useState<string | null>(null);

    const { data: singleParcelData, isLoading: singleParcelLoading } = useGetSingleParcelQuery(selectedParcelId, {
        skip: !selectedParcelId,
    });



    const tableData = React.useMemo(() => deliveredParcels?.data || [], [deliveredParcels]);
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
            cell: ({ row }) => <span>{row.original.sender?.name}</span>,
        },
        {
            accessorKey: "sender.email",
            header: "Sender Email",
            cell: ({ row }) => <span>{row.original.sender?.email}</span>,
        },
        {
            accessorKey: "receiver.name",
            header: "Receiver Name",
            cell: ({ row }) => <span>{row.original.receiver?.name}</span>,
        },
        {
            accessorKey: "receiver.email",
            header: "Receiver Email",
            cell: ({ row }) => <span>{row.original.receiver?.email}</span>,
        },
        {
            accessorKey: "receiver.phone",
            header: "Receiver Phone",
            cell: ({ row }) => <span>{row.original.receiver?.phone}</span>,
        },
        {
            accessorKey: "currentStatus",
            header: "Status",
            cell: ({ row }) => {
                const status = row.getValue("currentStatus") as string;
                const { backgroundColor, textColor } = getStatusBadgeVariant(status);

                return (
                    <Badge className={`${backgroundColor} ${textColor}`}>
                        {status}
                    </Badge>
                );
            },
        },
        // {
        //     accessorKey: "currentStatus",
        //     header: "Status",
        //     cell: ({ row }) => {
        //         const status = row.getValue("currentStatus") as string;
        //         return <Badge variant="secondary">{status}</Badge>;
        //     },
        // },
        {
            accessorKey: "weight",
            header: "Weight (kg)",
        },
        {
            accessorKey: "deliveryAddress",
            header: "Delivery Address",
        },
        {
            accessorKey: "updatedAt",
            header: "Delivery Date",
            cell: ({ row }) => {
                const date = new Date(row.getValue("updatedAt"));
                return <span>{format(date, 'PPP')}</span>;
            },
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
                            <DropdownMenuItem onClick={() => {
                                setSelectedParcelId(parcel._id);
                                setIsDetailsDialogOpen(true);
                            }}>
                                View Details
                            </DropdownMenuItem>
                            {/* <DropdownMenuItem onClick={() => toast.info(`Downloading invoice for ${parcel.trackingId}`)}>
                            Download Invoice
                        </DropdownMenuItem> */}
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

    if (userLoading || parcelsLoading) {
        return <LoadingSkeleton></LoadingSkeleton>
    }

    if (userError || parcelsError) {
        return <div className="p-4 text-center text-red-500">Error loading delivery history. Please try again.</div>;
    }


    const singleParcel = singleParcelData?.data;
    const singleParcelStatusColors = singleParcel ? getStatusBadgeVariant(singleParcel.currentStatus) : { backgroundColor: "", textColor: "" };
    return (
        <Card className="p-4">
            <CardHeader>
                <CardTitle>Delivery History</CardTitle>
                <CardDescription>View a list of all successfully delivered parcels.</CardDescription>
                <div className="flex items-center py-4 justify-between">
                    <Input
                        placeholder="Filter by tracking ID or name..."
                        value={globalFilter ?? ""}
                        onChange={(event) => setGlobalFilter(String(event.target.value))}
                        className="max-w-sm"
                    />
                    {/* Columns Dropdown Menu */}
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
                                        No delivered parcels found.
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

            {/* <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Parcel Details</DialogTitle>
                        <DialogDescription>
                            All details for the selected parcel.
                        </DialogDescription>
                    </DialogHeader>
                    {singleParcelLoading ? (
                        <LoadingSkeleton></LoadingSkeleton>
                    ) : singleParcel ? (
                        <div className="space-y-4">
                            <p><strong>Tracking ID:</strong> {singleParcel.trackingId}</p>
                            <p><strong>Status:</strong> <Badge variant={(singleParcel.currentStatus)}>{singleParcel.currentStatus}</Badge></p>
                            <p><strong>Parcel Type:</strong> {singleParcel.parcelType}</p>
                            <p><strong>Weight:</strong> {singleParcel.weight} kg</p>
                            <p><strong>Delivery Address:</strong> {singleParcel.deliveryAddress}</p>
                            <DropdownMenuSeparator />
                            <h4 className="font-semibold">Sender Details</h4>
                            <p><strong>Name:</strong> {singleParcel.sender.name}</p>
                            <p><strong>Email:</strong> {singleParcel.sender.email}</p>
                            <DropdownMenuSeparator />
                            <h4 className="font-semibold">Receiver Details</h4>
                            <p><strong>Name:</strong> {singleParcel.receiver.name}</p>
                            <p><strong>Email:</strong> {singleParcel.receiver.email}</p>
                            <p><strong>Phone:</strong> {singleParcel.receiver.phone}</p>
                            <p><strong>Address:</strong> {singleParcel.receiver.address}</p>
                        </div>
                    ) : (
                        <div>Parcel details could not be loaded.</div>
                    )}
                </DialogContent>
            </Dialog> */}


            <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Parcel Details</DialogTitle>
                        <DialogDescription>
                            All details for the selected parcel.
                        </DialogDescription>
                    </DialogHeader>
                    {singleParcelLoading ? (
                        <LoadingSkeleton></LoadingSkeleton>
                    ) : singleParcel ? (
                        <div className="space-y-4">
                            <p><strong>Tracking ID:</strong> {singleParcel.trackingId}</p>
                            {/* এখানে className দিয়ে ডাইনামিক কালার যোগ করা হয়েছে */}
                            <p>
                                <strong>Status:</strong>
                                <Badge className={`${singleParcelStatusColors.backgroundColor} ${singleParcelStatusColors.textColor}`}>
                                    {singleParcel.currentStatus}
                                </Badge>
                            </p>
                            <p><strong>Parcel Type:</strong> {singleParcel.parcelType}</p>
                            <p><strong>Weight:</strong> {singleParcel.weight} kg</p>
                            <p><strong>Delivery Address:</strong> {singleParcel.deliveryAddress}</p>
                            <DropdownMenuSeparator />
                            <h4 className="font-semibold">Sender Details</h4>
                            <p><strong>Name:</strong> {singleParcel.sender?.name}</p>
                            <p><strong>Email:</strong> {singleParcel.sender?.email}</p>
                            <DropdownMenuSeparator />
                            <h4 className="font-semibold">Receiver Details</h4>
                            <p><strong>Name:</strong> {singleParcel.receiver?.name}</p>
                            <p><strong>Email:</strong> {singleParcel.receiver?.email}</p>
                            <p><strong>Phone:</strong> {singleParcel.receiver?.phone}</p>
                            <p><strong>Address:</strong> {singleParcel.receiver?.address}</p>
                        </div>
                    ) : (
                        <div>Parcel details could not be loaded.</div>
                    )}
                </DialogContent>
            </Dialog>
        </Card>
    );
};

export default ViewDeliveryHistory;



