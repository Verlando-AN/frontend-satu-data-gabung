import React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
} from "lucide-react";
import { useCreateBuku } from "@/hooks/useCreateBuku";

const NativeSelect = ({
  children,
  className = "",
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select
    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}
    {...props}
  >
    {children}
  </select>
);

const NativeSelectOption = ({
  children,
  ...props
}: React.OptionHTMLAttributes<HTMLOptionElement>) => <option {...props}>{children}</option>;

export default function CreateBuku() {
  const {
    formData,
    listOpd,
    loading,
    loadingOpd,
    message,
    fileName,
    handleFileChange,
    handleInputChange,
    resetForm,
    handleSubmit
  } = useCreateBuku();

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
                    <li>• Judul buku harus jelas</li>
                    <li>• Pilih OPD yang sesuai</li>
                    <li>• Tahun harus valid</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-xl">Form Upload Buku</CardTitle>
                  <CardDescription>Isi informasi dan upload file PDF</CardDescription>
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
                          {message.type === "success" ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : (
                            <AlertCircle className="h-4 w-4" />
                          )}
                          <AlertDescription>{message.text}</AlertDescription>
                        </Alert>
                      )}

                      <div className="space-y-4">
                        <div className="flex items-center gap-2 pb-2 border-b">
                          <BookOpen className="w-5 h-5 text-primary" />
                          <h3 className="font-semibold">Informasi Buku</h3>
                        </div>

                        <div className="grid gap-4">

                          <div className="space-y-2">
                            <Label htmlFor="judulBuku" className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-muted-foreground" />
                              Judul Buku <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="judulBuku"
                              placeholder="Masukkan judul buku"
                              value={formData.judulBuku}
                              onChange={(e) =>
                                handleInputChange("judulBuku", e.target.value)
                              }
                            />
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="idOpd" className="flex items-center gap-2">
                                <Building2 className="w-4 h-4 text-muted-foreground" />
                                Perangkat Daerah <span className="text-red-500">*</span>
                              </Label>

                              <NativeSelect
                                id="idOpd"
                                value={formData.idOpd}
                                onChange={(e) =>
                                  handleInputChange("idOpd", e.target.value)
                                }
                              >
                                <NativeSelectOption value="">Pilih OPD</NativeSelectOption>
                                {listOpd.map((opd) => (
                                  <NativeSelectOption key={opd.id_opd} value={String(opd.id_opd)}>
                                    {opd.nama_opd}
                                  </NativeSelectOption>
                                ))}
                              </NativeSelect>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="tahun" className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-muted-foreground" />
                                Tahun Terbit <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                id="tahun"
                                type="number"
                                value={formData.tahun}
                                onChange={(e) =>
                                  handleInputChange("tahun", e.target.value)
                                }
                                min={2000}
                                max={new Date().getFullYear() + 1}
                              />
                            </div>
                          </div>

                        </div>
                      </div>

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
                            key={fileName ? "with-file" : "no-file"}
                          />

                          {fileName && (
                            <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
                              <FileText className="w-4 h-4 text-primary" />
                              <span className="text-sm font-medium">{fileName}</span>
                              <Badge variant="secondary" className="ml-auto">
                                PDF
                              </Badge>
                            </div>
                          )}

                          <p className="text-xs text-muted-foreground">
                            Format: PDF • Maksimal 10MB
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4 border-t">
                        <Button onClick={handleSubmit} disabled={loading} className="flex-1 gap-2">
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
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}