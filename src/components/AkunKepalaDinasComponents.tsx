// File: components/AkunKepalaDinasComponents.tsx
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
  Download, 
  UserCog, 
  Building2,
  Eye,
  Pencil,
  Trash2,
  Shield,
  Filter,
  ChevronDown,
  UserCheck,
  UserX,
  Crown,
} from "lucide-react"
import { useAkunKepalaDinas, type AccountItem } from "@/hooks/useAkunKepalaDinas"

// Simplified table components
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

// Header Section Component
export function HeaderSection({ onRefresh }: { onRefresh: () => void }) {
  return (
    <div className="flex items-start justify-between">
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Crown className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Akun Kepala Dinas</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Kelola akun kepala dinas dan pimpinan OPD
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
        <Link to="/create-kepala-dinas">
          <Button className="bg-primary text-white">
            <Plus className="w-4 h-4 mr-2" /> Tambah Akun
          </Button>
        </Link>
      </div>
    </div>
  )
}

// Info Card Component
export function InfoCard() {
  return (
    <Card className="border-2 bg-blue-50 dark:bg-blue-950/20">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          Informasi Level Akses
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-3">
          <Badge variant="default" className="mt-0.5 gap-1">
            <Crown className="w-3 h-3" />
            Kepala Dinas
          </Badge>
          <p className="text-sm text-muted-foreground">
            Akun kepala dinas memiliki akses penuh untuk monitoring seluruh data sektoral 
            dalam OPD yang dipimpinnya serta dapat melihat laporan dan statistik lengkap.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

// Stats Cards Component
export function StatsCards({ 
  totalCount, 
  activeCount, 
  inactiveCount, 
  filteredCount 
}: { 
  totalCount: number, 
  activeCount: number, 
  inactiveCount: number, 
  filteredCount: number 
}) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card className="border-2 hover:shadow-lg transition-all">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Kepala Dinas
              </p>
              <h3 className="text-3xl font-bold mt-1">{totalCount}</h3>
            </div>
            <div className="p-3 rounded-xl bg-primary/10">
              <UserCog className="h-6 w-6 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 hover:shadow-lg transition-all">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Akun Aktif
              </p>
              <h3 className="text-3xl font-bold mt-1">{activeCount}</h3>
            </div>
            <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/20">
              <UserCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 hover:shadow-lg transition-all">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Tidak Aktif
              </p>
              <h3 className="text-3xl font-bold mt-1">{inactiveCount}</h3>
            </div>
            <div className="p-3 rounded-xl bg-red-100 dark:bg-red-900/20">
              <UserX className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 hover:shadow-lg transition-all">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Hasil Filter
              </p>
              <h3 className="text-3xl font-bold mt-1">{filteredCount}</h3>
            </div>
            <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/20">
              <Filter className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Filter Section Component
export function FilterSection({ 
  searchQuery, 
  setSearchQuery, 
  statusFilter, 
  setStatusFilter, 
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
          <div className="space-y-1.5 flex-1 min-w-[300px]">
            <label className="text-xs font-medium text-muted-foreground">
              Cari Akun
            </label>
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

          <div className="space-y-1.5 min-w-[200px]">
            <label className="text-xs font-medium text-muted-foreground">
              Status Akun
            </label>
            <NativeSelect
              value={statusFilter}
              onChange={(e: any) => setStatusFilter(e.target.value)}
            >
              <NativeSelectOption value="">Semua Status</NativeSelectOption>
              <NativeSelectOption value="active">Aktif</NativeSelectOption>
              <NativeSelectOption value="inactive">Tidak Aktif</NativeSelectOption>
            </NativeSelect>
          </div>

          {(searchQuery || statusFilter) && (
            <Button
              variant="outline"
              size="sm"
              className="mt-6"
              onClick={onResetFilters}
            >
              Reset Filter
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Table Section Component
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

      const { deleteAccount } = useAkunKepalaDinas()
    
      const handleDelete = async (id: number) => {
        const confirmDelete = confirm("Yakin ingin menghapus akun ini?")
        if (!confirmDelete) return
    
        const result = await deleteAccount(id)
        alert(result.message)
      }
    
  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="text-lg">Daftar Akun Kepala Dinas</CardTitle>
        <CardDescription>
          Menampilkan {filteredData.length} dari {totalCount} total kepala dinas
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
                      <Crown className="w-12 h-12 text-muted-foreground/50" />
                      <p className="text-sm text-muted-foreground">
                        {searchQuery || statusFilter ? 'Tidak ada data yang sesuai filter' : 'Tidak ada data kepala dinas'}
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
                                <Link to={`/edit-kepala-dinas/${item.id}`} className="cursor-pointer">
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
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Crown className="w-4 h-4 text-primary flex-shrink-0" />
                        <div>
                          <p className="font-medium">{item.full_name}</p>
                          {item.email && (
                            <p className="text-xs text-muted-foreground">{item.email}</p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <code className="px-2 py-1 rounded bg-muted text-xs font-mono">
                        {item.nip}
                      </code>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-sm">{item.nama_opd}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="default" className="gap-1">
                        <Crown className="w-3 h-3" />
                        {item.level_string}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {item.active ? (
                        <Badge variant="default" className="gap-1 bg-green-600">
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

// Summary Info Component
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
        Menampilkan {filteredData.length} kepala dinas
        {searchQuery && ' dari pencarian'}
        {statusFilter && ` dengan status ${statusFilter === 'active' ? 'aktif' : 'tidak aktif'}`}
      </p>
      <p>
        Total: {totalCount} kepala dinas ({activeCount} aktif, {inactiveCount} tidak aktif)
      </p>
    </div>
  )
}