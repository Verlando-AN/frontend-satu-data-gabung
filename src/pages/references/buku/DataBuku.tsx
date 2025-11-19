import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";

import { getAuthHeaders } from "@/api/auth";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://api-satudata.lampungtimurkab.go.id";

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
  const [loading, setLoading] = useState(true);

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
    } catch (error) {
      console.error("Error fetching:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
                  <h1 className="text-3xl font-bold">📚 Data Buku Digital</h1>
                  <p className="text-sm text-muted-foreground">
                    Daftar Buku Digital Satu Data Lamtim
                  </p>
                </div>

                <Button className="bg-primary text-white">
                  <Plus className="w-4 h-4 mr-2" /> Tambah Buku
                </Button>
              </div>

              <Table>
                <TableCaption>Daftar Buku Digital Satu Data Lamtim</TableCaption>

                <TableHeader>
                  <TableRow>
                    <TableHead>No</TableHead>
                    <TableHead>Aksi</TableHead>
                    <TableHead>Judul</TableHead>
                    <TableHead>Perangkat Daerah</TableHead>
                    <TableHead>Tahun</TableHead>
                    <TableHead>Dibuat Pada</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-6">
                        Memuat data...
                      </TableCell>
                    </TableRow>
                  ) : data.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-6">
                        Tidak ada data.
                      </TableCell>
                    </TableRow>
                  ) : (
                    data.map((item, index) => (
                      <TableRow key={item.id_buku_digital}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </TableCell>
                        <TableCell>{item.buku}</TableCell>
                        <TableCell>{item.nama_opd}</TableCell>
                        <TableCell>{item.tahun}</TableCell>
                        <TableCell>{formatDate(item.created_at)}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
