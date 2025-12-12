import { useState, useEffect } from "react";
import { useTrxSektoral } from "@/hooks/useTrxSektoral";
import { getAuthHeaders } from "@/api/auth";
import client from "@/api/client"

const API_URL = client.defaults.baseURL || "";

export interface SektoralItem {
  id: number;
  kode_urusan: string;
  jenis: number;
  kategori: number;
  jenis_string: string;
  kategori_string: string;
  kode_dssd: string;
  uraian_dssd: string;
  satuan: string;
  dimensi: string;
  active: boolean;
}

export function useDataSektoral() {
  const { createData, setActiveStatus } = useTrxSektoral();
  
  // State untuk data dan pagination
  const [data, setData] = useState<SektoralItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [perPage, setPerPage] = useState("20");
  const [active, setActive] = useState("");
  const [uraianDssd, setUraianDssd] = useState("");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Dialog state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SektoralItem | null>(null);
  const [formData, setFormData] = useState({
    jumlah: "",
    tahun: new Date().getFullYear().toString(),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const fetchData = async () => {
    try {
      setLoading(true);

      const query = new URLSearchParams({
        page: String(page),
        per_page: perPage,
      });

      if (active !== "") query.append("active", active);
      if (uraianDssd !== "") query.append("uraian_dssd", uraianDssd);

      const response = await fetch(
        `${API_URL}/strict/data-sektoral?${query.toString()}`,
        {
          method: "GET",
          headers: getAuthHeaders(),
        }
      );

      if (!response.ok) throw new Error(`HTTP Error ${response.status}`);

      const currentPage = Number(response.headers.get("x-pagination-current-page"));
      const countPage = Number(response.headers.get("x-pagination-page-count"));
      const total = Number(response.headers.get("x-pagination-total-count"));

      if (currentPage) setPage(currentPage);
      if (countPage) setPageCount(countPage);
      if (total) setTotalCount(total);

      const result = await response.json();

      const finalData =
        result?.data ??
        result?.hasil ??
        result?.result ??
        (Array.isArray(result) ? result : null);

      setData(finalData || []);
    } catch (error) {
      console.error("Error fetching:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [perPage, active, uraianDssd, page]);

  const handleOpenDialog = (item: SektoralItem) => {
    setSelectedItem(item);
    setFormData({
      jumlah: "",
      tahun: new Date().getFullYear().toString(),
    });
    setSubmitStatus({ type: null, message: '' });
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedItem(null);
    setFormData({
      jumlah: "",
      tahun: new Date().getFullYear().toString(),
    });
    setSubmitStatus({ type: null, message: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedItem) return;

    const jumlahNum = parseFloat(formData.jumlah);
    const tahunNum = parseInt(formData.tahun);

    if (isNaN(jumlahNum) || jumlahNum <= 0) {
      setSubmitStatus({
        type: 'error',
        message: 'Jumlah harus berupa angka positif'
      });
      return;
    }

    if (isNaN(tahunNum) || tahunNum < 2000 || tahunNum > 2100) {
      setSubmitStatus({
        type: 'error',
        message: 'Tahun tidak valid (harus antara 2000-2100)'
      });
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitStatus({ type: null, message: '' });

      await createData({
        id_data_sektoral: selectedItem.id,
        jumlah: jumlahNum,
        tahun: tahunNum,
      });

      setSubmitStatus({
        type: 'success',
        message: 'Data transaksi berhasil ditambahkan'
      });

      // Reset form dan tutup dialog setelah 1.5 detik
      setTimeout(() => {
        handleCloseDialog();
        fetchData(); // Refresh data
      }, 1500);

    } catch (error) {
      console.error("Error submitting:", error);
      setSubmitStatus({
        type: 'error',
        message: 'Terjadi kesalahan saat menambah data. Silakan coba lagi.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleStatus = async (item: SektoralItem) => {
    try {
      const newStatus = !item.active; // toggle

      await setActiveStatus(item.id, newStatus);

      // refresh table
      fetchData();
    } catch (error) {
      console.error("Gagal mengubah status:", error);
      alert("Gagal mengubah status");
    }
  };

  const handlePerPageChange = (value: string) => {
    setPerPage(value);
    setPage(1);
  };

  const handleActiveChange = (value: string) => {
    setActive(value);
    setPage(1);
  };

  const handleSearchChange = (value: string) => {
    setUraianDssd(value);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRefresh = () => {
    fetchData();
  };

  // Hitung statistik
  const activeCount = data.filter(item => item.active).length;
  const inactiveCount = data.filter(item => !item.active).length;

  return {
    // Data
    data,
    loading,
    perPage,
    active,
    uraianDssd,
    page,
    pageCount,
    totalCount,
    activeCount,
    inactiveCount,
    
    // Dialog
    isDialogOpen,
    selectedItem,
    formData,
    isSubmitting,
    submitStatus,
    
    fetchData,
    handleOpenDialog,
    handleCloseDialog,
    handleSubmit,
    handleToggleStatus,
    handlePerPageChange,
    handleActiveChange,
    handleSearchChange,
    handlePageChange,
    handleRefresh,
    setFormData
  };
}