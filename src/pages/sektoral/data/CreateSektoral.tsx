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
  AlertCircle,
  Ruler,
  CheckCircle2,
} from "lucide-react"

import { useCreateSektoral } from "@/hooks/useCreateSektoral";

const NativeSelect = ({ children, className = "", ...props }: any) => (
  <select
    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm
    ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}
    {...props}
  >
    {children}
  </select>
)

const NativeSelectOption = ({ children, ...props }: any) => (
  <option {...props}>{children}</option>
)

export default function CreateSektoral() {
  const {
    formData,
    loading,
    message,
    handleInputChange,
    handleSubmit,
    resetForm
  } = useCreateSektoral();

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

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Kembali
                  </Button>
                </div>
              </div>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-xl">Form Input Data</CardTitle>
                  <CardDescription>
                    Isi semua informasi dengan lengkap dan akurat
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-6">

                    {message && (
                      <Alert
                        variant={
                          message.type === "error" ? "destructive" : "default"
                        }
                      >
                        {message.type === "success" ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <AlertCircle className="h-4 w-4" />
                        )}
                        <AlertDescription>{message.text}</AlertDescription>
                      </Alert>
                    )}

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Hash className="w-4 h-4 text-muted-foreground" />
                        Kode Urusan <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        placeholder="Contoh: 1.01"
                        value={formData.kodeUrusan}
                        onChange={(e) =>
                          handleInputChange("kodeUrusan", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        Jenis <span className="text-red-500">*</span>
                      </Label>
                      <NativeSelect
                        value={formData.jenis}
                        onChange={(e: { target: { value: string } }) =>
                          handleInputChange("jenis", e.target.value)
                        }
                      >
                        <NativeSelectOption value="">Pilih jenis</NativeSelectOption>
                        <NativeSelectOption value="1">Data Teknis</NativeSelectOption>
                        <NativeSelectOption value="2">Data Manajemen</NativeSelectOption>
                      </NativeSelect>
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        Kategori <span className="text-red-500">*</span>
                      </Label>
                      <NativeSelect
                        value={formData.kategori}
                        onChange={(e: { target: { value: string } }) =>
                          handleInputChange("kategori", e.target.value)
                        }
                      >
                        <NativeSelectOption value="">Pilih kategori</NativeSelectOption>
                        <NativeSelectOption value="1">Sosial</NativeSelectOption>
                        <NativeSelectOption value="2">Ekonomi</NativeSelectOption>
                        <NativeSelectOption value="3">Infrastruktur</NativeSelectOption>
                        <NativeSelectOption value="4">Pemerintahan</NativeSelectOption>
                      </NativeSelect>
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Hash className="w-4 h-4 text-muted-foreground" />
                        Kode DSSD <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        placeholder="1.01.000000"
                        value={formData.kodeDssd}
                        onChange={(e) =>
                          handleInputChange("kodeDssd", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        Uraian DSSD <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        placeholder="Jumlah Siswa Sekolah Dasar..."
                        value={formData.uraianDssd}
                        onChange={(e) =>
                          handleInputChange("uraianDssd", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Ruler className="w-4 h-4 text-muted-foreground" />
                        Satuan <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        placeholder="Contoh: Orang"
                        value={formData.satuan}
                        onChange={(e) =>
                          handleInputChange("satuan", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Ruler className="w-4 h-4 text-muted-foreground" />
                        Dimensi (Opsional)
                      </Label>

                      <NativeSelect
                        value={formData.dimensi}
                        onChange={(e: { target: { value: string } }) =>
                          handleInputChange("dimensi", e.target.value)
                        }
                      >
                        <NativeSelectOption value="">Pilih dimensi</NativeSelectOption>
                        <NativeSelectOption value="Tahun">Tahun</NativeSelectOption>
                        <NativeSelectOption value="Bulan">Bulan</NativeSelectOption>
                        <NativeSelectOption value="Wilayah">Wilayah</NativeSelectOption>
                      </NativeSelect>
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
                        onClick={resetForm}
                        disabled={loading}
                      >
                        Reset
                      </Button>
                    </div>

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