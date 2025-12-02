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
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Save,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Shield,
} from "lucide-react"

import { useEditKepalaDinas } from "@/hooks/useEditKepalaDinas";

export default function EditKepalaDinas() {
  const {
    userId,
    form,
    loading,
    loadingFetch,
    message,
    handleInputChange,
    handleSubmit,
    goBack
  } = useEditKepalaDinas();

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
                      <Shield className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold tracking-tight">
                        Edit Akun Kepala Dinas
                      </h1>
                      <p className="text-sm text-muted-foreground mt-1">
                        Perbarui informasi akun Kepala Dinas
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        ID: {userId}
                      </p>
                    </div>
                  </div>
                </div>

                <Button variant="outline" size="sm" className="gap-2" onClick={goBack}>
                  <ArrowLeft className="w-4 h-4" />
                  Kembali
                </Button>
              </div>

              <div className="max-w-2xl mx-auto w-full space-y-6">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-xl">Form Edit Akun</CardTitle>
                    <CardDescription>
                      Perbarui informasi dengan data yang valid
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">

                      {message && (
                        <Alert variant={message.type === "error" ? "destructive" : "default"}>
                          {message.type === "success"
                            ? <CheckCircle2 className="h-4 w-4" />
                            : <AlertCircle className="h-4 w-4" />}
                          <AlertDescription>{message.text}</AlertDescription>
                        </Alert>
                      )}

                      {loadingFetch ? (
                        <div className="flex justify-center py-8">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        </div>
                      ) : (
                        <>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input 
                              id="email"
                              type="email"
                              value={form.email} 
                              onChange={(e) => handleInputChange("email", e.target.value)} 
                              placeholder="Masukkan email"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="fullName">Nama Lengkap</Label>
                            <Input 
                              id="fullName"
                              value={form.fullName} 
                              onChange={(e) => handleInputChange("fullName", e.target.value)} 
                              placeholder="Masukkan nama lengkap"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="nip">NIP</Label>
                            <Input 
                              id="nip"
                              value={form.nip} 
                              onChange={(e) => handleInputChange("nip", e.target.value)} 
                              placeholder="Masukkan NIP"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="opd">ID OPD</Label>
                            <Input
                              id="opd"
                              type="number"
                              value={form.opd}
                              onChange={(e) => handleInputChange("opd", e.target.value ? Number(e.target.value) : "")}
                              placeholder="Masukkan ID OPD"
                              disabled 
                            />
                            <p className="text-xs text-muted-foreground">ID OPD tidak dapat diubah</p>
                          </div>

                          <Button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full gap-2 mt-4"
                          >
                            {loading ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                Menyimpan...
                              </>
                            ) : (
                              <>
                                <Save className="w-4 h-4" />
                                Update Akun
                              </>
                            )}
                          </Button>
                        </>
                      )}

                    </div>
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