import { useState, useEffect } from "react";
import { getAuthHeaders } from "@/api/auth";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://api-satudata.lampungtimurkab.go.id";

export interface InputItem {
  id_opd: number;
  id_data_sektoral: number;
  tahun: number;
  jumlah: number;
}

export interface DetailSektoral {
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
  input: InputItem[];
}

export interface DatasetDetail {
  id: number;
  nama_publisher: string;
  type_publisher: string;
  access_level: string;
  type_dataset: string;
  description: string;
  issued: string;
  IssuedFormatted: string;
  identifier: string;
  landing_page: string;
  modified: string;
  ModifiedFormatted: string;
}

export function useDetailSektoral(id?: string) {
  const [data, setData] = useState<DetailSektoral | null>(null);
  const [dataset, setDataset] = useState<DatasetDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSektoral = async () => {
    const response = await fetch(
      `${API_URL}/strict/data-sektoral/detail/${id}`,
      {
        method: "GET",
        headers: getAuthHeaders(),
      }
    );

    if (!response.ok) throw new Error("Gagal mengambil data sektoral");
    return await response.json();
  };

  const fetchDataset = async () => {
    const response = await fetch(`${API_URL}/strict/dataset/${id}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (!response.ok) throw new Error("Gagal mengambil data dataset");
    return await response.json();
  };

  const fetchAll = async () => {
    try {
      setLoading(true);
      setError(null);

      const [sektoralRes, datasetRes] = await Promise.all([
        fetchSektoral(),
        fetchDataset(),
      ]);

      setData(sektoralRes);
      setDataset(datasetRes);
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat mengambil data");
      setData(null);
      setDataset(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchAll();
  }, [id]);

  const chartData =
    data?.input
      ?.map((item) => ({
        tahun: item.tahun.toString(),
        jumlah: item.jumlah,
        satuan: data.satuan,
      }))
      .sort((a, b) => Number(a.tahun) - Number(b.tahun)) || [];

  const totalYears = data?.input?.length || 0;
  const latestYear = totalYears
    ? Math.max(...data.input.map((i) => i.tahun))
    : "-";
  const totalValue =
    data?.input?.reduce((sum, item) => sum + item.jumlah, 0) || 0;
  const avgValue = totalYears > 0 ? Math.round(totalValue / totalYears) : 0;

  const deleteSektoral = async (
    id_data_sektoral: number,
    tahun: number
  ) => {
    if (!confirm(`Hapus data tahun ${tahun}?`)) return;

    try {
      const res = await fetch(
        `${API_URL}/strict/trx-data-sektoral/${id_data_sektoral}/${tahun}`,
        {
          method: "DELETE",
          headers: getAuthHeaders(),
        }
      );

      if (!res.ok) throw new Error("Gagal menghapus data");

      await fetchAll();
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus data");
    }
  };

  const updateSektoral = async (
    id_data_sektoral: number,
    tahun: number,
    jumlahBaru: number
  ) => {
    try {
      const res = await fetch(
        `${API_URL}/strict/trx-data-sektoral/${id_data_sektoral}/${tahun}`,
        {
          method: "PUT",
          headers: {
            ...getAuthHeaders(),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ jumlah: jumlahBaru }),
        }
      );

      if (!res.ok) throw new Error("Gagal mengubah data");
      await fetchAll();
    } catch (err) {
      alert("Gagal mengubah data");
      console.error(err);
    }
  };

  const deleteDataset = async (id_dataset: number | string) => {
    if (!confirm("Yakin ingin menghapus dataset ini?")) return;

    try {
      const res = await fetch(
        `${API_URL}/strict/dataset/delete-dataset/${id_dataset}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            ...getAuthHeaders(),
          },
        }
      );

      if (!res.ok) throw new Error("Gagal menghapus dataset");

      const refreshed = await fetchDataset();
      setDataset(refreshed);

      alert("Dataset berhasil dihapus");
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus dataset");
    }
  };

  return {
    data,
    dataset,
    loading,
    error,

    chartData,
    totalYears,
    latestYear,
    totalValue,
    avgValue,

    fetchAll,
    deleteSektoral,
    updateSektoral,
    deleteDataset,
  };
}
