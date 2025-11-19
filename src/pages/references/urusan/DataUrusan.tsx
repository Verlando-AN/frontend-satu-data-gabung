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

interface OpdItem {
  id_opd: number;
  kode_wilayah: string;
  kode_bidang_urusan_1: string;
  kode_bidang_urusan_2: string;
  kode_bidang_urusan_3: string;
  kode_main_opd: string;
  kode_sub_opd: string;
  nama_opd: string;
  level: number;
  level_string: string;
}

export default function DataUrusan() {
  const [data, setData] = useState<OpdItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/strict/ref-data/list-Urusan`,
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
                  <h1 className="text-3xl font-bold">🏢 Data Urusan</h1>
                  <p className="text-sm text-muted-foreground">
                    Daftar Organisasi Perangkat Daerah
                  </p>
                </div>

              </div>

              <Table>
                <TableCaption>Daftar Urusan Satu Data Lamtim</TableCaption>

                <TableHeader>
                  <TableRow>
                    <TableHead>Kode Urusan</TableHead>
                    <TableHead>Nama Urusan</TableHead>
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
                    data.map((item) => (
                      <TableRow key={item.kode_urusan}>
                        <TableCell>{item.kode_urusan}</TableCell>
                        <TableCell>{item.nama_urusan}</TableCell>
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
