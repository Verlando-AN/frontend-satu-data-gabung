import { useEffect, useState, useRef } from "react"
import berandaApi from "@/api/berandaApi"

interface TotalData {
  dataset: number
  data_sektoral: number
  urusan: number
}

interface OpdItem {
  id: number
  nama_opd: string
  [key: string]: any
}

interface VisibilityState {
  [key: string]: boolean
}

export default function useBerandaData() {
  const [opdList, setOpdList] = useState<OpdItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [dataTotal, setDataTotal] = useState<TotalData>({
    dataset: 0,
    data_sektoral: 0,
    urusan: 0,
  })

  const [isVisible, setIsVisible] = useState<VisibilityState>({})

  const counterRef = useRef<HTMLDivElement | null>(null)
  const featureRef = useRef<HTMLDivElement | null>(null)
  const categoryRef = useRef<HTMLDivElement | null>(null)

  // Ambil data awal
  useEffect(() => {
    const loadData = async () => {
      try {
        const [opd, total] = await Promise.all([
          berandaApi.getOpdList(),
          berandaApi.getTotalData(),
        ])

        setOpdList(opd)
        setDataTotal(total) // ← langsung tampil, tanpa animasi
      } catch (err) {
        console.error("Gagal memuat data:", err)

        // fallback dummy
        setDataTotal({
          dataset: 1234,
          data_sektoral: 567,
          urusan: 89,
        })
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Intersection observer jika masih dibutuhkan
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }))
          }
        })
      },
      { threshold: 0.1 }
    )

    if (counterRef.current) observer.observe(counterRef.current)
    if (featureRef.current) observer.observe(featureRef.current)
    if (categoryRef.current) observer.observe(categoryRef.current)

    return () => observer.disconnect()
  }, [])

  return {
    opdList,
    loading,
    dataTotal,
    isVisible,
    counterRef,
    featureRef,
    categoryRef,
  }
}
