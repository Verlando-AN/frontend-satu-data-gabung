import { useState, useEffect } from "react"
import publikasiApi from "@/api/publikasiApi"

export default function usePublikasi(slug: string | null = null) {
  const [list, setList] = useState<any[]>([])
  const [detail, setDetail] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        if (slug) {
          const res = await publikasiApi.getPublikasiDetail(slug)
          setDetail(res)
          setList([])
        } else {
          const res = await publikasiApi.getPublikasiList()
          setList(res)
          setDetail(null)
        }
      } catch (e) {
        console.error("Gagal mengambil data publikasi:", e)
        setList([])
        setDetail(null)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [slug])

  return { list, detail, loading }
}
