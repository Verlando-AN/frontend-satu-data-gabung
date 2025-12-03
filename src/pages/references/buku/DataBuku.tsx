import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  Search, 
  RefreshCw, 
  BookOpen, 
  Calendar,
  Building2,
  Pencil,
  Trash2,
  Filter,
  FileText,
  ChevronDown
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useBookData, } from "@/hooks/useBookData";

const Table = ({ children, ...props }: any) => (
  <div className="w-full overflow-auto">
    <table className="w-full caption-bottom text-sm" {...props}>
      {children}
    </table>
  </div>
);

const TableHeader = ({ children, ...props }: any) => (
  <thead className="[&_tr]:border-b" {...props}>{children}</thead>
);

const TableBody = ({ children, ...props }: any) => (
  <tbody className="[&_tr:last-child]:border-0" {...props}>{children}</tbody>
);

const TableRow = ({ children, className = "", ...props }: any) => (
  <tr className={`border-b transition-colors ${className}`} {...props}>
    {children}
  </tr>
);

const TableHead = ({ children, className = "", ...props }: any) => (
  <th className={`h-12 px-4 text-left align-middle font-medium text-muted-foreground ${className}`} {...props}>
    {children}
  </th>
);

const TableCell = ({ children, className = "", ...props }: any) => (
  <td className={`p-4 align-middle ${className}`} {...props}>
    {children}
  </td>
);

const NativeSelect = ({ children, className = "", ...props }: any) => (
  <select className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ${className}`} {...props}>
    {children}
  </select>
);

const NativeSelectOption = ({ children, ...props }: any) => (
  <option {...props}>{children}</option>
);

const formatDate = (unix: number) => {
  const date = new Date(unix * 1000);
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export default function DataBuku() {
  const {
    data,
    filteredData,
    loading,
    searchQuery,
    setSearchQuery,
    yearFilter,
    setYearFilter,
    opdFilter,
    setOpdFilter,
    years,
    opds,
    thisYearBooks,
    handleDelete,
    fetchData,
    resetFilters
  } = useBookData();

  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />

        <div className="flex flex-1">
          <AppSidebar />

          <SidebarInset>
            <div className="flex flex-1 flex-col gap-6 p-6 bg-muted/30">

              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <BookOpen className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold tracking-tight">Data Buku Digital</h1>
                      <p className="text-sm text-muted-foreground mt-1">
                        Kelola koleksi buku digital pemerintah daerah
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link to="/create-buku">
                    <Button className="bg-primary text-white">
                      <Plus className="w-4 h-4 mr-2" /> Tambah Buku
                    </Button>
                  </Link>
                </div>
              </div>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Filter className="w-5 h-5" />
                    Filter & Pencarian
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3 items-center">
                    <div className="relative flex-1 min-w-[250px]">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        className="pl-9"
                        placeholder="Cari judul atau OPD..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>

                    <NativeSelect value={yearFilter} onChange={(e: any) => setYearFilter(e.target.value)}>
                      <NativeSelectOption value="">Semua Tahun</NativeSelectOption>
                      {years.map((year) => (
                        <NativeSelectOption key={year} value={String(year)}>
                          {year}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>

                    <NativeSelect value={opdFilter} onChange={(e: any) => setOpdFilter(e.target.value)}>
                      <NativeSelectOption value="">Semua OPD</NativeSelectOption>
                      {opds.map((opd) => (
                        <NativeSelectOption key={opd} value={opd}>
                          {opd}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>

                    {(searchQuery || yearFilter || opdFilter) && (
                      <Button variant="outline" onClick={resetFilters}>
                        Reset
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-lg">Daftar Buku Digital</CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="rounded-lg border">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead className="w-[80px]">No</TableHead>
                          <TableHead className="w-[120px]">Aksi</TableHead>
                          <TableHead>Judul</TableHead>
                          <TableHead>OPD</TableHead>
                          <TableHead>Tahun</TableHead>
                          <TableHead>Dibuat</TableHead>
                        </TableRow>
                      </TableHeader>

                      <TableBody>
                        {loading ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-12">
                              <RefreshCw className="w-6 h-6 animate-spin mx-auto" />
                              Memuat data...
                            </TableCell>
                          </TableRow>
                        ) : filteredData.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-12">
                              Tidak ada data
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredData.map((item, index) => (
                            <TableRow key={item.id_buku_digital}>
                              <TableCell className="text-center">{index + 1}</TableCell>

                              <TableCell>
                                <ButtonGroup>
                                  <Button variant="outline" size="sm">Aksi</Button>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="outline" size="sm" className="pl-2">
                                        <ChevronDown className="w-4 h-4" />
                                      </Button>
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent align="end" className="w-48">

                                      <DropdownMenuGroup>
                                        <DropdownMenuItem asChild>
                                          <Link to={`/update-buku/${item.id_buku_digital}`}>
                                            <Pencil className="mr-2 h-4 w-4" />
                                            Update
                                          </Link>
                                        </DropdownMenuItem>
                                      </DropdownMenuGroup>

                                      <DropdownMenuSeparator />

                                      <DropdownMenuItem
                                        className="cursor-pointer text-red-600"
                                        onClick={() => handleDelete(item.id_buku_digital, fetchData)}
                                      >
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Hapus
                                      </DropdownMenuItem>

                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </ButtonGroup>
                              </TableCell>

                              <TableCell>
                                <div className="flex items-start gap-2">
                                  <FileText className="w-4 h-4 text-primary mt-0.5" />
                                  <span className="font-medium">{item.buku}</span>
                                </div>
                              </TableCell>

                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Building2 className="w-4 h-4 text-muted-foreground" />
                                  {item.nama_opd}
                                </div>
                              </TableCell>

                              <TableCell>
                                <Badge variant="secondary" className="gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {item.tahun}
                                </Badge>
                              </TableCell>

                              <TableCell className="text-muted-foreground">
                                {formatDate(item.created_at)}
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}