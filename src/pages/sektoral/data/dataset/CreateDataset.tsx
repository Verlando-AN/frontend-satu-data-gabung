import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

import { 
  CheckCircle2, AlertCircle, Upload, FileText, Hash,
  User, Mail, Building, Calendar, Tag, Palette 
} from "lucide-react"

import { useCreateDataset } from "@/hooks/useCreateDataset"
import { Editor } from "@tinymce/tinymce-react"

const TINYMCE_KEY = import.meta.env.VITE_TINYMCE_API_KEY;

export default function CreateDataset() {
  const {
    id,
    file,
    form,
    loading,
    message,
    handleInputChange,
    handleFileChange,
    handleSubmit,
    resetForm
  } = useCreateDataset()

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
                      <Upload className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold tracking-tight">Tambah Dataset</h1>
                      <p className="text-sm text-muted-foreground mt-1">
                        Upload dataset baru untuk data sektoral
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Form Dataset</CardTitle>
                  <CardDescription>Isi informasi dataset dan upload file</CardDescription>
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

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Hash className="w-4 h-4 text-muted-foreground" />
                        ID Ref Sektoral <span className="text-red-500">*</span>
                      </Label>
                      <Input value={id} disabled className="bg-muted" />
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Upload className="w-4 h-4 text-muted-foreground" />
                        File Dataset (PDF) <span className="text-red-500">*</span>
                      </Label>
                      <Input 
                        type="file" 
                        accept=".pdf" 
                        onChange={(e) => handleFileChange(e.target.files?.[0] || null)} 
                      />
                      {file && <p className="text-sm text-green-600 font-medium">
                        ✓ File dipilih: {file.name}
                      </p>}
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        Judul/Konsep Dataset <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        value={form.title_dataset}
                        onChange={(e) => handleInputChange("title_dataset", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        Definisi Dataset <span className="text-red-500">*</span>
                      </Label>

                      <Editor
                        apiKey={TINYMCE_KEY}
                        value={form.description}
                        onEditorChange={(content) =>
                          handleInputChange("description", content)
                        }
                        init={{
                          height: 400,
                          menubar: true,
                          plugins: "table image link media code lists",
                          toolbar:
                            "undo redo | bold italic underline | alignleft aligncenter alignright | " +
                            "bullist numlist outdent indent | table | image media link | code",
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        Nama Walidata <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        value={form.fn}
                        onChange={(e) => handleInputChange("fn", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        Email Walidata <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="email"
                        value={form.has_email}
                        onChange={(e) => handleInputChange("has_email", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-muted-foreground" />
                        Nama Publisher <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        value={form.nama_publisher}
                        onChange={(e) => handleInputChange("nama_publisher", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        Tanggal Publikasi <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="date"
                        value={form.issued}
                        onChange={(e) => handleInputChange("issued", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-muted-foreground" />
                        Tagging / Keyword <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        value={form.keyword}
                        onChange={(e) => handleInputChange("keyword", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Palette className="w-4 h-4 text-muted-foreground" />
                        Tema / Theme <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        value={form.theme}
                        onChange={(e) => handleInputChange("theme", e.target.value)}
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
                            Mengupload...
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4" />
                            Upload Dataset
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
