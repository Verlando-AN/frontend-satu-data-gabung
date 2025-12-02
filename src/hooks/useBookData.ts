import { useState, useEffect } from "react";
import { getAuthHeaders } from "@/api/auth";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://api-satudata.lampungtimurkab.go.id";

export interface BukuDigital {
  id_buku_digital: number;
  id_opd: number;
  tahun: number;
  buku: string;
  file: string;
  created_at: number;
  nama_opd: string;
  buku_slug: string;
}

export const useBookData = () => {
  const [data, setData] = useState<BukuDigital[]>([]);
  const [filteredData, setFilteredData] = useState<BukuDigital[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [opdFilter, setOpdFilter] = useState("");

  const handleDelete = async (id: number, onSuccess: () => void) => {
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus buku ini?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${API_URL}/strict/ref-data/delete-buku-digital/${id}`,
        {
          method: "DELETE",
          headers: {
            ...getAuthHeaders(),
            accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        alert(`Gagal menghapus buku. Error: ${response.status}`);
        return;
      }

      const result = await response.json();

      if (result === true) {
        alert("Buku berhasil dihapus!");
        onSuccess();
      } else {
        alert("Gagal menghapus buku!");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Terjadi kesalahan saat menghapus!");
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/strict/ref-data/list-buku-digital`,
        {
          method: "GET",
          headers: getAuthHeaders(),
        }
      );

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
    let result = data;

    if (searchQuery) {
      result = result.filter(item =>
        item.buku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.nama_opd.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (yearFilter) {
      result = result.filter(item => String(item.tahun) === yearFilter);
    }

    if (opdFilter) {
      result = result.filter(item => item.nama_opd === opdFilter);
    }

    setFilteredData(result);
  }, [searchQuery, yearFilter, opdFilter, data]);

  useEffect(() => {
    fetchData();
  }, []);

  const years = Array.from(new Set(data.map(item => item.tahun))).sort((a, b) => b - a);
  const opds = Array.from(new Set(data.map(item => item.nama_opd))).sort();

  const currentYear = new Date().getFullYear();
  const thisYearBooks = data.filter(item => item.tahun === currentYear).length;

  const resetFilters = () => {
    setSearchQuery("");
    setYearFilter("");
    setOpdFilter("");
  };

  return {
    data,
    filteredData,
    loading,
    searchQuery,
    setSearchQuery,
    yearFilter,
    setYearFilter,
    opdFilter,
    setOpdFilter,
    years,
    opds,
    thisYearBooks,
    handleDelete,
    fetchData,
    resetFilters
  };
};