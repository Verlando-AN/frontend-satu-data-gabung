"use client"

import * as React from "react"
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import type { SortingState, ColumnDef } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Download } from "lucide-react"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [filtering, setFiltering] = React.useState("")

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            globalFilter: filtering,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    const totalRecords = table.getFilteredRowModel().rows.length
    const currentPage = table.getState().pagination.pageIndex + 1
    const totalPages = table.getPageCount()

    // 🔽 Function Exporters
    const handleExportJSON = () => {
        const json = JSON.stringify(data, null, 2)
        const blob = new Blob([json], { type: "application/json" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "data.json"
        a.click()
    }

    const handleExportPDF = () => {
        // simple PDF export (tanpa library)
        const win = window.open("", "_blank")
        if (!win) return
        win.document.write("<h1>Data Export</h1><pre>" + JSON.stringify(data, null, 2) + "</pre>")
        win.print()
    }

    return (
        <div className="w-full">
            {/* 🔍 Search + Export Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between py-4 gap-3">
                {/* Search */}
                <Input
                    placeholder="Search..."
                    value={filtering ?? ""}
                    onChange={(e) => setFiltering(e.target.value)}
                    className="max-w-sm"
                />

                {/* Export Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="flex items-center gap-2">
                            <Download className="w-4 h-4" />
                            Export
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={handleExportJSON}>Export JSON</DropdownMenuItem>
                        <DropdownMenuItem onClick={handleExportPDF}>Export PDF</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* 🧾 Table */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    const sorted = header.column.getIsSorted()
                                    return (
                                        <TableHead
                                            key={header.id}
                                            onClick={header.column.getToggleSortingHandler()}
                                            className="cursor-pointer select-none"
                                        >
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                            {sorted === "asc" && " 🔼"}
                                            {sorted === "desc" && " 🔽"}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
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

            {/* 📄 Pagination & Page Size */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
                <div className="text-sm text-gray-500">
                    Page <span className="font-medium">{currentPage}</span> of{" "}
                    <span className="font-medium">{totalPages}</span> —{" "}
                    <span className="font-medium">{totalRecords}</span> total records
                </div>

                <div className="flex items-center gap-3">
                    {/* Page size selector */}
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">Rows per page:</span>
                        <Select
                            value={String(table.getState().pagination.pageSize)}
                            onValueChange={(value) => table.setPageSize(Number(value))}
                        >
                            <SelectTrigger className="w-20">
                                <SelectValue
                                    placeholder={table.getState().pagination.pageSize.toString()}
                                />
                            </SelectTrigger>
                            <SelectContent>
                                {[10, 20, 50, 100].map((pageSize) => (
                                    <SelectItem key={pageSize} value={pageSize.toString()}>
                                        {pageSize}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Pagination buttons */}
                    <div className="flex gap-2">
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
                </div>
            </div>
        </div>
    )
}
