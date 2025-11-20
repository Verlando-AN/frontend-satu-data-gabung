import { useEffect, useState } from "react"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const API_URL =
  import.meta.env.VITE_API_URL || "https://api-satudata.lampungtimurkab.go.id"

export default function RelokasiSektoral() {
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />

        <div className="flex flex-1">
          <AppSidebar />

          <SidebarInset>
            <div className="flex flex-col flex-1 p-6 space-y-6">

              {/* CARD WRAPPER */}
              <div className="w-full max-w-2xl bg-white border shadow-sm rounded-xl p-6 mx-auto space-y-4">

                <h1 className="text-xl font-semibold">Relokasi Data Sektoral</h1>
                <p className="text-sm text-muted-foreground">
                  Masukan Data Sektoral dengan benar dan lengkap
                </p>

                <form>
                  <FieldGroup>

                    {/* GROUP: KODE URUSAN + JENIS + KATEGORI */}
                    <FieldSet>

                      <FieldGroup>
                       
                        <div className="grid grid-cols-3 gap-4">
                          <Field>
                            <FieldLabel>Nama Opd Lama</FieldLabel>
                            <Select defaultValue="">
                              <SelectTrigger>
                                <SelectValue placeholder="Pilih jenis" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1">Data Teknis</SelectItem>
                                <SelectItem value="2">
                                  Data Manajemen Kepemerintahan
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </Field>

                          <Field>
                            <FieldLabel>Pilih Sektoral</FieldLabel>
                            <Select defaultValue="">
                              <SelectTrigger>
                                <SelectValue placeholder="Pilih kategori" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="sosial">
                                  Sosial & Kesejahteraan Masyarakat
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </Field>

                        <Field>
                            <FieldLabel>Nama Opd Baru</FieldLabel>
                            <Select defaultValue="">
                              <SelectTrigger>
                                <SelectValue placeholder="Pilih kategori" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="sosial">
                                  Sosial & Kesejahteraan Masyarakat
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </Field>

                        </div>
                      </FieldGroup>
                    </FieldSet>

                    <FieldSeparator />

                   

                    <Field orientation="horizontal" className="pt-4">
                      <Button type="submit" className="w-full">
                        Submit
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
