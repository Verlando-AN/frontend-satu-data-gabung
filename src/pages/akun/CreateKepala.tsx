import { useState } from "react"
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
  UserPlus,
  Mail,
  User,
  Hash,
  CheckCircle2,
  AlertCircle,
  Info,
  Shield,
} from "lucide-react"

const API_URL =
  import.meta.env.VITE_API_URL || "https://api-satudata.lampungtimurkab.go.id"

export default function CreateKepala() {
  const [email, setEmail] = useState("")
  const [fullName, setFullName] = useState("")
  const [nip, setNip] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null)

  const handleSubmit = async () => {
    // Validation
    if (!email || !fullName || !nip) {
      setMessage({ type: 'error', text: 'Semua field harus diisi' })
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setMessage({ type: 'error', text: 'Format email tidak valid' })
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      const response = await fetch(
        `${API_URL}/strict/account/add-kepala-bidang`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            full_name: fullName,
            nip,
          }),
        }
      )

      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result?.message || 'Gagal membuat akun')
      }

      setMessage({ type: 'success', text: result?.message || 'Berhasil membuat akun Kepala Bidang' })
      
      // Reset form after success
      setTimeout(() => {
        setEmail("")
        setFullName("")
        setNip("")
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
                      <UserPlus className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold tracking-tight">Buat Akun Kepala Bidang</h1>
                      <p className="text-sm text-muted-foreground mt-1">
                        Tambahkan akun kepala bidang baru ke sistem
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
                      <Badge variant="default" className="mt-0.5">Kepala Bidang</Badge>
                      <p className="text-sm text-muted-foreground">
                        Akun dengan level akses kepala bidang memiliki hak untuk mengelola data sektoral 
                        dan melakukan monitoring pada bidang yang dipimpinnya.
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
                      <li>• Gunakan email resmi instansi untuk akun kepala bidang</li>
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

                        {/* Email */}
                        <div className="space-y-2">
                          <Label htmlFor="email" className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-muted-foreground" />
                            Email <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="contoh: kepala.bidang@instansi.go.id"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
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
                            value={nip}
                            onChange={(e) => setNip(e.target.value)}
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
                            setEmail("")
                            setFullName("")
                            setNip("")
                            setMessage(null)
                          }}
                          disabled={loading}
                        >
                          Reset
                        </Button>
                      </div>
                    </div>
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