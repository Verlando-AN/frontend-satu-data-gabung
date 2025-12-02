import { useState, useEffect } from "react";
import { getAuthHeaders } from "@/api/auth";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://api-satudata.lampungtimurkab.go.id";

export interface OpdItem {
  id_opd: number;
  kode_wilayah: string;
  kode_bidang_urusan_1: string;
  kode_bidang_urusan_2: string;
  kode_bidang_urusan_3: string;
  kode_main_opd: string;
  kode_sub_opd: string;
  nama_opd: string;
  level: number;
  level_string: string;
}

export const useOpdData = () => {
  const [data, setData] = useState<OpdItem[]>([]);
  const [filteredData, setFilteredData] = useState<OpdItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/strict/ref-data/list-opd`,
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

  // Filter data based on search and level
  useEffect(() => {
    let result = data;

    if (searchQuery) {
      result = result.filter(item =>
        item.nama_opd.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.kode_wilayah.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (levelFilter) {
      result = result.filter(item => item.level_string === levelFilter);
    }

    setFilteredData(result);
  }, [searchQuery, levelFilter, data]);

  // Get unique levels for filter
  const uniqueLevels = Array.from(new Set(data.map(item => item.level_string)));

  // Calculate statistics
  const stats = {
    total: data.length,
    byLevel: data.reduce((acc: any, item) => {
      acc[item.level_string] = (acc[item.level_string] || 0) + 1;
      return acc;
    }, {})
  };

  const getBadgeVariant = (level: string) => {
    switch(level) {
      case 'MAIN': return 'default';
      case 'SUB': return 'secondary';
      case 'UPTD': return 'outline';
      default: return 'secondary';
    }
  };

  const resetFilters = () => {
    setSearchQuery("");
    setLevelFilter("");
  };

  return {
    data,
    filteredData,
    loading,
    searchQuery,
    setSearchQuery,
    levelFilter,
    setLevelFilter,
    uniqueLevels,
    stats,
    getBadgeVariant,
    fetchData,
    resetFilters
  };
};