import { useState, useEffect } from "react"
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
  Mail,
  User,
  Hash,
  CheckCircle2,
  AlertCircle,
  Info,
  Shield,
  Crown,
  Building2,
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

export default function CreateKepalaDinas() {
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    nip: "",
    idOpd: "",
  });
  
  const [listOpd, setListOpd] = useState<OPD[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingOpd, setLoadingOpd] = useState(true);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

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

  const handleSubmit = async () => {
    // Validation
    if (!formData.email || !formData.fullName || !formData.nip || !formData.idOpd) {
      setMessage({ type: 'error', text: 'Semua field harus diisi' })
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setMessage({ type: 'error', text: 'Format email tidak valid' })
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      const response = await fetch(
        `${API_URL}/strict/account/add-kepala-dinas`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
          },
          body: JSON.stringify({
            email: formData.email,
            full_name: formData.fullName,
            nip: formData.nip,
            id_opd: formData.idOpd,
          }),
        }
      )

      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result?.message || 'Gagal membuat akun')
      }

      setMessage({ type: 'success', text: result?.message || 'Berhasil membuat akun Kepala Dinas' })
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          email: "",
          fullName: "",
          nip: "",
          idOpd: "",
        });
        setMessage(null)
      }, 3000)
      
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Gagal mengirim data' })
    } finally {
      setLoading(false)
    }
  }

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
                      <Crown className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold tracking-tight">Buat Akun Kepala Dinas</h1>
                      <p className="text-sm text-muted-foreground mt-1">
                        Tambahkan akun kepala dinas baru ke sistem
                      </p>
                    </div>
                  </div>
                </div>

                <Button variant="outline" size="sm" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Kembali
                </Button>
              </div>

              <div className="max-w-2xl mx-auto w-full space-y-6">
                {/* Role Info Card */}
                <Card className="border-2 bg-blue-50 dark:bg-blue-950/20">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      Informasi Level Akses
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-3">
                      <Badge variant="default" className="mt-0.5 gap-1">
                        <Crown className="w-3 h-3" />
                        Kepala Dinas
                      </Badge>
                      <p className="text-sm text-muted-foreground">
                        Akun kepala dinas memiliki akses penuh untuk monitoring seluruh data sektoral 
                        dalam OPD yang dipimpinnya serta dapat melihat laporan dan statistik lengkap.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Instructions Card */}
                <Card className="border-2 bg-primary/5">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Info className="w-5 h-5 text-primary" />
                      Petunjuk Pembuatan Akun
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Gunakan email resmi instansi untuk akun kepala dinas</li>
                      <li>• Pilih OPD yang akan dipimpin oleh kepala dinas ini</li>
                      <li>• Pastikan NIP yang dimasukkan valid dan sesuai dengan data kepegawaian</li>
                      <li>• Nama lengkap harus sesuai dengan identitas resmi</li>
                      <li>• Password akan dikirimkan ke email yang didaftarkan</li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Form Card */}
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-xl">Form Data Akun</CardTitle>
                    <CardDescription>
                      Isi semua informasi dengan data yang valid
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

                        {/* Form Fields */}
                        <div className="space-y-4">
                          {/* Section Header */}
                          <div className="flex items-center gap-2 pb-2 border-b">
                            <User className="w-5 h-5 text-primary" />
                            <h3 className="font-semibold">Data Pengguna</h3>
                          </div>

                          {/* OPD Selection */}
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
                              <NativeSelectOption value="">Pilih OPD yang dipimpin</NativeSelectOption>
                              {listOpd.map((opd) => (
                                <NativeSelectOption key={opd.id_opd} value={String(opd.id_opd)}>
                                  {opd.nama_opd}
                                </NativeSelectOption>
                              ))}
                            </NativeSelect>
                            <p className="text-xs text-muted-foreground">
                              Pilih OPD yang akan dipimpin oleh kepala dinas ini
                            </p>
                          </div>

                          {/* Email */}
                          <div className="space-y-2">
                            <Label htmlFor="email" className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-muted-foreground" />
                              Email <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="contoh: kepala.dinas@instansi.go.id"
                              value={formData.email}
                              onChange={(e) => setFormData({...formData, email: e.target.value})}
                              className="pl-4"
                            />
                            <p className="text-xs text-muted-foreground">
                              Gunakan email resmi instansi
                            </p>
                          </div>

                          {/* Full Name */}
                          <div className="space-y-2">
                            <Label htmlFor="fullName" className="flex items-center gap-2">
                              <User className="w-4 h-4 text-muted-foreground" />
                              Nama Lengkap <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="fullName"
                              placeholder="Masukkan nama lengkap sesuai identitas"
                              value={formData.fullName}
                              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                              className="pl-4"
                            />
                          </div>

                          {/* NIP */}
                          <div className="space-y-2">
                            <Label htmlFor="nip" className="flex items-center gap-2">
                              <Hash className="w-4 h-4 text-muted-foreground" />
                              NIP <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="nip"
                              placeholder="Masukkan Nomor Induk Pegawai"
                              value={formData.nip}
                              onChange={(e) => setFormData({...formData, nip: e.target.value})}
                              className="pl-4"
                            />
                            <p className="text-xs text-muted-foreground">
                              18 digit Nomor Induk Pegawai
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
                                Membuat Akun...
                              </>
                            ) : (
                              <>
                                <Save className="w-4 h-4" />
                                Buat Akun
                              </>
                            )}
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              setFormData({
                                email: "",
                                fullName: "",
                                nip: "",
                                idOpd: "",
                              });
                              setMessage(null)
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

                {/* Security Notice Card */}
                <Card className="border-2 border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20 dark:border-yellow-800">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2 text-yellow-800 dark:text-yellow-400">
                      <AlertCircle className="w-5 h-5" />
                      Keamanan Akun
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-yellow-800 dark:text-yellow-400">
                      Setelah akun berhasil dibuat, password sementara akan dikirim ke email yang didaftarkan. 
                      Pengguna diminta untuk segera mengganti password saat pertama kali login.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}