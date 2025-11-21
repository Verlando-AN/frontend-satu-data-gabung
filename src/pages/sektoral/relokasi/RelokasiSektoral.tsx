import { useEffect, useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Save,
  ArrowLeft,
  ArrowRightLeft,
  Building2,
  FileText,
  CheckCircle2,
  AlertCircle,
  Info,
  MoveRight,
  Database,
} from "lucide-react"
import { getAuthHeaders } from "@/api/auth"

const NativeSelect = ({ children, className = "", ...props }: any) => (
  <select className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`} {...props}>
    {children}
  </select>
);

const NativeSelectOption = ({ children, ...props }: any) => (
  <option {...props}>{children}</option>
);

const API_URL =
  import.meta.env.VITE_API_URL || "https://api-satudata.lampungtimurkab.go.id"

interface OPD {
  id_opd: number;
  nama_opd: string;
}

interface Sektoral {
  id: number;
  kode_dssd: string;
  uraian_dssd: string;
}

export default function RelokasiSektoral() {
  const [listOpdLama, setListOpdLama] = useState<OPD[]>([]);
  const [listOpdBaru, setListOpdBaru] = useState<OPD[]>([]);
  const [listSektoral, setListSektoral] = useState<Sektoral[]>([]);
  
  const [formData, setFormData] = useState({
    opdLama: "",
    sektoral: "",
    opdBaru: "",
  });

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  // Fetch OPD List
  const fetchOPD = async () => {
    try {
      const response = await fetch(`${API_URL}/strict/ref-data/list-opd`, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      if (!response.ok) throw new Error("Gagal mengambil data OPD");

      const result = await response.json();
      const finalData = result?.data ?? result?.hasil ?? result?.result ?? (Array.isArray(result) ? result : []);
      
      setListOpdLama(finalData || []);
      setListOpdBaru(finalData || []);
    } catch (error) {
      console.error("Error fetching OPD:", error);
    }
  };

  // Fetch Sektoral based on OPD
  const fetchSektoral = async (idOpd: string) => {
    if (!idOpd) {
      setListSektoral([]);
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/strict/data-sektoral/${idOpd}`,
        {
          method: "GET",
          headers: getAuthHeaders(),
        }
      );

      if (!response.ok) throw new Error("Gagal mengambil data sektoral");

      const result = await response.json();
      const finalData = result?.data ?? result?.hasil ?? result?.result ?? (Array.isArray(result) ? result : []);
      
      setListSektoral(finalData || []);
    } catch (error) {
      console.error("Error fetching sektoral:", error);
      setListSektoral([]);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoadingData(true);
      await fetchOPD();
      setLoadingData(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (formData.opdLama) {
      fetchSektoral(formData.opdLama);
    }
  }, [formData.opdLama]);

  const handleSubmit = async () => {
    // Validation
    if (!formData.opdLama || !formData.sektoral || !formData.opdBaru) {
      setMessage({ type: 'error', text: 'Semua field harus diisi' });
      return;
    }

    if (formData.opdLama === formData.opdBaru) {
      setMessage({ type: 'error', text: 'OPD lama dan OPD baru tidak boleh sama' });
      return;
    }

    try {
      setLoading(true);
      setMessage(null);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setMessage({ type: 'success', text: 'Data sektoral berhasil direlokasi!' });
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          opdLama: "",
          sektoral: "",
          opdBaru: "",
        });
        setListSektoral([]);
        setMessage(null);
      }, 3000);
      
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Terjadi kesalahan' });
    } finally {
      setLoading(false);
    }
  };

  // Get selected OPD names
  const selectedOpdLama = listOpdLama.find(opd => String(opd.id_opd) === formData.opdLama);
  const selectedOpdBaru = listOpdBaru.find(opd => String(opd.id_opd) === formData.opdBaru);
  const selectedSektoral = listSektoral.find(s => String(s.id) === formData.sektoral);

  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />

        <div className="flex flex-1">
          <AppSidebar />

          <SidebarInset>
            <div className="flex flex-col flex-1 gap-6 p-6 bg-muted/30">

              {/* Header Section */}
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <ArrowRightLeft className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold tracking-tight">Relokasi Data Sektoral</h1>
                      <p className="text-sm text-muted-foreground mt-1">
                        Pindahkan data sektoral antar OPD
                      </p>
                    </div>
                  </div>
                </div>

                <Button variant="outline" size="sm" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Kembali
                </Button>
              </div>

              {/* Instructions Card */}
              <Card className="border-2 bg-blue-50 dark:bg-blue-950/20">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    Petunjuk Relokasi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Pilih OPD lama yang memiliki data sektoral yang akan dipindahkan</li>
                    <li>• Pilih data sektoral yang akan direlokasi dari OPD tersebut</li>
                    <li>• Pilih OPD baru sebagai tujuan relokasi data</li>
                    <li>• Pastikan OPD lama dan OPD baru berbeda</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Form Card */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-xl">Form Relokasi</CardTitle>
                  <CardDescription>
                    Isi formulir dengan lengkap untuk memproses relokasi data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Message Alert */}
                    {message && (
                      <Alert variant={message.type === 'error' ? 'destructive' : 'default'}>
                        {message.type === 'success' ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <AlertCircle className="h-4 w-4" />
                        )}
                        <AlertDescription>{message.text}</AlertDescription>
                      </Alert>
                    )}

                    {loadingData ? (
                      <div className="flex flex-col items-center gap-2 py-12">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                        <p className="text-sm text-muted-foreground">Memuat data...</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {/* Step 1: Select OPD Lama */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 pb-2 border-b">
                            <Badge variant="default" className="rounded-full w-6 h-6 flex items-center justify-center p-0">1</Badge>
                            <h3 className="font-semibold">Pilih OPD Asal</h3>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="opdLama" className="flex items-center gap-2">
                              <Building2 className="w-4 h-4 text-muted-foreground" />
                              OPD Lama (Asal Data) <span className="text-red-500">*</span>
                            </Label>
                            <NativeSelect
                              id="opdLama"
                              value={formData.opdLama}
                              onChange={(e: any) => {
                                setFormData({...formData, opdLama: e.target.value, sektoral: ""});
                              }}
                            >
                              <NativeSelectOption value="">Pilih OPD Lama</NativeSelectOption>
                              {listOpdLama.map((opd) => (
                                <NativeSelectOption key={opd.id_opd} value={String(opd.id_opd)}>
                                  {opd.nama_opd}
                                </NativeSelectOption>
                              ))}
                            </NativeSelect>
                          </div>
                        </div>

                        {/* Step 2: Select Sektoral */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 pb-2 border-b">
                            <Badge variant="default" className="rounded-full w-6 h-6 flex items-center justify-center p-0">2</Badge>
                            <h3 className="font-semibold">Pilih Data Sektoral</h3>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="sektoral" className="flex items-center gap-2">
                              <Database className="w-4 h-4 text-muted-foreground" />
                              Data Sektoral <span className="text-red-500">*</span>
                            </Label>
                            <NativeSelect
                              id="sektoral"
                              value={formData.sektoral}
                              onChange={(e: any) => setFormData({...formData, sektoral: e.target.value})}
                              disabled={!formData.opdLama}
                            >
                              <NativeSelectOption value="">
                                {formData.opdLama ? 'Pilih Data Sektoral' : 'Pilih OPD Lama terlebih dahulu'}
                              </NativeSelectOption>
                              {listSektoral.map((sektoral) => (
                                <NativeSelectOption key={sektoral.id} value={String(sektoral.id)}>
                                  [{sektoral.kode_dssd}] {sektoral.uraian_dssd}
                                </NativeSelectOption>
                              ))}
                            </NativeSelect>
                            {formData.opdLama && listSektoral.length === 0 && (
                              <p className="text-xs text-muted-foreground">
                                Tidak ada data sektoral untuk OPD ini
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Step 3: Select OPD Baru */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 pb-2 border-b">
                            <Badge variant="default" className="rounded-full w-6 h-6 flex items-center justify-center p-0">3</Badge>
                            <h3 className="font-semibold">Pilih OPD Tujuan</h3>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="opdBaru" className="flex items-center gap-2">
                              <Building2 className="w-4 h-4 text-muted-foreground" />
                              OPD Baru (Tujuan Relokasi) <span className="text-red-500">*</span>
                            </Label>
                            <NativeSelect
                              id="opdBaru"
                              value={formData.opdBaru}
                              onChange={(e: any) => setFormData({...formData, opdBaru: e.target.value})}
                            >
                              <NativeSelectOption value="">Pilih OPD Baru</NativeSelectOption>
                              {listOpdBaru.map((opd) => (
                                <NativeSelectOption 
                                  key={opd.id_opd} 
                                  value={String(opd.id_opd)}
                                  disabled={String(opd.id_opd) === formData.opdLama}
                                >
                                  {opd.nama_opd}
                                </NativeSelectOption>
                              ))}
                            </NativeSelect>
                          </div>
                        </div>

                        {/* Preview Card */}
                        {formData.opdLama && formData.sektoral && formData.opdBaru && (
                          <Card className="bg-primary/5 border-primary/20">
                            <CardHeader>
                              <CardTitle className="text-base flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-primary" />
                                Preview Relokasi
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                  <Badge variant="secondary" className="flex-1 justify-start py-2">
                                    <Building2 className="w-3 h-3 mr-2" />
                                    {selectedOpdLama?.nama_opd}
                                  </Badge>
                                  <MoveRight className="w-5 h-5 text-primary flex-shrink-0" />
                                  <Badge variant="default" className="flex-1 justify-start py-2">
                                    <Building2 className="w-3 h-3 mr-2" />
                                    {selectedOpdBaru?.nama_opd}
                                  </Badge>
                                </div>
                                <div className="p-3 rounded-lg bg-background border">
                                  <p className="text-xs font-medium text-muted-foreground mb-1">Data yang akan dipindahkan:</p>
                                  <p className="text-sm font-semibold">
                                    [{selectedSektoral?.kode_dssd}] {selectedSektoral?.uraian_dssd}
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )}

                        {/* Submit Button */}
                        <div className="flex gap-3 pt-4 border-t">
                          <Button
                            onClick={handleSubmit}
                            disabled={loading || !formData.opdLama || !formData.sektoral || !formData.opdBaru}
                            className="flex-1 gap-2"
                          >
                            {loading ? (
                              <>
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                Memproses...
                              </>
                            ) : (
                              <>
                                <ArrowRightLeft className="w-4 h-4" />
                                Proses Relokasi
                              </>
                            )}
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              setFormData({
                                opdLama: "",
                                sektoral: "",
                                opdBaru: "",
                              });
                              setListSektoral([]);
                              setMessage(null);
                            }}
                          >
                            Reset
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Warning Card */}
              <Card className="border-2 border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20 dark:border-yellow-800">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2 text-yellow-800 dark:text-yellow-400">
                    <AlertCircle className="w-5 h-5" />
                    Perhatian
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-yellow-800 dark:text-yellow-400">
                    Proses relokasi akan memindahkan kepemilikan data sektoral dari OPD lama ke OPD baru. 
                    Pastikan Anda telah memilih OPD yang tepat sebelum melakukan relokasi.
                  </p>
                </CardContent>
              </Card>

            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}