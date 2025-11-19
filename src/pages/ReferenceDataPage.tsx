import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

// ✅ Tipe data untuk proyek
type Project = {
    id: number
    name: string
    status: "Active" | "Pending" | "Completed"
    createdAt: string
}

// ✅ Data dummy
const initialProjects: Project[] = [
    { id: 1, name: "Sistem POS UMKM", status: "Active", createdAt: "2025-10-12" },
    { id: 2, name: "Dashboard Penjualan", status: "Completed", createdAt: "2025-08-05" },
    { id: 3, name: "Chatbot Akademik", status: "Pending", createdAt: "2025-09-20" },
    { id: 4, name: "Analisis Penjualan AI", status: "Active", createdAt: "2025-10-25" },
    { id: 5, name: "Aplikasi E-SPP Sekolah", status: "Completed", createdAt: "2025-07-11" },
]

export default function ReferenceDataPage() {
    const [search, setSearch] = useState("")
    const [projects, setProjects] = useState<Project[]>(initialProjects)
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

    // ✅ Filter berdasarkan nama proyek
    const filteredProjects = projects.filter((project) =>
        project.name.toLowerCase().includes(search.toLowerCase())
    )

    // ✅ Sort berdasarkan tanggal
    const sortedProjects = [...filteredProjects].sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime()
        const dateB = new Date(b.createdAt).getTime()
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA
    })

    const toggleSort = () => {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    }

    return (
        <div className="[--header-height:calc(--spacing(14))]">
            <SidebarProvider className="flex flex-col">
                <SiteHeader />
                <div className="flex flex-1">
                    <AppSidebar />
                    <SidebarInset>
                        <div className="flex flex-1 flex-col p-4">
                            <h1 className="text-2xl font-bold mb-4">📁 Halaman Reference Data</h1>

                            {/* 🔍 Filter dan Sort */}
                            <div className="flex items-center justify-between mb-4 gap-2">
                                <Input
                                    placeholder="Cari proyek..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="max-w-sm"
                                />
                                <Button variant="outline" onClick={toggleSort}>
                                    Urutkan: {sortOrder === "asc" ? "Terlama" : "Terbaru"}
                                </Button>
                            </div>

                            {/* 📋 DataTable */}
                            <div className="rounded-md border">
                                <Table>
                                    <TableCaption>Daftar proyek yang sedang dikerjakan</TableCaption>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[60px]">ID</TableHead>
                                            <TableHead>Nama Proyek</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="cursor-pointer" onClick={toggleSort}>
                                                Tanggal Dibuat {sortOrder === "asc" ? "↑" : "↓"}
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {sortedProjects.length > 0 ? (
                                            sortedProjects.map((project) => (
                                                <TableRow key={project.id}>
                                                    <TableCell>{project.id}</TableCell>
                                                    <TableCell>{project.name}</TableCell>
                                                    <TableCell>{project.status}</TableCell>
                                                    <TableCell>{project.createdAt}</TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={4} className="text-center">
                                                    Tidak ada data proyek ditemukan
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </SidebarInset>
                </div>
            </SidebarProvider>
        </div>
    )
}
