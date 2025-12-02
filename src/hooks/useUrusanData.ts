import { useState, useEffect } from "react";
import { getAuthHeaders } from "@/api/auth";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://api-satudata.lampungtimurkab.go.id";

export interface UrusanItem {
  kode_urusan: string;
  nama_urusan: string;
}

export const useUrusanData = () => {
  const [data, setData] = useState<UrusanItem[]>([]);
  const [filteredData, setFilteredData] = useState<UrusanItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/strict/ref-data/list-urusan`,
        {
          method: "GET",
          headers: getAuthHeaders(),
        }
      );

      if (!response.ok) throw new Error(`HTTP Error ${response.status}`);

      const result = await response.json();

      const finalData =
        result?.data ??
        result?.hasil ??
        result?.result ??
        (Array.isArray(result) ? result : null);

      setData(finalData || []);
      setFilteredData(finalData || []);
    } catch (error) {
      console.error("Error fetching:", error);
      setData([]);
      setFilteredData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter data based on search and category
  useEffect(() => {
    let result = data;

    if (searchQuery) {
      result = result.filter(item =>
        item.nama_urusan.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.kode_urusan.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (categoryFilter) {
      result = result.filter(item => {
        const category = item.kode_urusan.split('.')[0];
        return category === categoryFilter;
      });
    }

    setFilteredData(result);
  }, [searchQuery, categoryFilter, data]);

  // Get unique categories
  const categories = Array.from(new Set(data.map(item => item.kode_urusan.split('.')[0]))).sort();

  const categoryNames: Record<string, string> = {
    '1': 'Urusan Pemerintahan Wajib Pelayanan Dasar',
    '2': 'Urusan Pemerintahan Wajib Non Pelayanan Dasar',
    '3': 'Urusan Pemerintahan Wajib',
    '4': 'Urusan Pemerintahan Pilihan',
    '5': 'Urusan Penunjang',
    '6': 'Urusan Ekonomi',
    '7': 'Urusan Perdagangan dan Industri',
  };

  const resetFilters = () => {
    setSearchQuery("");
    setCategoryFilter("");
  };

  const getActiveFiltersCount = () => {
    return (searchQuery ? 1 : 0) + (categoryFilter ? 1 : 0);
  };

  return {
    data,
    filteredData,
    loading,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    categories,
    categoryNames,
    fetchData,
    resetFilters,
    getActiveFiltersCount
  };
};