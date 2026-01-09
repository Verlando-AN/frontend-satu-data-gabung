import { useState, useEffect, useCallback } from "react";
import { getAuthHeaders } from "@/api/auth";
import client from "@/api/client";

const API_URL = client.defaults.baseURL || "";

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

export interface DatasetItem {
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

export type DatasetList = DatasetItem[];

export interface OperationResult {
  success: boolean;
  error?: string;
}


export function useDetailSektoral(id?: string) {
  const [data, setData] = useState<DetailSektoral | null>(null);
  const [dataset, setDataset] = useState<DatasetList | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [deleting, setDeleting] = useState(false);

  const [deleteErrorDialogOpen, setDeleteErrorDialogOpen] = useState(false);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState("");

  function stripHtml(html: string) {
    if (!html) return "";
    return html.replace(/<[^>]+>/g, "");
  }

  const fetchSektoral = async () => {
    const response = await fetch(
      `${API_URL}/strict/data-sektoral/detail/${id}`,
      {
        method: "GET",
        headers: getAuthHeaders(),
      }
    );

    if (!response.ok) throw new Error("Gagal mengambil data sektoral");
    return response.json();
  };

  const fetchDataset = async (): Promise<DatasetList> => {
    const response = await fetch(`${API_URL}/strict/dataset/${id}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (!response.ok) throw new Error("Gagal mengambil data dataset");
    return response.json();
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
  const years = data?.input?.map((i) => i.tahun) ?? [];
  const latestYear = years.length > 0 ? Math.max(...years) : "-";
  const totalValue =
    data?.input?.reduce((sum, item) => sum + item.jumlah, 0) || 0;
  const avgValue =
    totalYears > 0 ? Math.round(totalValue / totalYears) : 0;

  const deleteSektoral = async (
    id_data_sektoral: number,
    tahun: number
  ): Promise<OperationResult> => {
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
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const updateSektoral = async (
    id_data_sektoral: number,
    tahun: number,
    jumlahBaru: number
  ): Promise<OperationResult> => {
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
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const deleteMainSektoral = useCallback(
    async (idToDelete: string): Promise<OperationResult> => {
      try {
        setDeleting(true);

        const response = await fetch(
          `${API_URL}/strict/data-sektoral/${idToDelete}`,
          {
            method: "DELETE",
            headers: getAuthHeaders(),
          }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          const backendMessage = errorData?.message || "";

          if (
            response.status === 409 ||
            backendMessage.includes("foreign key") ||
            backendMessage.includes("SQLSTATE 23001")
          ) {
            setDeleteErrorMessage(
              "Data tidak dapat dihapus, ada dataset atau data tahunan yang terhubung"
            );
          } else {
            setDeleteErrorMessage(
              backendMessage || "Gagal menghapus data sektoral"
            );
          }

          setDeleteErrorDialogOpen(true);
          return { success: false };
        }

        return { success: true };
      } catch (err: any) {
        setDeleteErrorMessage(
          err.message || "Terjadi kesalahan sistem"
        );
        setDeleteErrorDialogOpen(true);
        return { success: false };
      } finally {
        setDeleting(false);
      }
    },
    []
  );

  const deleteDataset = async (
    id_dataset: number | string
  ): Promise<OperationResult> => {
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

      await fetchAll();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  return {
    data,
    dataset,
    loading,
    deleting,
    error,

    deleteErrorDialogOpen,
    setDeleteErrorDialogOpen,
    deleteErrorMessage,

    stripHtml,
    chartData,
    totalYears,
    latestYear,
    totalValue,
    avgValue,

    fetchAll,
    deleteSektoral,
    updateSektoral,
    deleteMainSektoral,
    deleteDataset,
  };
}
