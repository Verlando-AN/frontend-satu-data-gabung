import { useState, useEffect } from "react"
import publikasiApi from "../api/publikasiApi.js"

// -----------------------------------------
// 1. Tipe untuk item publikasi
// -----------------------------------------
export interface PublikasiItem {
  buku: string
  buku_slug: string
  nama_opd: string
  created_at: number
  [key: string]: any // Jika ada field lain yang tidak pasti
}

// -----------------------------------------
// 2. Hook utama
// -----------------------------------------
export default function usePublikasi(slug: string | null = null) {
  const [publikasiData, setPublikasiData] = useState<PublikasiItem[] | PublikasiItem>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)

      try {
        const data: PublikasiItem[] = slug
          ? await publikasiApi.getPublikasiDetail(slug)
          : await publikasiApi.getPublikasiList()

        // Jika slug digunakan dan API mengembalikan 1 array item → jadikan objek tunggal
        if (slug && Array.isArray(data) && data.length === 1) {
          setPublikasiData(data[0])
        } else {
          setPublikasiData(data)
        }
      } catch (error) {
        console.error("Gagal mengambil data publikasi:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [slug])

  return { publikasiData, loading }
}
