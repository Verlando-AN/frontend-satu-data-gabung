import React from "react";
import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Download, BookOpen, FileText } from "lucide-react";
import { useUpdateBuku } from "@/hooks/useUpdateBuku";
import { Textarea } from "@/components/ui/textarea";

export default function UpdateBuku() {
  const {
    formData,
    newFile,
    oldFileUrl,
    loading,
    submitting,
    error,
    success,
    handleTagChange,
    handleInputChange,
    handleFileChange,
    handleSubmit,
    resetMessages
  } = useUpdateBuku();

  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />

        <div className="flex flex-1">
          <AppSidebar />

          <SidebarInset>
            <div className="flex flex-1 flex-col gap-6 p-6 bg-muted/30">
              {loading ? (
                <div className="flex items-center justify-center min-h-[400px]">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <Card className="w-full max-w-3xl mx-auto">
                  <CardHeader>
                    <CardTitle>Edit Buku Digital</CardTitle>
                    <CardDescription>
                      Perbarui informasi buku digital. Kosongkan file jika tidak ingin mengubah file.
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-4">
                      {error && (
                        <Alert variant="destructive">
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      )}

                      {success && (
                        <Alert className="bg-green-50 text-green-900 border-green-200">
                          <AlertDescription>{success}</AlertDescription>
                        </Alert>
                      )}

                      <div className="space-y-2">
                        <Label htmlFor="id_opd">ID OPD</Label>
                        <Input
                          id="id_opd"
                          type="number"
                          placeholder="Masukkan ID OPD"
                          value={formData.id_opd}
                          onChange={(e) => {
                            resetMessages();
                            handleInputChange("id_opd", e.target.value);
                          }}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="tahun">Tahun</Label>
                        <Input
                          id="tahun"
                          type="number"
                          placeholder="Contoh: 2024"
                          value={formData.tahun}
                          onChange={(e) => {
                            resetMessages();
                            handleInputChange("tahun", e.target.value);
                          }}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="buku">Nama Buku</Label>
                        <Input
                          id="buku"
                          type="text"
                          placeholder="Masukkan nama buku"
                          value={formData.buku}
                          onChange={(e) => {
                            resetMessages();
                            handleInputChange("buku", e.target.value);
                          }}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="deskripsi">Deskripsi</Label>
                        <Textarea
                          id="deskripsi"
                          placeholder="Masukkan deskripsi buku"
                          value={formData.deskripsi}
                          onChange={(e) => {
                            resetMessages();
                            handleInputChange("deskripsi", e.target.value);
                          }}
                          rows={4}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-muted-foreground" />
                          Tag <span className="text-red-500">*</span>
                        </Label>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 border rounded-md p-3 max-h-64 overflow-y-auto">
                          {[
                            { id: "1", nama: "Pendidikan" },
                            { id: "2", nama: "Statistik" },
                            { id: "3", nama: "Ekonomi" },
                            { id: "4", nama: "Kesehatan" },
                            { id: "5", nama: "Pertanian" },
                            { id: "6", nama: "Perikanan" },
                            { id: "7", nama: "Peternakan" },
                            { id: "8", nama: "Pariwisata" },
                            { id: "9", nama: "Lingkungan Hidup" },
                            { id: "10", nama: "Kependudukan" },
                            { id: "11", nama: "Infrastruktur" },
                            { id: "12", nama: "Transportasi" },
                            { id: "13", nama: "Industri" },
                            { id: "14", nama: "Perdagangan" },
                            { id: "15", nama: "Ketenagakerjaan" },
                            { id: "16", nama: "Kemiskinan" },
                            { id: "17", nama: "Sosial" },
                            { id: "18", nama: "Keuangan Daerah" },
                            { id: "19", nama: "Pemerintahan" },
                            { id: "20", nama: "Teknologi Informasi" },
                            { id: "21", nama: "Komunikasi" },
                            { id: "22", nama: "Energi" },
                            { id: "23", nama: "Perumahan" },
                            { id: "24", nama: "Gender" },
                            { id: "25", nama: "Anak" },
                            { id: "26", nama: "Kebudayaan" },
                            { id: "27", nama: "Olahraga" },
                            { id: "28", nama: "Bencana" },
                            { id: "29", nama: "Pangan" },
                            { id: "30", nama: "Investasi" },
                          ].map((tag) => (
                            <label
                              key={tag.id}
                              className="flex items-center gap-2 text-sm"
                            >
                              <input
                                type="checkbox"
                                checked={formData.tag_ids.includes(tag.id)}
                                onChange={() => handleTagChange(tag.id)}
                              />
                              {tag.nama}
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="file">File Buku (PDF)</Label>
                        <Input
                          id="file"
                          type="file"
                          accept=".pdf"
                          onChange={(e) => {
                            resetMessages();
                            handleFileChange(e.target.files?.[0] || null);
                          }}
                        />

                        {oldFileUrl && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2 p-3 bg-muted rounded-md">
                          <FileText className="h-4 w-4 flex-shrink-0" />
                          <span>File saat ini:</span>
                          <a
                            href={oldFileUrl
                              .replace("/handler/http", "")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline inline-flex items-center gap-1"
                          >
                            <Download className="h-3 w-3" />
                            Download
                          </a>
                        </div>
                      )}

                        {newFile && (
                          <p className="text-sm text-green-600 font-medium">
                            ✓ File baru dipilih: {newFile.name}
                          </p>
                        )}
                      </div>

                      <div className="pt-4">
                        <Button
                          className="w-full"
                          disabled={submitting}
                          onClick={handleSubmit}
                        >
                          {submitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Menyimpan...
                            </>
                          ) : (
                            "Simpan Perubahan"
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}