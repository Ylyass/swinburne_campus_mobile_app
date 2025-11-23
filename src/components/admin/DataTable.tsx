"use client";
import { useReactTable, getCoreRowModel, flexRender, ColumnDef } from "@tanstack/react-table";

export default function DataTable<T>({ columns, data }: { columns: ColumnDef<T, unknown>[]; data: T[] }) {
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });
  return (
    <div className="overflow-auto rounded-xl ring-1 ring-slate-200">
      <table className="min-w-full text-sm">
        <thead className="sticky top-0 bg-white">
          {table.getHeaderGroups().map(hg=>(
            <tr key={hg.id}>
              {hg.headers.map(h=>(
                <th key={h.id} className="px-3 py-2 text-left font-medium text-slate-600">
                  {flexRender(h.column.columnDef.header, h.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y">
          {table.getRowModel().rows.map(r=>(
            <tr key={r.id} className="hover:bg-slate-50">
              {r.getVisibleCells().map(c=>(
                <td key={c.id} className="px-3 py-2">{flexRender(c.column.columnDef.cell, c.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
