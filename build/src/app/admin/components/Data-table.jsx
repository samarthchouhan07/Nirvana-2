"use client";
import { flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "./ui/table";
import React, { useState } from "react";
export function DataTable(_a) {
    var _b;
    var columns = _a.columns, data = _a.data;
    var _c = useState([]), sorting = _c[0], setSorting = _c[1];
    var table = useReactTable({
        data: data,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting: sorting
        }
    });
    return (<div className="w-full rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map(function (headerGroup) { return (<TableRow key={headerGroup.id}>
                            {headerGroup.headers.map(function (header) {
                return (<TableHead key={header.id}>
                                        {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>);
            })}
                        </TableRow>); })}
                </TableHeader>
                <TableBody>
                    {((_b = table.getRowModel().rows) === null || _b === void 0 ? void 0 : _b.length) ? (table.getRowModel().rows.map(function (row) { return (<TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                {row.getVisibleCells().map(function (cell) { return (<TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>); })}
                            </TableRow>); })) : (<TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>)}
                </TableBody>
            </Table>
            <div className="px-4 flex items-center justify-between space-x-2 py-4">
                <button className="text-slate-500 transition hover:text-slate-400" onClick={function () { return table.previousPage(); }} disabled={!table.getCanPreviousPage()}>
                    Previous
                </button>
                <button className="text-slate-500 transition hover:text-slate-400" onClick={function () { return table.nextPage(); }} disabled={!table.getCanNextPage()}>
                    Next
                </button>
            </div>
        </div>);
}
