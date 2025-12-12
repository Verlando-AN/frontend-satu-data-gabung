import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Plus, 
  Search, 
  RefreshCw, 
  Users, 
  Building2,
  Pencil,
  Shield,
  Filter,
  ChevronDown,
  UserCheck,
  UserX,
  Trash2,
} from "lucide-react"

import type { AccountItem } from "@/hooks/useAkunKepalaBidang"
import { useAkunKepalaBidang } from "@/hooks/useAkunKepalaBidang"

export const Table = ({ children, ...props }: any) => (
  <div className="w-full overflow-auto">
    <table className="w-full caption-bottom text-sm" {...props}>
      {children}
    </table>
  </div>
)

export const TableHeader = ({ children, ...props }: any) => (
  <thead className="[&_tr]:border-b" {...props}>{children}</thead>
)

export const TableBody = ({ children, ...props }: any) => (
  <tbody className="[&_tr:last-child]:border-0" {...props}>{children}</tbody>
)

export const TableRow = ({ children, className = "", ...props }: any) => (
  <tr className={`border-b transition-colors ${className}`} {...props}>
    {children}
  </tr>
)

export const TableHead = ({ children, className = "", ...props }: any) => (
  <th className={`h-12 px-4 text-left align-middle font-medium text-muted-foreground ${className}`} {...props}>
    {children}
  </th>
)

export const TableCell = ({ children, className = "", ...props }: any) => (
  <td className={`p-4 align-middle ${className}`} {...props}>
    {children}
  </td>
)

