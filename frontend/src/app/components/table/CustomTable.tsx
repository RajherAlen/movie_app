import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from 'components/ui/table';

import clsx from 'clsx';

const CustomTable = ({ data }: { data: any[] }) => {
    const columns = Object.keys(data[0]);

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {columns.map((column: string, index: number) => (
                        <TableHead
                            key={column}
                            className={clsx(
                                'w-[100px]',
                                columns.length === index + 1
                                    ? 'text-right'
                                    : '',
                            )}
                        >
                            {column}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((rowData: any, index: number) => (
                    <TableRow key={index}>
                        {columns.map((column: string, index: number) => {
                            return (
                                <TableCell
                                    key={column}
                                    className={
                                        columns.length === index + 1
                                            ? 'text-right'
                                            : ''
                                    }
                                >
                                    {rowData[column]}
                                </TableCell>
                            );
                        })}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default CustomTable;
