import { useEffect, useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

import { getAuthHeaders } from "@/api/auth"

const API_URL =
  import.meta.env.VITE_API_URL || "https://api-satudata.lampungtimurkab.go.id"

interface SektoralItem {
  id: number
  kode_urusan: string
  jenis: number
  kategori: number
  jenis_string: string
  kategori_string: string
  kode_dssd: string
  uraian_dssd: string
  satuan: string
  dimensi: string
  active: boolean
}

interface OPD {
  id: number
  nama_opd: string
}

export default function MonitoringData() {
  const [data, setData] = useState<SektoralItem[]>([])
  const [loading, setLoading] = useState(true)

  const [perPage, setPerPage] = useState("20")
  const [active, setActive] = useState("")
  const [opd, setOpd] = useState("")

  const [listOpd, setListOpd] = useState<OPD[]>([])

  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(1)
  const [totalCount, setTotalCount] = useState(0)

  const fetchOPD = async () => {
    try {
      const res = await fetch(`${API_URL}/list-opd`)
      const json = await res.json()
      setListOpd(json || [])
    } catch (e) {
      console.error("Gagal mengambil OPD:", e)
    }
  }

  const fetchData = async () => {
    try {
      setLoading(true)

      const query = new URLSearchParams({
        page: String(page),
        per_page: perPage,
      })

      if (active !== "") query.append("active", active)

      const opdPath = opd !== "" ? `/${opd}` : ""

      const response = await fetch(
        `${API_URL}/strict/data-sektoral${opdPath}?${query.toString()}`,
        {
          method: "GET",
          headers: getAuthHeaders(),
        }
      )

      if (!response.ok) throw new Error(`HTTP Error ${response.status}`)

      setPage(Number(response.headers.get("x-pagination-current-page") || 1))
      setPageCount(Number(response.headers.get("x-pagination-page-count") || 1))
      setTotalCount(Number(response.headers.get("x-pagination-total-count") || 0))

      const result = await response.json()

      const finalData =
        result?.data ??
        result?.hasil ??
        result?.result ??
        (Array.isArray(result) ? result : [])

      setData(finalData)
    } catch (e) {
      console.error(e)
      setData([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOPD()
  }, [])

  useEffect(() => {
    fetchData()
  }, [page, perPage, active, opd])

  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />

        <div className="flex flex-1">
          <AppSidebar />

          <SidebarInset>
            <div className="flex flex-col flex-1 p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">📁 Monitoring Data Sektoral</h1>
                <Button className="bg-primary text-white">
                  <Plus className="w-4 h-4 mr-2" /> Tambah Data
                </Button>
              </div>

              <div className="flex flex-wrap gap-3 items-center p-3 bg-muted/40 rounded-xl">
                
                <NativeSelect
                  value={perPage}
                  onChange={(e) => {
                    setPerPage(e.target.value)
                    setPage(1)
                  }}
                >
                  <NativeSelectOption value="10">10</NativeSelectOption>
                  <NativeSelectOption value="20">20</NativeSelectOption>
                  <NativeSelectOption value="30">30</NativeSelectOption>
                  <NativeSelectOption value="40">40</NativeSelectOption>
                  <NativeSelectOption value="50">50</NativeSelectOption>
                </NativeSelect>

                <NativeSelect
                  value={active}
                  onChange={(e) => {
                    setActive(e.target.value)
                    setPage(1)
                  }}
                >
                  <NativeSelectOption value="">Semua</NativeSelectOption>
                  <NativeSelectOption value="true">Aktif</NativeSelectOption>
                  <NativeSelectOption value="false">Tidak Aktif</NativeSelectOption>
                </NativeSelect>

                <NativeSelect
                  value={opd}
                  onChange={(e) => {
                    setOpd(e.target.value)
                    setPage(1)
                  }}
                >
                  <NativeSelectOption value="">Semua OPD</NativeSelectOption>
                  {listOpd.map((o) => (
                    <NativeSelectOption key={o.id_opd} value={String(o.id_opd)}>
                      {o.nama_opd}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>

              </div>

              <div className="rounded-md border bg-card">
                <Table>
                  <TableCaption>Total: {totalCount} data</TableCaption>

                  <TableHeader>
                    <TableRow>
                      <TableHead>Aksi</TableHead>
                      <TableHead>ID</TableHead>
                      <TableHead>Aktif</TableHead>
                      <TableHead>Kode</TableHead>
                      <TableHead>Kategori</TableHead>
                      <TableHead>Uraian DSSD</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6">
                          Memuat data...
                        </TableCell>
                      </TableRow>
                    ) : data.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6">
                          Tidak ada data.
                        </TableCell>
                      </TableRow>
                    ) : (
                      data.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <Button size="sm" variant="outline">Edit</Button>
                          </TableCell>
                          <TableCell>{item.id}</TableCell>
                          <TableCell>{item.active ? "Aktif" : "Tidak"}</TableCell>
                          <TableCell>{item.kode_dssd}</TableCell>
                          <TableCell>{item.kategori_string}</TableCell>
                          <TableCell>
                            {item.uraian_dssd.length > 40
                              ? item.uraian_dssd.substring(0, 40) + "..."
                              : item.uraian_dssd}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      className={page <= 1 ? "opacity-50 pointer-events-none" : ""}
                      onClick={() => page > 1 && setPage(page - 1)}
                    />
                  </PaginationItem>

                  {Array.from({ length: pageCount }, (_, i) => i + 1)
                    .filter((p) => {
                      if (pageCount <= 5) return true
                      if (p === 1 || p === pageCount) return true
                      if (Math.abs(p - page) <= 1) return true
                      return false
                    })
                    .map((p, idx, arr) => {
                      const prev = arr[idx - 1]

                      return (
                        <>
                          {prev && p - prev > 1 && (
                            <PaginationItem key={`el-${p}`}>
                              <PaginationEllipsis />
                            </PaginationItem>
                          )}

                          <PaginationItem key={p}>
                            <PaginationLink
                              className={p === page ? "bg-primary text-white" : ""}
                              onClick={() => setPage(p)}
                            >
                              {p}
                            </PaginationLink>
                          </PaginationItem>
                        </>
                      )
                    })}

                  <PaginationItem>
                    <PaginationNext
                      className={page >= pageCount ? "opacity-50 pointer-events-none" : ""}
                      onClick={() => page < pageCount && setPage(page + 1)}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>

            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}
