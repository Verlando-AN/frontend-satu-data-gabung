import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, Download, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";

import {
  ChevronDown,
  Eye,
  Pencil,
  Trash2,
  Power,
  Database,
  CheckCircle2,
  XCircle,
  FileText,
} from "lucide-react";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";

import { getAuthHeaders } from "@/api/auth";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://api-satudata.lampungtimurkab.go.id";

interface SektoralItem {
  id: number;
  kode_urusan: string;
  jenis: number;
  kategori: number;
  jenis_string: string;
  kategori_string: string;
  kode_dssd: string;
  uraian_dssd: string;
  satuan: string;
  dimensi: string;
  active: boolean;
}

export default function DataSektoral() {
  const [data, setData] = useState<SektoralItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [perPage, setPerPage] = useState("20");
  const [active, setActive] = useState("");
  const [uraianDssd, setUraianDssd] = useState("");

  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fetchData = async () => {
    try {
      setLoading(true);

      const query = new URLSearchParams({
        page: String(page),
        per_page: perPage,
      });

      if (active !== "") query.append("active", active);
      if (uraianDssd !== "") query.append("uraian_dssd", uraianDssd);

      const response = await fetch(
        `${API_URL}/strict/data-sektoral?${query.toString()}`,
        {
          method: "GET",
          headers: getAuthHeaders(),
        }
      );

      if (!response.ok) throw new Error(`HTTP Error ${response.status}`);

      const currentPage = Number(response.headers.get("x-pagination-current-page"));
      const countPage = Number(response.headers.get("x-pagination-page-count"));
      const total = Number(response.headers.get("x-pagination-total-count"));

      if (currentPage) setPage(currentPage);
      if (countPage) setPageCount(countPage);
      if (total) setTotalCount(total);

      const result = await response.json();

      const finalData =
        result?.data ??
        result?.hasil ??
        result?.result ??
        (Array.isArray(result) ? result : null);

      setData(finalData || []);
    } catch (error) {
      console.error("Error fetching:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [perPage, active, uraianDssd, page]);

  const activeCount = data.filter(item => item.active).length;
  const inactiveCount = data.filter(item => !item.active).length;

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
                      <Database className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold tracking-tight">Data Sektoral</h1>
                      <p className="text-sm text-muted-foreground mt-1">
                        Kelola dan pantau data sektoral antar OPD secara terpusat
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
                  <Link to="/create-sektoral">
                    <Button className="gap-2">
                      <Plus className="w-4 h-4" />
                      Tambah Data
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid gap-4 md:grid-cols-4">
                <Card className="border-2">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Total Data
                        </p>
                        <h3 className="text-2xl font-bold mt-1">{totalCount}</h3>
                      </div>
                      <div className="p-3 rounded-lg bg-primary/10">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Data Aktif
                        </p>
                        <h3 className="text-2xl font-bold mt-1">{activeCount}</h3>
                      </div>
                      <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/20">
                        <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Tidak Aktif
                        </p>
                        <h3 className="text-2xl font-bold mt-1">{inactiveCount}</h3>
                      </div>
                      <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900/20">
                        <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Halaman
                        </p>
                        <h3 className="text-2xl font-bold mt-1">{page} / {pageCount}</h3>
                      </div>
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Database className="h-5 w-5 text-primary" />
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
                    Gunakan filter di bawah untuk menyaring data sesuai kebutuhan
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3 items-center">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted-foreground">
                        Per Halaman
                      </label>
                      <NativeSelect
                        value={perPage}
                        onChange={(e) => {
                          setPerPage(e.target.value);
                          setPage(1);
                        }}
                      >
                        <NativeSelectOption value="10">10 Data</NativeSelectOption>
                        <NativeSelectOption value="20">20 Data</NativeSelectOption>
                        <NativeSelectOption value="30">30 Data</NativeSelectOption>
                        <NativeSelectOption value="40">40 Data</NativeSelectOption>
                        <NativeSelectOption value="50">50 Data</NativeSelectOption>
                      </NativeSelect>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted-foreground">
                        Status
                      </label>
                      <NativeSelect
                        value={active}
                        onChange={(e) => {
                          setActive(e.target.value);
                          setPage(1);
                        }}
                      >
                        <NativeSelectOption value="">Semua Status</NativeSelectOption>
                        <NativeSelectOption value="true">Aktif</NativeSelectOption>
                        <NativeSelectOption value="false">Tidak Aktif</NativeSelectOption>
                      </NativeSelect>
                    </div>

                    <div className="space-y-1.5 flex-1 min-w-[250px]">
                      <label className="text-xs font-medium text-muted-foreground">
                        Cari Data
                      </label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          className="pl-9"
                          placeholder="Cari berdasarkan uraian DSSD..."
                          value={uraianDssd}
                          onChange={(e) => {
                            setUraianDssd(e.target.value);
                            setPage(1);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Table Section */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-lg">Daftar Data Sektoral</CardTitle>
                  <CardDescription>
                    Menampilkan {data.length} dari {totalCount} total data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead className="font-semibold">Aksi</TableHead>
                          <TableHead className="font-semibold">ID</TableHead>
                          <TableHead className="font-semibold">Status</TableHead>
                          <TableHead className="font-semibold">Kode DSSD</TableHead>
                          <TableHead className="font-semibold">Kategori</TableHead>
                          <TableHead className="font-semibold">Uraian DSSD</TableHead>
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
                        ) : data.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-12">
                              <div className="flex flex-col items-center gap-2">
                                <Database className="w-12 h-12 text-muted-foreground/50" />
                                <p className="text-sm text-muted-foreground">Tidak ada data ditemukan</p>
                              </div>
                            </TableCell>
                          </TableRow>
                        ) : (
                          data.map((item) => (
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
                                        <DropdownMenuItem className="cursor-pointer">
                                          <Eye className="mr-2 h-4 w-4" />
                                          Lihat Detail
                                        </DropdownMenuItem>

                                        <DropdownMenuItem className="cursor-pointer">
                                          <Pencil className="mr-2 h-4 w-4" />
                                          Edit Data
                                        </DropdownMenuItem>

                                        <DropdownMenuItem className="cursor-pointer">
                                          <Power className="mr-2 h-4 w-4" />
                                          Ubah Status
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
                              <TableCell className="font-medium">#{item.id}</TableCell>
                              <TableCell>
                                {item.active ? (
                                  <Badge variant="default" className="gap-1">
                                    <CheckCircle2 className="w-3 h-3" />
                                    Aktif
                                  </Badge>
                                ) : (
                                  <Badge variant="secondary" className="gap-1">
                                    <XCircle className="w-3 h-3" />
                                    Tidak Aktif
                                  </Badge>
                                )}
                              </TableCell>
                              <TableCell>
                                <code className="px-2 py-1 rounded bg-muted text-sm font-mono">
                                  {item.kode_dssd}
                                </code>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">{item.kategori_string}</Badge>
                              </TableCell>
                              <TableCell>
                                {item.uraian_dssd.length > 40
                                  ? item.uraian_dssd.substring(0, 40) + "..."
                                  : item.uraian_dssd}
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              {/* Pagination */}
              {!loading && data.length > 0 && (
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Menampilkan {((page - 1) * parseInt(perPage)) + 1} - {Math.min(page * parseInt(perPage), totalCount)} dari {totalCount} data
                  </p>
                  
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          className={page <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                          onClick={() => page > 1 && setPage(page - 1)}
                        />
                      </PaginationItem>

                      {Array.from({ length: pageCount }, (_, i) => i + 1)
                        .filter((p) => {
                          if (pageCount <= 5) return true;
                          if (p === 1 || p === pageCount) return true;
                          if (Math.abs(p - page) <= 1) return true;
                          return false;
                        })
                        .map((p, idx, arr) => {
                          const prev = arr[idx - 1];

                          return (
                            <>
                              {prev && p - prev > 1 && (
                                <PaginationItem key={`ellipsis-${p}`}>
                                  <PaginationEllipsis />
                                </PaginationItem>
                              )}

                              <PaginationItem key={p}>
                                <PaginationLink
                                  className={p === page ? "bg-primary text-primary-foreground" : "cursor-pointer"}
                                  onClick={() => setPage(p)}
                                >
                                  {p}
                                </PaginationLink>
                              </PaginationItem>
                            </>
                          );
                        })}

                      <PaginationItem>
                        <PaginationNext
                          className={page >= pageCount ? "pointer-events-none opacity-50" : "cursor-pointer"}
                          onClick={() => page < pageCount && setPage(page + 1)}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}