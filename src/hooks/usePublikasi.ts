import { useState, useEffect } from "react"
import publikasiApi from "@/api/publikasiApi"

export interface PublikasiItem {
  buku: string
  buku_slug: string
  nama_opd: string
  created_at: number
  [key: string]: any 
}

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
