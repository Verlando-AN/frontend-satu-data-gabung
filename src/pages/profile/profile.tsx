import { useEffect, useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { getAuthHeaders } from "@/api/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://api-satudata.lampungtimurkab.go.id";

interface ProfileResponse {
  id: string;
  nip: string;
  email: string;
  phone: string;
  level: number;
  level_string: string;
  full_name: string;
  kode_wilayah: string;
  id_opd: number;
  kode_bidang_urusan_1: string;
  kode_bidang_urusan_2: string;
  kode_bidang_urusan_3: string;
  kode_main_opd: string;
  kode_sub_opd: string;
  kode_opd: string;
  nama_opd: string;
  level_opd: number;
  level_opd_string: string;
}

export default function Profile() {
  const [data, setData] = useState<ProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/strict/user/profile`, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      if (!response.ok) throw new Error(`HTTP Error ${response.status}`);

      const result = await response.json();
      const finalData = result?.data ?? result?.hasil ?? result?.result ?? result;

      setData(finalData || null);
    } catch (error) {
      console.error("Error fetching:", error);
      setData(null);
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

              <h1 className="text-3xl font-bold">👤 Profil Pengguna</h1>
              <p className="text-sm text-muted-foreground">
                Informasi akun & perangkat daerah
              </p>

              {loading ? (
                <p className="text-center py-6">Memuat data...</p>
              ) : !data ? (
                <p className="text-center py-6">Tidak ada data.</p>
              ) : (
                <Card className="max-w-xl">
                  <CardHeader>
                    <CardTitle>{data.full_name}</CardTitle>
                    <p className="text-muted-foreground">{data.level_string}</p>
                  </CardHeader>

                  <CardContent className="space-y-2">
                    <p><strong>NIP:</strong> {data.nip}</p>
                    <p><strong>OPD:</strong> {data.nama_opd}</p>
                    <p><strong>Kode OPD:</strong> {data.kode_opd}</p>
                    <p><strong>Level OPD:</strong> {data.level_opd_string}</p>
                    <p><strong>Kode Wilayah:</strong> {data.kode_wilayah}</p>
                    <p><strong>Email:</strong> {data.email || "-"} </p>
                    <p><strong>Phone:</strong> {data.phone || "-"} </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
