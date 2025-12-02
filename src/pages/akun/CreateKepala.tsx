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

import { useCreateKepala } from "@/hooks/useCreateKepala";

export default function CreateKepala() {
  const {
    form,
    loading,
    message,
    handleInputChange,
    handleSubmit,
    resetForm
  } = useCreateKepala();

  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />

        <div className="flex flex-1">
          <AppSidebar />

          <SidebarInset>
            <div className="flex flex-col flex-1 gap-6 p-6 bg-muted/30">

              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <UserPlus className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold tracking-tight">
                        Buat Akun Kepala Bidang
                      </h1>
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

                <Card className="border-2 bg-blue-50 dark:bg-blue-950/20">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      Informasi Level Akses
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-3">
                      <Badge variant="default" className="mt-0.5">
                        Kepala Bidang
                      </Badge>
                      <p className="text-sm text-muted-foreground">
                        Hak akses penuh data sektoral pada bidang terkait.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 bg-primary/5">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Info className="w-5 h-5 text-primary" />
                      Petunjuk Pembuatan Akun
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Gunakan email resmi instansi</li>
                      <li>• Pastikan NIP valid</li>
                      <li>• Nama sesuai identitas resmi</li>
                      <li>• Password dikirim otomatis ke email</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-xl">Form Data Akun</CardTitle>
                    <CardDescription>
                      Isi semua informasi dengan data yang valid
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-6">

                      {message && (
                        <Alert variant={message.type === "error" ? "destructive" : "default"}>
                          {message.type === "success" ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : (
                            <AlertCircle className="h-4 w-4" />
                          )}
                          <AlertDescription>{message.text}</AlertDescription>
                        </Alert>
                      )}

                      <div className="space-y-4">

                        <div className="space-y-2">
                          <Label htmlFor="email" className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-muted-foreground" />
                            Email <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="email"
                            value={form.email}
                            type="email"
                            placeholder="contoh: kepala.bidang@instansi.go.id"
                            onChange={(e) => handleInputChange("email", e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="fullName" className="flex items-center gap-2">
                            <User className="w-4 h-4 text-muted-foreground" />
                            Nama Lengkap <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="fullName"
                            value={form.fullName}
                            placeholder="Masukkan nama lengkap"
                            onChange={(e) => handleInputChange("fullName", e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="nip" className="flex items-center gap-2">
                            <Hash className="w-4 h-4 text-muted-foreground" />
                            NIP <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="nip"
                            value={form.nip}
                            placeholder="Masukkan NIP (18 digit)"
                            onChange={(e) => handleInputChange("nip", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4 border-t">
                        <Button onClick={handleSubmit} disabled={loading} className="flex-1 gap-2">
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
                          onClick={resetForm}
                          disabled={loading}
                        >
                          Reset
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2 text-yellow-800">
                      <AlertCircle className="w-5 h-5" />
                      Keamanan Akun
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-yellow-800">
                      Password sementara dikirim otomatis ke email yang didaftarkan.
                      Ganti password pada login pertama.
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