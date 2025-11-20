import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

const API_URL =
  import.meta.env.VITE_API_URL || "https://api-satudata.lampungtimurkab.go.id"

export default function Landing() {
  const [email, setEmail] = useState("")
  const [fullName, setFullName] = useState("")
  const [nip, setNip] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

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
      alert(result?.message || "Berhasil membuat akun Kepala Bidang")
    } catch (error) {
      console.error("Submit error:", error)
      alert("Gagal mengirim data.")
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
            {/* 🌟 Wrapper untuk menempatkan form ke tengah */}
            <div className="flex flex-1 justify-center items-center p-6">

              <div className="max-w-lg w-full bg-white shadow-sm border rounded-xl p-6 space-y-4">
                <h1 className="text-xl font-semibold">Create Akun Kepala Bidang</h1>
                <p className="text-sm text-muted-foreground">
                  Masukan Data Akun Yang Sesuai
                </p>

                <form onSubmit={handleSubmit}>
                  <FieldGroup>

                    <FieldSet>
                      <FieldLegend>Data Pengguna</FieldLegend>
                    </FieldSet>

                    <FieldSeparator />

                    {/* Email */}
                    <Field>
                      <FieldLabel>Email</FieldLabel>
                      <Input
                        placeholder="Masukan Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </Field>

                    {/* Nama */}
                    <Field>
                      <FieldLabel>Nama Lengkap</FieldLabel>
                      <Input
                        placeholder="Masukan Nama Lengkap"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </Field>

                    {/* NIP */}
                    <Field>
                      <FieldLabel>NIP</FieldLabel>
                      <Input
                        placeholder="Masukan Nomor Induk Pegawai"
                        value={nip}
                        onChange={(e) => setNip(e.target.value)}
                        required
                      />
                    </Field>

                    <Field orientation="horizontal" className="mt-3">
                      <Button type="submit" disabled={loading}>
                        {loading ? "Mengirim..." : "Submit"}
                      </Button>
                    </Field>

                  </FieldGroup>
                </form>
              </div>

            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}
