import { useEffect, useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { getAuthHeaders } from "@/api/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, Building2, MapPin, Mail, Phone, Hash, Shield } from "lucide-react";

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

  const InfoRow = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
      <div className="mt-0.5">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="text-sm font-semibold">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />

        <div className="flex flex-1">
          <AppSidebar />

          <SidebarInset>
            <div className="flex flex-1 flex-col p-6 space-y-6">
              {/* Header Section */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight">Profil Pengguna</h1>
                    <p className="text-sm text-muted-foreground">
                      Informasi akun & perangkat daerah
                    </p>
                  </div>
                </div>
              </div>

              {loading ? (
                <Card className="max-w-3xl">
                  <CardContent className="p-12">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                      <p className="text-sm text-muted-foreground">Memuat data profil...</p>
                    </div>
                  </CardContent>
                </Card>
              ) : !data ? (
                <Card className="max-w-3xl">
                  <CardContent className="p-12">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <User className="h-12 w-12 text-muted-foreground/50" />
                      <p className="text-sm text-muted-foreground">Tidak ada data profil tersedia.</p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="max-w-3xl space-y-4">
                  {/* Profile Header Card */}
                  <Card>
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <CardTitle className="text-2xl">{data.full_name}</CardTitle>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="font-normal">
                              <Shield className="h-3 w-3 mr-1" />
                              {data.level_string}
                            </Badge>
                            <Badge variant="outline" className="font-normal">
                              NIP: {data.nip}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  {/* Organization Info Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Building2 className="h-5 w-5" />
                        Informasi Organisasi
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-1">
                      <InfoRow 
                        icon={Building2} 
                        label="Nama OPD" 
                        value={data.nama_opd} 
                      />
                      <InfoRow 
                        icon={Hash} 
                        label="Kode OPD" 
                        value={data.kode_opd} 
                      />
                      <InfoRow 
                        icon={Shield} 
                        label="Level OPD" 
                        value={data.level_opd_string} 
                      />
                      <InfoRow 
                        icon={MapPin} 
                        label="Kode Wilayah" 
                        value={data.kode_wilayah} 
                      />
                    </CardContent>
                  </Card>

                  {/* Contact Info Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Mail className="h-5 w-5" />
                        Informasi Kontak
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-1">
                      <InfoRow 
                        icon={Mail} 
                        label="Email" 
                        value={data.email || "Tidak ada data"} 
                      />
                      <InfoRow 
                        icon={Phone} 
                        label="Nomor Telepon" 
                        value={data.phone || "Tidak ada data"} 
                      />
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}