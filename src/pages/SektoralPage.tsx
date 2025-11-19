import type { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/DataTable"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button" // ✅ Tambahkan ini
import { Plus } from "lucide-react" // ✅ Icon opsional dari lucide-react

type User = {
  name: string
  email: string
  role: string
}

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="font-medium text-gray-800">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <span className="capitalize px-2 py-1 rounded bg-gray-100 text-gray-700">
        {row.getValue("role")}
      </span>
    ),
  },
]

const data: User[] = [
  { name: "Sigit Wasis", email: "sigit@example.com", role: "admin" },
  { name: "Rina Putri", email: "rina@example.com", role: "editor" },
  { name: "Budi Santoso", email: "budi@example.com", role: "viewer" },
  { name: "Sigit Wasis", email: "sigit@example.com", role: "admin" },
  { name: "Rina Putri", email: "rina@example.com", role: "editor" },
  { name: "Budi Santoso", email: "budi@example.com", role: "viewer" },
  { name: "Sigit Wasis", email: "sigit@example.com", role: "admin" },
  { name: "Rina Putri", email: "rina@example.com", role: "editor" },
  { name: "Budi Santoso", email: "budi@example.com", role: "viewer" },
  { name: "Sigit Wasis", email: "sigit@example.com", role: "admin" },
  { name: "Rina Putri", email: "rina@example.com", role: "editor" },
  { name: "Budi Santoso", email: "budi@example.com", role: "viewer" },
]

export default function UsersPage() {
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            <div className="flex flex-1 flex-col p-4 space-y-4">
              {/* Header Section */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold">📁 Halaman Data Sektoral</h1>
                  <p className="text-sm text-muted-foreground">
                    Halaman untuk management data sektoral
                  </p>
                </div>

                {/* Tombol Tambah Sektoral */}
                <Button
                  className="bg-muted hover:bg-muted-600 text-black"
                  onClick={() => alert("Tambah Sektoral diklik!")}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Sektoral
                </Button>
              </div>

              {/* Tabel */}
              <DataTable columns={columns} data={data} />
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}
