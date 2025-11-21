import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  Search, 
  RefreshCw, 
  Download, 
  BookOpen, 
  Calendar,
  Building2,
  Eye,
  Pencil,
  Trash2,
  Filter,
  FileText,
  ChevronDown
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { getAuthHeaders } from "@/api/auth";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Simplified table components
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

interface BukuDigital {
  id_buku_digital: number;
  id_opd: number;
  tahun: number;
  buku: string;
  file: string;
  created_at: number;
  nama_opd: string;
  buku_slug: string;
}

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://api-satudata.lampungtimurkab.go.id";

const formatDate = (unix: number) => {
  const date = new Date(unix * 1000);
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export default function DataBuku() {
  const [data, setData] = useState<BukuDigital[]>([]);
  const [filteredData, setFilteredData] = useState<BukuDigital[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [opdFilter, setOpdFilter] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/strict/ref-data/list-buku-digital`,
        {
          method: "GET",
          headers: getAuthHeaders(),
        }
      );

      if (!response.ok) throw new Error(`HTTP Error ${response.status}`);

      const result = await response.json();

      const finalData =
        result?.data ??
        result?.hasil ??
        result?.result ??
        (Array.isArray(result) ? result : null);

      setData(finalData || []);
      setFilteredData(finalData || []);
    } catch (error) {
      console.error("Error fetching:", error);
      setData([]);
      setFilteredData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter data
  useEffect(() => {
    let result = data;

    if (searchQuery) {
      result = result.filter(item =>
        item.buku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.nama_opd.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (yearFilter) {
      result = result.filter(item => String(item.tahun) === yearFilter);
    }

    if (opdFilter) {
      result = result.filter(item => item.nama_opd === opdFilter);
    }

    setFilteredData(result);
  }, [searchQuery, yearFilter, opdFilter, data]);

  // Get unique years and OPDs
  const years = Array.from(new Set(data.map(item => item.tahun))).sort((a, b) => b - a);
  const opds = Array.from(new Set(data.map(item => item.nama_opd))).sort();

  // Calculate statistics
  const currentYear = new Date().getFullYear();
  const thisYearBooks = data.filter(item => item.tahun === currentYear).length;

  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />

        <div className="flex flex-1">
          <AppSidebar />

          <SidebarInset>
            <div className="flex flex-1 flex-col gap-6 p-6 bg-muted/30">
              {/* Header Section */}
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
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => fetchData()}
                    className="gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Refresh
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Export
                  </Button>
                  <Button className="gap-2">
                    <Plus className="w-4 h-4" />
                    Tambah Buku
                  </Button>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid gap-4 md:grid-cols-4">
                <Card className="border-2 hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Total Buku
                        </p>
                        <h3 className="text-3xl font-bold mt-1">{data.length}</h3>
                      </div>
                      <div className="p-3 rounded-xl bg-primary/10">
                        <BookOpen className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Tahun Ini
                        </p>
                        <h3 className="text-3xl font-bold mt-1">{thisYearBooks}</h3>
                      </div>
                      <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/20">
                        <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
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
                        <h3 className="text-3xl font-bold mt-1">{filteredData.length}</h3>
                      </div>
                      <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/20">
                        <Filter className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Total OPD
                        </p>
                        <h3 className="text-3xl font-bold mt-1">{opds.length}</h3>
                      </div>
                      <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/20">
                        <Building2 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Filter Section */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Filter className="w-5 h-5" />
                    Filter & Pencarian
                  </CardTitle>
                  <CardDescription>
                    Cari buku berdasarkan judul, OPD, atau tahun
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3 items-center">
                    <div className="space-y-1.5 flex-1 min-w-[250px]">
                      <label className="text-xs font-medium text-muted-foreground">
                        Cari Buku
                      </label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          className="pl-9"
                          placeholder="Cari berdasarkan judul atau OPD..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 min-w-[150px]">
                      <label className="text-xs font-medium text-muted-foreground">
                        Tahun
                      </label>
                      <NativeSelect
                        value={yearFilter}
                        onChange={(e: any) => setYearFilter(e.target.value)}
                      >
                        <NativeSelectOption value="">Semua Tahun</NativeSelectOption>
                        {years.map((year) => (
                          <NativeSelectOption key={year} value={String(year)}>
                            {year}
                          </NativeSelectOption>
                        ))}
                      </NativeSelect>
                    </div>

                    <div className="space-y-1.5 min-w-[200px]">
                      <label className="text-xs font-medium text-muted-foreground">
                        OPD
                      </label>
                      <NativeSelect
                        value={opdFilter}
                        onChange={(e: any) => setOpdFilter(e.target.value)}
                      >
                        <NativeSelectOption value="">Semua OPD</NativeSelectOption>
                        {opds.map((opd) => (
                          <NativeSelectOption key={opd} value={opd}>
                            {opd}
                          </NativeSelectOption>
                        ))}
                      </NativeSelect>
                    </div>

                    {(searchQuery || yearFilter || opdFilter) && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-6"
                        onClick={() => {
                          setSearchQuery("");
                          setYearFilter("");
                          setOpdFilter("");
                        }}
                      >
                        Reset Filter
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Table Section */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-lg">Daftar Buku Digital</CardTitle>
                  <CardDescription>
                    Menampilkan {filteredData.length} dari {data.length} total buku
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead className="font-semibold w-[80px]">No</TableHead>
                          <TableHead className="font-semibold w-[120px]">Aksi</TableHead>
                          <TableHead className="font-semibold">Judul Buku</TableHead>
                          <TableHead className="font-semibold">Perangkat Daerah</TableHead>
                          <TableHead className="font-semibold w-[100px]">Tahun</TableHead>
                          <TableHead className="font-semibold w-[180px]">Dibuat Pada</TableHead>
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
                                <BookOpen className="w-12 h-12 text-muted-foreground/50" />
                                <p className="text-sm text-muted-foreground">
                                  {searchQuery || yearFilter || opdFilter ? 'Tidak ada data yang sesuai filter' : 'Tidak ada data buku'}
                                </p>
                              </div>
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredData.map((item, index) => (
                            <TableRow key={item.id_buku_digital} className="hover:bg-muted/50 transition-colors">
                              <TableCell className="font-medium text-center">
                                {index + 1}
                              </TableCell>
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
                                        <DropdownMenuItem className="cursor-pointer">
                                          <Eye className="mr-2 h-4 w-4" />
                                          Lihat Detail
                                        </DropdownMenuItem>

                                        <DropdownMenuItem className="cursor-pointer">
                                          <Download className="mr-2 h-4 w-4" />
                                          Download
                                        </DropdownMenuItem>

                                        <DropdownMenuItem className="cursor-pointer">
                                          <Pencil className="mr-2 h-4 w-4" />
                                          Edit Data
                                        </DropdownMenuItem>
                                      </DropdownMenuGroup>

                                      <DropdownMenuSeparator />

                                      <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Hapus
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </ButtonGroup>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-start gap-2">
                                  <FileText className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                  <span className="font-medium">{item.buku}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Building2 className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                  <span className="text-sm">{item.nama_opd}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="secondary" className="gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {item.tahun}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-sm text-muted-foreground">
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

              {/* Summary Info */}
              {!loading && filteredData.length > 0 && (
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <p>
                    Menampilkan {filteredData.length} buku
                    {yearFilter && ` tahun ${yearFilter}`}
                    {opdFilter && ` dari ${opdFilter}`}
                  </p>
                  <p>
                    Total: {data.length} buku dari {opds.length} OPD
                  </p>
                </div>
              )}
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}