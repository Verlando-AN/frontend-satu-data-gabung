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
  BookOpen,
  FileText,
  Calendar,
  Building2,
  Upload,
  CheckCircle2,
  AlertCircle,
  Info,
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

export default function CreateBuku() {
  const [formData, setFormData] = useState({
    judulBuku: "",
    idOpd: "",
    tahun: "",
    file: null as File | null,
  });

  const [listOpd, setListOpd] = useState<OPD[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingOpd, setLoadingOpd] = useState(true);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
  const [fileName, setFileName] = useState("");

  // Fetch OPD list
  const fetchOPD = async () => {
    try {
      setLoadingOpd(true);
      const response = await fetch(`${API_URL}/strict/ref-data/list-opd`, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      if (!response.ok) throw new Error("Gagal mengambil data OPD");

      const result = await response.json();
      const finalData = result?.data ?? result?.hasil ?? result?.result ?? (Array.isArray(result) ? result : []);
      
      setListOpd(finalData || []);
    } catch (error) {
      console.error("Error fetching OPD:", error);
      setMessage({ type: 'error', text: 'Gagal memuat data OPD' });
    } finally {
      setLoadingOpd(false);
    }
  };

  useEffect(() => {
    fetchOPD();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type (PDF only)
      if (file.type !== 'application/pdf') {
        setMessage({ type: 'error', text: 'File harus berformat PDF' });
        e.target.value = '';
        return;
      }
      
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setMessage({ type: 'error', text: 'Ukuran file maksimal 10MB' });
        e.target.value = '';
        return;
      }
      
      setFormData({...formData, file});
      setFileName(file.name);
      setMessage(null);
    }
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.judulBuku || !formData.idOpd || !formData.tahun || !formData.file) {
      setMessage({ type: 'error', text: 'Semua field harus diisi' });
      return;
    }

    // Validate year
    const currentYear = new Date().getFullYear();
    const inputYear = parseInt(formData.tahun);
    if (isNaN(inputYear) || inputYear < 2000 || inputYear > currentYear + 1) {
      setMessage({ type: 'error', text: `Tahun harus antara 2000 - ${currentYear + 1}` });
      return;
    }

    try {
      setLoading(true);
      setMessage(null);

      // Create FormData for file upload
      const uploadData = new FormData();
      uploadData.append('buku', formData.judulBuku);
      uploadData.append('id_opd', formData.idOpd);
      uploadData.append('tahun', formData.tahun);
      uploadData.append('file', formData.file);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setMessage({ type: 'success', text: 'Buku digital berhasil ditambahkan!' });
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          judulBuku: "",
          idOpd: "",
          tahun: "",
          file: null,
        });
        setFileName("");
        setMessage(null);
      }, 3000);
      
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Terjadi kesalahan' });
    } finally {
      setLoading(false);
    }
  };

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
                      <BookOpen className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold tracking-tight">Tambah Buku Digital</h1>
                      <p className="text-sm text-muted-foreground mt-1">
                        Upload dan kelola buku digital baru
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
                    Petunjuk Upload Buku
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• File harus berformat PDF dengan ukuran maksimal 10MB</li>
                    <li>• Judul buku harus jelas dan sesuai dengan isi dokumen</li>
                    <li>• Pilih OPD yang sesuai dengan buku yang akan diupload</li>
                    <li>• Tahun harus sesuai dengan tahun terbit buku</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Form Card */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-xl">Form Upload Buku</CardTitle>
                  <CardDescription>
                    Isi semua informasi dengan lengkap dan upload file PDF
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loadingOpd ? (
                    <div className="flex flex-col items-center gap-2 py-12">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                      <p className="text-sm text-muted-foreground">Memuat data...</p>
                    </div>
                  ) : (
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

                      {/* Section: Informasi Buku */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 pb-2 border-b">
                          <BookOpen className="w-5 h-5 text-primary" />
                          <h3 className="font-semibold">Informasi Buku</h3>
                        </div>

                        <div className="grid gap-4">
                          {/* Judul Buku */}
                          <div className="space-y-2">
                            <Label htmlFor="judulBuku" className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-muted-foreground" />
                              Judul Buku <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="judulBuku"
                              placeholder="Masukkan judul buku digital"
                              value={formData.judulBuku}
                              onChange={(e) => setFormData({...formData, judulBuku: e.target.value})}
                            />
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            {/* OPD */}
                            <div className="space-y-2">
                              <Label htmlFor="idOpd" className="flex items-center gap-2">
                                <Building2 className="w-4 h-4 text-muted-foreground" />
                                Perangkat Daerah <span className="text-red-500">*</span>
                              </Label>
                              <NativeSelect
                                id="idOpd"
                                value={formData.idOpd}
                                onChange={(e: any) => setFormData({...formData, idOpd: e.target.value})}
                              >
                                <NativeSelectOption value="">Pilih OPD</NativeSelectOption>
                                {listOpd.map((opd) => (
                                  <NativeSelectOption key={opd.id_opd} value={String(opd.id_opd)}>
                                    {opd.nama_opd}
                                  </NativeSelectOption>
                                ))}
                              </NativeSelect>
                            </div>

                            {/* Tahun */}
                            <div className="space-y-2">
                              <Label htmlFor="tahun" className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-muted-foreground" />
                                Tahun Terbit <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                id="tahun"
                                type="number"
                                placeholder={`Contoh: ${new Date().getFullYear()}`}
                                value={formData.tahun}
                                onChange={(e) => setFormData({...formData, tahun: e.target.value})}
                                min="2000"
                                max={new Date().getFullYear() + 1}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Section: Upload File */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 pb-2 border-b">
                          <Upload className="w-5 h-5 text-primary" />
                          <h3 className="font-semibold">Upload File</h3>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="file" className="flex items-center gap-2">
                            <Upload className="w-4 h-4 text-muted-foreground" />
                            File PDF <span className="text-red-500">*</span>
                          </Label>
                          <Input 
                            id="file" 
                            type="file" 
                            accept=".pdf"
                            onChange={handleFileChange}
                            className="cursor-pointer"
                          />
                          {fileName && (
                            <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
                              <FileText className="w-4 h-4 text-primary" />
                              <span className="text-sm font-medium">{fileName}</span>
                              <Badge variant="secondary" className="ml-auto">PDF</Badge>
                            </div>
                          )}
                          <p className="text-xs text-muted-foreground">
                            Format: PDF | Maksimal: 10MB
                          </p>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div className="flex gap-3 pt-4 border-t">
                        <Button
                          onClick={handleSubmit}
                          disabled={loading}
                          className="flex-1 gap-2"
                        >
                          {loading ? (
                            <>
                              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                              Mengupload...
                            </>
                          ) : (
                            <>
                              <Save className="w-4 h-4" />
                              Upload Buku
                            </>
                          )}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setFormData({
                              judulBuku: "",
                              idOpd: "",
                              tahun: "",
                              file: null,
                            });
                            setFileName("");
                            setMessage(null);
                          }}
                          disabled={loading}
                        >
                          Reset
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Help Card */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-base">Format & Panduan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p className="font-medium text-foreground">Panduan Penamaan File:</p>
                    <ul className="space-y-1 ml-4">
                      <li>• Gunakan nama file yang deskriptif</li>
                      <li>• Hindari karakter khusus dalam nama file</li>
                      <li>• Pastikan file tidak terproteksi password</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}