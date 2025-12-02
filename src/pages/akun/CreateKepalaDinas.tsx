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
  Shield,
  Crown,
  Building2,
} from "lucide-react"

import { useCreateKepalaDinas } from "@/hooks/useCreateKepalaDinas";

const NativeSelect = ({ children, className = "", ...props }: any) => (
  <select
    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}
    {...props}
  >
    {children}
  </select>
)

const NativeSelectOption = ({ children, ...props }: any) => (
  <option {...props}>{children}</option>
)

export default function CreateKepalaDinas() {
  const {
    formData,
    listOpd,
    loading,
    loadingOpd,
    message,
    handleInputChange,
    handleSubmit,
    resetForm
  } = useCreateKepalaDinas();

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
                        Akun kepala dinas memiliki akses penuh untuk monitoring seluruh data sektoral dalam OPD yang dipimpinnya.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-xl">Form Data Akun</CardTitle>
                    <CardDescription>Isi semua informasi dengan data yang valid</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loadingOpd ? (
                      <div className="flex flex-col items-center gap-2 py-12">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                        <p className="text-sm text-muted-foreground">Memuat data...</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {message && (
                          <Alert variant={message.type === "error" ? "destructive" : "default"}>
                            {message.type === "success" ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                            <AlertDescription>{message.text}</AlertDescription>
                          </Alert>
                        )}

                        <div className="space-y-2">
                          <Label htmlFor="idOpd" className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-muted-foreground" />
                            Perangkat Daerah <span className="text-red-500">*</span>
                          </Label>
                          <NativeSelect
                            id="idOpd"
                            value={formData.idOpd}
                            onChange={(e: any) =>
                              handleInputChange("idOpd", e.target.value)
                            }
                          >
                            <NativeSelectOption value="">Pilih OPD yang dipimpin</NativeSelectOption>
                            {listOpd.map((opd) => (
                              <NativeSelectOption key={opd.id_opd} value={String(opd.id_opd)}>
                                {opd.nama_opd}
                              </NativeSelectOption>
                            ))}
                          </NativeSelect>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email" className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-muted-foreground" />
                            Email <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
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
                            value={formData.fullName}
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
                            value={formData.nip}
                            onChange={(e) => handleInputChange("nip", e.target.value)}
                          />
                        </div>

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
                                <Save className="w-4 h-4" /> Buat Akun
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
                    )}
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