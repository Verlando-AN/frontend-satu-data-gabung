// File: hooks/useMonitoringData.ts
import { useEffect, useState, useCallback } from "react"
import { getAuthHeaders } from "@/api/auth"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import client from "@/api/client"

const API_URL = client.defaults.baseURL || "";

// ==============================
// Types
// ==============================
export interface SektoralItem {
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

export interface OPD {
  id_opd: number
  nama_opd: string
}

export interface ChartItem {
  name: string
  value: number
}

export interface PieItem {
  name: string
  value: number
}

// ==============================
// Hook utama
// ==============================
export function useMonitoringData() {
  const [data, setData] = useState<SektoralItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [perPage, setPerPage] = useState<string>("20")
  const [active, setActive] = useState<string>("")
  const [opd, setOpd] = useState<string>("")
  const [listOpd, setListOpd] = useState<OPD[]>([])
  const [page, setPage] = useState<number>(1)
  const [pageCount, setPageCount] = useState<number>(1)
  const [totalCount, setTotalCount] = useState<number>(0)

  // ==============================
  // Fetch OPD List
  // ==============================
  const fetchOPD = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/list-opd`)
      const json = await res.json()
      setListOpd(json || [])
    } catch (e) {
      console.error("Gagal mengambil OPD:", e)
    }
  }, [])

  // ==============================
  // Fetch Data Sektoral
  // ==============================
  const fetchData = useCallback(async () => {
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
      setTotalCount(
        Number(response.headers.get("x-pagination-total-count") || 0)
      )

      const result = await response.json()

      const finalData: SektoralItem[] =
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
  }, [page, perPage, active, opd])

  // ==============================
  // Export to PDF
  // ==============================
  const exportToPDF = useCallback(() => {
    const doc = new jsPDF()

    doc.setFontSize(16)
    doc.text("Laporan Monitoring Data Sektoral", 14, 15)

    doc.setFontSize(10)
    const tableData = data.map((item) => [
      item.id,
      item.active ? "Aktif" : "Tidak Aktif",
      item.kode_dssd,
      item.kategori_string,
      item.uraian_dssd,
    ])

    autoTable(doc, {
      head: [["ID", "Status", "Kode DSSD", "Kategori", "Uraian"]],
      body: tableData,
      startY: 28,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [52, 152, 219] },
    })

    doc.save("monitoring-data.pdf")
  }, [data, totalCount])

  // ==============================
  // Effects
  // ==============================
  useEffect(() => {
    fetchOPD()
  }, [fetchOPD])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // ==============================
  // Statistik
  // ==============================
  const activeCount = data.filter((item) => item.active).length
  const inactiveCount = data.filter((item) => !item.active).length

  // ==============================
  // Chart kategori
  // ==============================
  const groupedKategori = data.reduce<Record<string, number>>((acc, item) => {
    const kategori = item.kategori_string || "Lainnya"
    acc[kategori] = (acc[kategori] || 0) + 1
    return acc
  }, {})

  const chartData: ChartItem[] = Object.entries(groupedKategori)
    .map(([name, value]) => ({ name, value }))
    .slice(0, 5)

  // ==============================
  // Data Pie
  // ==============================
  const pieData: PieItem[] = [
    { name: "Aktif", value: activeCount },
    { name: "Tidak Aktif", value: inactiveCount },
  ]

  return {
    data,
    loading,
    perPage,
    setPerPage,
    active,
    setActive,
    opd,
    setOpd,
    listOpd,
    page,
    setPage,
    pageCount,
    totalCount,
    exportToPDF,
    activeCount,
    inactiveCount,
    chartData,
    pieData,
    refreshData: fetchData,
  }
}