export const NativeSelect = ({ children, className = "", ...props }: any) => (
  <select className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ${className}`} {...props}>
    {children}
  </select>
)

export const NativeSelectOption = ({ children, ...props }: any) => (
  <option {...props}>{children}</option>
)

export function HeaderSection({ onRefresh }: { onRefresh: () => void }) {
  return (
    <div className="flex items-start justify-between">
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Akun Kepala Bidang</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Kelola akun kepala bidang dan admin OPD
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={onRefresh}
          className="gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </Button>
        <Link to="/create-kepala">
          <Button className="bg-primary text-white">
            <Plus className="w-4 h-4 mr-2" /> Tambah Akun
          </Button>
        </Link>
      </div>
    </div>
  )
}

export function StatsCards({ totalCount, activeCount, inactiveCount, filteredCount } : {
  totalCount: number,
  activeCount: number,
  inactiveCount: number,
  filteredCount: number
}) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {/* Total */}
      <Card className="border-2 hover:shadow-lg transition-all">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Akun</p>
              <h3 className="text-3xl font-bold mt-1">{totalCount}</h3>
            </div>
            <div className="p-3 rounded-xl bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Aktif */}
      <Card className="border-2 hover:shadow-lg transition-all">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Akun Aktif</p>
              <h3 className="text-3xl font-bold mt-1">{activeCount}</h3>
            </div>
            <div className="p-3 rounded-xl bg-green-100">
              <UserCheck className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tidak aktif */}
      <Card className="border-2 hover:shadow-lg transition-all">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Tidak Aktif</p>
              <h3 className="text-3xl font-bold mt-1">{inactiveCount}</h3>
            </div>
            <div className="p-3 rounded-xl bg-red-100">
              <UserX className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filter */}
      <Card className="border-2 hover:shadow-lg transition-all">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Hasil Filter</p>
              <h3 className="text-3xl font-bold mt-1">{filteredCount}</h3>
            </div>
            <div className="p-3 rounded-xl bg-purple-100">
              <Filter className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function FilterSection({
  searchQuery, setSearchQuery,
  statusFilter, setStatusFilter,
  onResetFilters
}: {
  searchQuery: string,
  setSearchQuery: (value: string) => void,
  statusFilter: string,
  setStatusFilter: (value: string) => void,
  onResetFilters: () => void
}) {
  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Filter className="w-5 h-5" />
          Filter & Pencarian
        </CardTitle>
        <CardDescription>
          Cari akun berdasarkan nama, NIP, OPD atau email
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3 items-center">
          {/* Search */}
          <div className="space-y-1.5 flex-1 min-w-[300px]">
            <label className="text-xs font-medium text-muted-foreground">Cari Akun</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Cari berdasarkan nama, NIP, OPD atau email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Filter status */}
          <div className="space-y-1.5 min-w-[200px]">
            <label className="text-xs font-medium text-muted-foreground">Status Akun</label>
            <NativeSelect value={statusFilter} onChange={(e: any) => setStatusFilter(e.target.value)}>
              <NativeSelectOption value="">Semua Status</NativeSelectOption>
              <NativeSelectOption value="active">Aktif</NativeSelectOption>
              <NativeSelectOption value="inactive">Tidak Aktif</NativeSelectOption>
            </NativeSelect>
          </div>

          {(searchQuery || statusFilter) && (
            <Button variant="outline" size="sm" className="mt-6" onClick={onResetFilters}>
              Reset Filter
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export function TableSection({
  loading,
  filteredData,
  totalCount,
  searchQuery,
  statusFilter
}: {
  loading: boolean,
  filteredData: AccountItem[],
  totalCount: number,
  searchQuery: string,
  statusFilter: string
}) {

  const { deleteAccount } = useAkunKepalaBidang()

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Yakin ingin menghapus akun ini?")
    if (!confirmDelete) return

    const result = await deleteAccount(id)
    alert(result.message)
  }

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="text-lg">Daftar Akun</CardTitle>
        <CardDescription>
          Menampilkan {filteredData.length} dari {totalCount} total akun
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold w-[120px]">Aksi</TableHead>
                <TableHead className="font-semibold">Nama Lengkap</TableHead>
                <TableHead className="font-semibold w-[180px]">NIP</TableHead>
                <TableHead className="font-semibold">OPD</TableHead>
                <TableHead className="font-semibold w-[120px]">Level</TableHead>
                <TableHead className="font-semibold w-[120px]">Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12">
                    <div className="flex flex-col items-center gap-2">
                      <RefreshCw className="w-6 h-6 animate-spin text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Memuat data...</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12">
                    <div className="flex flex-col items-center gap-2">
                      <Users className="w-12 h-12 text-muted-foreground/50" />
                      <p className="text-sm text-muted-foreground">
                        {searchQuery || statusFilter ? 'Tidak ada data yang sesuai filter' : 'Tidak ada data akun'}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((item) => (
                  <TableRow key={item.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell>
                      <ButtonGroup>
                        <Button variant="outline" size="sm">Aksi</Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="pl-2">
                              <ChevronDown className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent align="end" className="[--radius:0.75rem] w-48">
                            <DropdownMenuGroup>
                                <DropdownMenuItem asChild>
                                <Link to={`/edit-kepala-bidang/${item.id}`} className="cursor-pointer">
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Edit
                                </Link>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>

                            <DropdownMenuSeparator />

                            {/* Hapus */}
                            <DropdownMenuItem
                              className="cursor-pointer text-red-600"
                              onClick={() => handleDelete(item.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Hapus
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </ButtonGroup>
                    </TableCell>

                    {/* Nama */}
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-primary" />
                        <div>
                          <p className="font-medium">{item.full_name}</p>
                          {item.email && (
                            <p className="text-xs text-muted-foreground">{item.email}</p>
                          )}
                        </div>
                      </div>
                    </TableCell>

                    {/* NIP */}
                    <TableCell>
                      <code className="px-2 py-1 rounded bg-muted text-xs font-mono">
                        {item.nip}
                      </code>
                    </TableCell>

                    {/* OPD */}
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{item.nama_opd}</span>
                      </div>
                    </TableCell>

                    {/* Level */}
                    <TableCell>
                      <Badge variant="outline">{item.level_string}</Badge>
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      {item.active ? (
                        <Badge variant="default" className="gap-1">
                          <UserCheck className="w-3 h-3" />
                          Aktif
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="gap-1">
                          <UserX className="w-3 h-3" />
                          Tidak Aktif
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

export function SummaryInfo({
  filteredData,
  totalCount,
  activeCount,
  inactiveCount,
  searchQuery,
  statusFilter
}: {
  filteredData: AccountItem[],
  totalCount: number,
  activeCount: number,
  inactiveCount: number,
  searchQuery: string,
  statusFilter: string
}) {
  if (!filteredData.length) return null

  return (
    <div className="flex items-center justify-between text-sm text-muted-foreground">
      <p>
        Menampilkan {filteredData.length} akun
        {searchQuery && " dari pencarian"}
        {statusFilter && ` dengan status ${statusFilter === "active" ? "aktif" : "tidak aktif"}`}
      </p>
      <p>
        Total: {totalCount} akun ({activeCount} aktif, {inactiveCount} tidak aktif)
      </p>
    </div>
  )
}
