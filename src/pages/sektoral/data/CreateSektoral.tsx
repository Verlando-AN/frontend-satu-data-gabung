import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { 
  Alert, 
  AlertDescription 
} from "@/components/ui/alert"
import {
  Save,
  ArrowLeft,
  Database,
  FileText,
  Hash,
  Layers,
  Tag,
  CheckCircle2,
  AlertCircle,
  Ruler,
  Box,
} from "lucide-react"

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

export default function CreateSektoral() {
  const [formData, setFormData] = useState({
    kodeUrusan: "",
    jenis: "",
    kategori: "",
    kodeDssd: "",
    uraianDssd: "",
    satuan: "",
    dimensi: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  const handleSubmit = async () => {
    
    // Validation
    if (!formData.kodeUrusan || !formData.jenis || !formData.kategori || !formData.kodeDssd || !formData.uraianDssd || !formData.satuan) {
      setMessage({ type: 'error', text: 'Semua field wajib diisi kecuali dimensi' });
      return;
    }

    try {
      setLoading(true);
      setMessage(null);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setMessage({ type: 'success', text: 'Data sektoral berhasil disimpan!' });
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          kodeUrusan: "",
          jenis: "",
          kategori: "",
          kodeDssd: "",
          uraianDssd: "",
          satuan: "",
          dimensi: "",
        });
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
                      <Database className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold tracking-tight">Input Data Sektoral</h1>
                      <p className="text-sm text-muted-foreground mt-1">
                        Tambahkan data sektoral baru ke sistem
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
              <Card className="border-2 bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-primary" />
                    Petunjuk Pengisian
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Pastikan semua field yang bertanda (*) diisi dengan benar</li>
                    <li>• Kode DSSD harus mengikuti format standar (contoh: 1.01.000000)</li>
                    <li>• Pilih jenis dan kategori data yang sesuai</li>
                    <li>• Uraian DSSD harus jelas dan deskriptif</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Form Card */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-xl">Form Input Data</CardTitle>
                  <CardDescription>
                    Isi semua informasi dengan lengkap dan akurat
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

                    {/* Section 1: Kode & Kategori */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 pb-2 border-b">
                        <Hash className="w-5 h-5 text-primary" />
                        <h3 className="font-semibold">Informasi Kode & Kategori</h3>
                      </div>

                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="kodeUrusan" className="flex items-center gap-2">
                            <Hash className="w-4 h-4 text-muted-foreground" />
                            Kode Urusan <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="kodeUrusan"
                            placeholder="Contoh: 1.01"
                            value={formData.kodeUrusan}
                            onChange={(e) => setFormData({...formData, kodeUrusan: e.target.value})}
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="jenis" className="flex items-center gap-2">
                              <Layers className="w-4 h-4 text-muted-foreground" />
                              Jenis Data <span className="text-red-500">*</span>
                            </Label>
                            <NativeSelect
                              id="jenis"
                              value={formData.jenis}
                              onChange={(e: any) => setFormData({...formData, jenis: e.target.value})}
                            >
                              <NativeSelectOption value="">Pilih jenis data</NativeSelectOption>
                              <NativeSelectOption value="1">Data Teknis</NativeSelectOption>
                              <NativeSelectOption value="2">Data Manajemen Kepemerintahan</NativeSelectOption>
                            </NativeSelect>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="kategori" className="flex items-center gap-2">
                              <Tag className="w-4 h-4 text-muted-foreground" />
                              Kategori <span className="text-red-500">*</span>
                            </Label>
                            <NativeSelect
                              id="kategori"
                              value={formData.kategori}
                              onChange={(e: any) => setFormData({...formData, kategori: e.target.value})}
                            >
                              <NativeSelectOption value="">Pilih kategori</NativeSelectOption>
                              <NativeSelectOption value="sosial">Sosial & Kesejahteraan Masyarakat</NativeSelectOption>
                              <NativeSelectOption value="ekonomi">Ekonomi & Perdagangan</NativeSelectOption>
                              <NativeSelectOption value="infrastruktur">Infrastruktur & Prasarana</NativeSelectOption>
                              <NativeSelectOption value="pemerintahan">Pemerintahan & Politik</NativeSelectOption>
                            </NativeSelect>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Section 2: Detail DSSD */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 pb-2 border-b">
                        <FileText className="w-5 h-5 text-primary" />
                        <h3 className="font-semibold">Detail DSSD</h3>
                      </div>

                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="kodeDssd" className="flex items-center gap-2">
                            <Hash className="w-4 h-4 text-muted-foreground" />
                            Kode DSSD <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="kodeDssd"
                            placeholder="Contoh: 1.01.000000"
                            value={formData.kodeDssd}
                            onChange={(e) => setFormData({...formData, kodeDssd: e.target.value})}
                          />
                          <p className="text-xs text-muted-foreground">
                            Format: [Urusan].[Bidang].[Kode Unik]
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="uraianDssd" className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-muted-foreground" />
                            Uraian DSSD <span className="text-red-500">*</span>
                          </Label>
                          <Textarea
                            id="uraianDssd"
                            placeholder="Jelaskan detail uraian data sektoral dengan jelas dan lengkap..."
                            className="resize-none min-h-[100px]"
                            value={formData.uraianDssd}
                            onChange={(e) => setFormData({...formData, uraianDssd: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Section 3: Satuan & Dimensi */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 pb-2 border-b">
                        <Ruler className="w-5 h-5 text-primary" />
                        <h3 className="font-semibold">Satuan & Dimensi</h3>
                      </div>

                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="satuan" className="flex items-center gap-2">
                            <Ruler className="w-4 h-4 text-muted-foreground" />
                            Satuan <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="satuan"
                            placeholder="Contoh: Unit, Orang, Meter, Rupiah"
                            value={formData.satuan}
                            onChange={(e) => setFormData({...formData, satuan: e.target.value})}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="dimensi" className="flex items-center gap-2">
                            <Box className="w-4 h-4 text-muted-foreground" />
                            Dimensi
                          </Label>
                          <Textarea
                            id="dimensi"
                            placeholder="Opsional: Contoh - Tahun, Lokasi, Jenis Kelamin, dll."
                            className="resize-none"
                            value={formData.dimensi}
                            onChange={(e) => setFormData({...formData, dimensi: e.target.value})}
                          />
                          <p className="text-xs text-muted-foreground">
                            Field ini bersifat opsional
                          </p>
                        </div>
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
                            Menyimpan...
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4" />
                            Simpan Data
                          </>
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setFormData({
                            kodeUrusan: "",
                            jenis: "",
                            kategori: "",
                            kodeDssd: "",
                            uraianDssd: "",
                            satuan: "",
                            dimensi: "",
                          });
                          setMessage(null);
                        }}
                      >
                        Reset
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Help Card */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-base">Butuh Bantuan?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Jika mengalami kesulitan dalam pengisian form, silakan hubungi admin sistem atau rujuk ke dokumentasi pengisian data sektoral.
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