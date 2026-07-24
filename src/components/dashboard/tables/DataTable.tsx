import React from 'react';
import { motion } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { TableSkeleton } from '@/components/common/Skeleton';
import EmptyState from '@/components/common/EmptyState';

interface Column<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (value: unknown, row: T) => React.ReactNode;
  width?: string;
}

interface DataTableProps<T extends Record<string, unknown>> {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  sortKey?: string;
  sortOrder?: 'asc' | 'desc';
  onSort?: (key: string) => void;
  emptyTitle?: string;
  emptyDescription?: string;
  rowKey?: keyof T;
}

function DataTable<T extends Record<string, unknown>>({
  data, columns, isLoading, sortKey, sortOrder, onSort,
  emptyTitle, emptyDescription, rowKey = 'id' as keyof T,
}: DataTableProps<T>) {
  if (isLoading) return <TableSkeleton rows={5} />;
  if (!data.length) return <EmptyState title={emptyTitle} description={emptyDescription} />;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100">
            {columns.map(col => (
              <th
                key={String(col.key)}
                className={`text-left px-4 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wider ${col.sortable ? 'cursor-pointer hover:text-emerald-600 select-none' : ''}`}
                style={col.width ? { width: col.width } : {}}
                onClick={() => col.sortable && onSort?.(String(col.key))}
              >
                <div className="flex items-center gap-1.5">
                  {col.label}
                  {col.sortable && sortKey === String(col.key) && (
                    sortOrder === 'asc' ? <ChevronUp size={13} /> : <ChevronDown size={13} />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {data.map((row, i) => (
            <motion.tr
              key={String(row[rowKey] || i)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.03 }}
              className="hover:bg-gray-50 transition-colors"
            >
              {columns.map(col => (
                <td key={String(col.key)} className="px-4 py-3.5 text-gray-700">
                  {col.render
                    ? col.render(row[col.key as keyof T], row)
                    : String(row[col.key as keyof T] ?? '-')}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
