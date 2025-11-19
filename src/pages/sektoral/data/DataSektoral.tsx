import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCaption,
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
} from "@/components/ui/pagination"

import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";

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

  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />

        <div className="flex flex-1">
          <AppSidebar />

          <SidebarInset>
            <div className="flex flex-1 flex-col p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold">📁 Data Sektoral</h1>
                  <p className="text-sm text-muted-foreground">
                    Halaman untuk manajemen data sektoral
                  </p>
                </div>

                <Link to="/create-sektoral">
                  <Button className="bg-primary text-white">
                    <Plus className="w-4 h-4 mr-2" /> Tambah Data
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap gap-3 items-center p-3 bg-muted/40 rounded-xl">
                <NativeSelect
                  value={perPage}
                  onChange={(e) => {
                    setPerPage(e.target.value);
                    setPage(1);
                  }}
                >
                  <NativeSelectOption value="10">10</NativeSelectOption>
                  <NativeSelectOption value="20">20</NativeSelectOption>
                  <NativeSelectOption value="30">30</NativeSelectOption>
                  <NativeSelectOption value="40">40</NativeSelectOption>
                  <NativeSelectOption value="50">50</NativeSelectOption>
                </NativeSelect>

                <NativeSelect
                  value={active}
                  onChange={(e) => {
                    setActive(e.target.value);
                    setPage(1);
                  }}
                >
                  <NativeSelectOption value="">Semua</NativeSelectOption>
                  <NativeSelectOption value="true">Aktif</NativeSelectOption>
                  <NativeSelectOption value="false">Tidak Aktif</NativeSelectOption>
                </NativeSelect>

                <Input
                  className="w-[250px]"
                  placeholder="Cari Uraian SSD..."
                  value={uraianDssd}
                  onChange={(e) => {
                    setUraianDssd(e.target.value);
                    setPage(1);
                  }}
                />
            </div>

              <Table>
                <TableCaption>
                  Total: {totalCount} data
                </TableCaption>

                <TableHeader>
                  <TableRow>
                    <TableHead>Aksi</TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Aktif</TableHead>
                    <TableHead>Kode DSSD</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Uraian DSSD</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6">
                        Memuat data...
                      </TableCell>
                    </TableRow>
                  ) : data.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6">
                        Tidak ada data.
                      </TableCell>
                    </TableRow>
                  ) : (
                    data.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Button size="sm" variant="outline">Edit</Button>
                        </TableCell>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.active ? "Aktif" : "Tidak"}</TableCell>
                        <TableCell>{item.kode_dssd}</TableCell>
                        <TableCell>{item.kategori_string}</TableCell>
                        <TableCell>
                          {item.uraian_dssd.length > 30
                            ? item.uraian_dssd.substring(0, 30) + "..."
                            : item.uraian_dssd}
                        </TableCell>

                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>

              <Pagination>
                <PaginationContent>
                  
                  <PaginationItem>
                    <PaginationPrevious
                      className={page <= 1 ? "pointer-events-none opacity-50" : ""}
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
                              className={p === page ? "bg-primary text-white" : ""}
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
                      className={page >= pageCount ? "pointer-events-none opacity-50" : ""}
                      onClick={() => page < pageCount && setPage(page + 1)}
                    />
                  </PaginationItem>

                </PaginationContent>
              </Pagination>


            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
