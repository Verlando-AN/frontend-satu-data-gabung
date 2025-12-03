// File: hooks/useAkunKepalaDinas.ts
import { useEffect, useState, useCallback } from "react"
import { getAuthHeaders } from "@/api/auth"
import client from "@/api/client"

const API_URL = client.defaults.baseURL || "";

export interface AccountItem {
  id: number
  nama_opd: string
  level_string: string
  full_name: string
  nip: string
  email: string
  active: boolean
}

export function useAkunKepalaDinas() {
  const [data, setData] = useState<AccountItem[]>([])
  const [filteredData, setFilteredData] = useState<AccountItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("")

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)

      const response = await fetch(
        `${API_URL}/strict/account/list-kadis`,
        {
          method: "GET",
          headers: getAuthHeaders(),
        }
      )

      if (!response.ok) throw new Error(`HTTP Error ${response.status}`)

      const result = await response.json()

      const finalData =
        result?.data ??
        result?.hasil ??
        result?.result ??
        (Array.isArray(result) ? result : null)

      setData(finalData || [])
      setFilteredData(finalData || [])
    } catch (error) {
      console.error("Error fetching:", error)
      setData([])
      setFilteredData([])
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteAccount = useCallback(async (id_user: number) => {
      try {
        const response = await fetch(
          `${API_URL}/strict/account/${id_user}`,
          {
            method: "DELETE",
            headers: getAuthHeaders(),
          }
        )
  
        const result = await response.json()
  
        if (!response.ok) {
          throw new Error(result?.message || "Gagal menghapus akun")
        }
  
        // Refresh list
        await fetchData()
  
        return {
          success: true,
          message: result?.message || "Akun berhasil dihapus",
        }
      } catch (error: any) {
        console.error("Delete error:", error)
        return {
          success: false,
          message: error.message || "Gagal menghapus akun",
        }
      }
    }, [fetchData])

  // Filter data
  useEffect(() => {
    let result = data

    if (searchQuery) {
      result = result.filter(item =>
        item.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.nip.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.nama_opd.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (statusFilter === "active") {
      result = result.filter(item => item.active)
    } else if (statusFilter === "inactive") {
      result = result.filter(item => !item.active)
    }

    setFilteredData(result)
  }, [searchQuery, statusFilter, data])

  // Calculate statistics
  const activeCount = data.filter(item => item.active).length
  const inactiveCount = data.filter(item => !item.active).length

  // Reset filters
  const resetFilters = useCallback(() => {
    setSearchQuery("")
    setStatusFilter("")
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    data,
    filteredData,
    loading,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    activeCount,
    inactiveCount,
    refreshData: fetchData,
    resetFilters,
    deleteAccount,
  }
}