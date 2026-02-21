import React from 'react';
import './DataTable.css';

export interface Column<T> {
    key: string;
    header: string;
    render?: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    onRowClick?: (row: T) => void;
    emptyMessage?: string;
}

export function DataTable<T extends { id: string | number }>({
    data,
    columns,
    onRowClick,
    emptyMessage = "No data available."
}: DataTableProps<T>) {

    if (data.length === 0) {
        return (
            <div className="data-table-empty glass-panel">
                <p>{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className="data-table-container glass-panel">
            <table className="data-table">
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th key={col.key}>{col.header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr
                            key={row.id}
                            onClick={() => onRowClick && onRowClick(row)}
                            className={onRowClick ? 'clickable-row' : ''}
                        >
                            {columns.map((col) => (
                                <td key={col.key}>
                                    {col.render ? col.render(row) : (row as any)[col.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
