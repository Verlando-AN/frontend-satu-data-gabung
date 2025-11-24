import { useEffect, useState, useRef } from "react"
import berandaApi from "../api/berandaApi"

// ======================
// Interface Types
// ======================

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

// ======================
// Hook
// ======================

export default function useBerandaData() {
  const [opdList, setOpdList] = useState<OpdItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [dataTotal, setDataTotal] = useState<TotalData>({
    dataset: 0,
    data_sektoral: 0,
    urusan: 0,
  })
  const [actualData, setActualData] = useState<TotalData>({
    dataset: 0,
    data_sektoral: 0,
    urusan: 0,
  })
  const [isVisible, setIsVisible] = useState<VisibilityState>({})

  const counterRef = useRef<HTMLDivElement | null>(null)
  const featureRef = useRef<HTMLDivElement | null>(null)
  const categoryRef = useRef<HTMLDivElement | null>(null)

  // ======================
  // Load Data from API
  // ======================
  useEffect(() => {
    const loadData = async () => {
      try {
        const [opd, total] = await Promise.all([
          berandaApi.getOpdList(),
          berandaApi.getTotalData(),
        ])

        setOpdList(opd)
        setActualData(total)
      } catch (err) {
        console.error("Gagal memuat data:", err)

        // fallback untuk demo
        setActualData({
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

  // ======================
  // Animasi Counter
  // ======================
  useEffect(() => {
    if (isVisible.counterSection && actualData.dataset > 0) {
      const duration = 2000
      const steps = 60

      const increment = {
        dataset: actualData.dataset / steps,
        data_sektoral: actualData.data_sektoral / steps,
        urusan: actualData.urusan / steps,
      }

      let currentStep = 0

      const timer = setInterval(() => {
        currentStep++

        setDataTotal({
          dataset: Math.min(
            Math.floor(increment.dataset * currentStep),
            actualData.dataset
          ),
          data_sektoral: Math.min(
            Math.floor(increment.data_sektoral * currentStep),
            actualData.data_sektoral
          ),
          urusan: Math.min(
            Math.floor(increment.urusan * currentStep),
            actualData.urusan
          ),
        })

        if (currentStep >= steps) clearInterval(timer)
      }, duration / steps)

      return () => clearInterval(timer)
    }
  }, [isVisible.counterSection, actualData])

  // ======================
  // Intersection Observer
  // ======================
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

  // ======================
  // Return Values
  // ======================
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
