import { useEffect, useState, useCallback } from "react"
import { getAuthHeaders } from "@/api/auth"
import client from "@/api/client"

const API_URL = client.defaults.baseURL || "";

export interface TrxSektoral {
  id_data_sektoral: number
  jumlah: number
  tahun: number
}

export function useTrxSektoral() {
  const [data, setData] = useState<TrxSektoral[]>([])
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)

      const response = await fetch(`${API_URL}/strict/trx-data-sektoral/list`, {
        method: "GET",
        headers: getAuthHeaders(),
      })

      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}`)
      }

      const result = await response.json()

      const finalData =
        result?.data ??
        result?.hasil ??
        result?.result ??
        (Array.isArray(result) ? result : [])

      setData(finalData)
    } catch (error) {
      console.error("Error fetching:", error)
      setData([])
    } finally {
      setLoading(false)
    }
  }, [])

  const createData = useCallback(
    async (payload: TrxSektoral) => {
      try {
        const response = await fetch(`${API_URL}/strict/trx-data-sektoral`, {
          method: "POST",
          headers: {
            ...getAuthHeaders(),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        })

        if (!response.ok) {
          throw new Error(`Create error: ${response.status}`)
        }

        const result = await response.json() // true
        fetchData()
        return result
      } catch (error) {
        console.error("Error creating:", error)
        throw error
      }
    },
    [fetchData]
  )

  const setActiveStatus = useCallback(
    async (id_data_sektoral: number, active: boolean) => {
      try {
        const response = await fetch(
          `${API_URL}/strict/data-sektoral/set-active-status`,
          {
            method: "POST",
            headers: {
              ...getAuthHeaders(),
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id_data_sektoral,
              active,
            }),
          }
        )

        if (!response.ok) {
          throw new Error(`Update status error: ${response.status}`)
        }

        const result = await response.json()

        fetchData()

        return result
      } catch (error) {
        console.error("Error updating status:", error)
        throw error
      }
    },
    [fetchData]
  )

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    data,
    loading,
    refresh: fetchData,
    createData,
    setActiveStatus, 
  }
}
