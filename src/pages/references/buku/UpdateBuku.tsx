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
import { Loader2, Download, FileText } from "lucide-react";
import { useUpdateBuku } from "@/hooks/useUpdateBuku";

export default function UpdateBuku() {
  const {
    formData,
    newFile,
    oldFileUrl,
    loading,
    submitting,
    error,
    success,
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
                              href={oldFileUrl}
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