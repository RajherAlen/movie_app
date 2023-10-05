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

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    filterPlaceholder?: string;
    showFilterInput?: boolean;
    searchQuery: string;
}

export function DataTable<TData, TValue>(props: DataTableProps<TData, TValue>) {
    const { columns, data, filterPlaceholder, showFilterInput, searchQuery } = props;

    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),

        // sorting
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),

        // filter
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),

        state: {
            sorting,
            columnFilters,
        },
    });

    const totalPages = table.getPageOptions().length;
    const currentPageIndex = table.getState().pagination.pageIndex;

    const displayPageRange = 2;

    const startPage = Math.max(0, currentPageIndex - displayPageRange);
    const endPage = Math.min(totalPages - 1, currentPageIndex + displayPageRange);
    const paginationList = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    return (
        <div>
            {showFilterInput && (
                <div className="flex items-center py-4">
                    <Input
                        placeholder={filterPlaceholder}
                        value={(table.getColumn(searchQuery)?.getFilterValue() as string) ?? ''}
                        onChange={(event) => table.getColumn(searchQuery)?.setFilterValue(event.target.value)}
                        className="max-w-sm"
                    />
                </div>
            )}

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
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
