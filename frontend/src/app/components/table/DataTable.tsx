import { useState } from 'react';

import { Button } from 'components/ui/Button';
import { Input } from 'components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'components/ui/table';

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import clsx from 'clsx';
import { XCircleIcon, XSquareIcon } from 'lucide-react';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    filterPlaceholder?: string;
    showFilterInput?: boolean;
    columnFiltering?: string | undefined;
    setFilteringValue?: string;
    filterComponent?: React.ReactNode;
}

type MovieStatus = "true" | "false" | ""

export function DataTable<TData, TValue>(props: DataTableProps<TData, TValue>) {
    const { columns, data, filterPlaceholder, columnFiltering, showFilterInput } = props;

    const [sorting, setSorting] = useState<SortingState>([]);
    const [globalFiltering, setGlobalFiltering] = useState<string>(
        props.setFilteringValue ? props.setFilteringValue : ''
    );
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [isActive, setIsActive] = useState<MovieStatus>("");

    const table = useReactTable({
        data,
        columns,

        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),

        // sorting
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),

        // filter global and column
        onGlobalFilterChange: setGlobalFiltering,
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),

        enableSortingRemoval: false,
        sortDescFirst: true,
        state: {
            sorting,
            columnFilters,
            globalFilter: globalFiltering,
        },
    });

    const totalPages = table.getPageOptions().length;
    const currentPageIndex = table.getState().pagination.pageIndex;

    const displayPageRange = 2;

    const startPage = Math.max(0, currentPageIndex - displayPageRange);
    const endPage = Math.min(totalPages - 1, currentPageIndex + displayPageRange);
    const paginationList = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    const onFilterChange = (id: any, value: any) =>
        setColumnFilters((prev) => {
            return prev
                .filter((f) => f.id !== id)
                .concat({
                    id,
                    value,
                });
        });

    const handleFilterStatus = (status: MovieStatus) => {
        onFilterChange('isWatched', `${status}`);
        setIsActive(status);
    };

    const tabClassName = (active: boolean) => {
        return clsx(
            'flex items-center justify-center py-[6px] px-6 rounded text-xs font-medium cursor-pointer',
            active ? 'bg-slate-800' : ''
        );
    };

    return (
        <div>
            <div className="flex items-center gap-4 mb-3">
                {showFilterInput && columnFiltering && (
                    <div className="flex items-center py-4">
                        <Input
                            placeholder={filterPlaceholder}
                            value={(table.getColumn(columnFiltering)?.getFilterValue() as string) ?? ''}
                            onChange={(e) => {
                                handleFilterStatus("");
                                onFilterChange('title', e.target.value);
                            }}
                            className="max-w-sm"
                        />
                    </div>
                )}

                <div className="inline-flex p-1 rounded border border-input bg-background" role="group">
                    <div
                        className={tabClassName(isActive === 'true' ? true : false)}
                        onClick={() => {
                            handleFilterStatus("true");
                        }}
                    >
                        Watched
                    </div>
                    <div
                        className={tabClassName(isActive === "false" ? true : false)}
                        onClick={() => {
                            handleFilterStatus("false");
                        }}
                    >
                        Not Watched
                    </div>
                </div>

                <Button
                    variant="outline"
                    size="sm"
                    className="flex gap-2 text-gray-300"
                    onClick={() => {
                        handleFilterStatus("");
                        onFilterChange('title', '');
                        setSorting([])
                    }}
                >
                    <XCircleIcon width="16" />
                    Clear
                </Button>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} style={{ width: header.getSize() }}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <TableCell key={cell.id} style={{ width: cell.column.getSize() }}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        );
                                    })}
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
            <div className="flex items-center justify-between space-x-2 py-4">
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <div className="flex gap-2">
                        {paginationList.map((page) => {
                            const currentPage = currentPageIndex + 1;
                            return (
                                <Button
                                    key={page}
                                    variant={currentPage === page + 1 ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => table.setPageIndex(page)}
                                >
                                    {page + 1}
                                </Button>
                            );
                        })}
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>

                <div className="flex items-center gap-2 text-sm pr-4">
                    Total: <span className="text-base font-semibold">{data.length}</span>
                </div>
            </div>
        </div>
    );
}

export default DataTable;
