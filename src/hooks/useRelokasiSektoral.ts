import { useState, useEffect } from "react";
import { getAuthHeaders } from "@/api/auth";
import client from "@/api/client"

const API_URL = client.defaults.baseURL || "";

export interface OPD {
  id_opd: number;
  nama_opd: string;
}

export interface Sektoral {
  id: number;
  kode_dssd: string;
  uraian_dssd: string;
}

export interface FormData {
  opdLama: string;
  sektoral: string;
  opdBaru: string;
}

export const useRelokasiSektoral = () => {
  const [listOpdLama, setListOpdLama] = useState<OPD[]>([]);
  const [listOpdBaru, setListOpdBaru] = useState<OPD[]>([]);
  const [listSektoral, setListSektoral] = useState<Sektoral[]>([]);
  
  const [formData, setFormData] = useState<FormData>({
    opdLama: "",
    sektoral: "",
    opdBaru: "",
  });

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  const fetchOPD = async () => {
    try {
      const response = await fetch(`${API_URL}/strict/ref-data/list-opd`, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      if (!response.ok) throw new Error("Gagal mengambil data OPD");

      const result = await response.json();
      const finalData = result?.data ?? result?.hasil ?? result?.result ?? (Array.isArray(result) ? result : []);
      
      setListOpdLama(finalData || []);
      setListOpdBaru(finalData || []);
    } catch (error) {
      console.error("Error fetching OPD:", error);
    }
  };

  const fetchSektoral = async (idOpd: string) => {
    if (!idOpd) {
      setListSektoral([]);
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/strict/data-sektoral/${idOpd}`,
        {
          method: "GET",
          headers: getAuthHeaders(),
        }
      );

      if (!response.ok) throw new Error("Gagal mengambil data sektoral");

      const result = await response.json();
      const finalData = result?.data ?? result?.hasil ?? result?.result ?? (Array.isArray(result) ? result : []);
      
      setListSektoral(finalData || []);
    } catch (error) {
      console.error("Error fetching sektoral:", error);
      setListSektoral([]);
    }
  };

  const loadData = async () => {
    setLoadingData(true);
    await fetchOPD();
    setLoadingData(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (formData.opdLama) {
      fetchSektoral(formData.opdLama);
    }
  }, [formData.opdLama]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    if (field === "opdLama") {
      setFormData({ ...formData, opdLama: value, sektoral: "" });
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

  const resetForm = () => {
    setFormData({
      opdLama: "",
      sektoral: "",
      opdBaru: "",
    });
    setListSektoral([]);
    setMessage(null);
  };

  const validateForm = () => {
    if (!formData.opdLama || !formData.sektoral || !formData.opdBaru) {
      setMessage({ type: "error", text: "Semua field harus diisi" });
      return false;
    }

    if (formData.opdLama === formData.opdBaru) {
      setMessage({ type: "error", text: "OPD lama dan OPD baru tidak boleh sama" });
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      setMessage(null);

      const payload = {
        active: true,
        id_opd_baru: formData.opdBaru,
        id_opd_lama: formData.opdLama,
      };

      const response = await fetch(
        `${API_URL}/strict/data-sektoral/assign-sektoral/${formData.sektoral}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const err = await response.text();
        throw new Error(err || "Gagal merelokasi data");
      }

      setMessage({ type: "success", text: "Data sektoral berhasil direlokasi!" });

      setTimeout(() => {
        resetForm();
      }, 2000);
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error.message || "Terjadi kesalahan saat relokasi",
      });
    } finally {
      setLoading(false);
    }
  };

  const selectedOpdLama = listOpdLama.find(opd => String(opd.id_opd) === formData.opdLama);
  const selectedOpdBaru = listOpdBaru.find(opd => String(opd.id_opd) === formData.opdBaru);
  const selectedSektoral = listSektoral.find(s => String(s.id) === formData.sektoral);

  return {
    listOpdLama,
    listOpdBaru,
    listSektoral,
    formData,
    loading,
    loadingData,
    message,
    selectedOpdLama,
    selectedOpdBaru,
    selectedSektoral,
    handleInputChange,
    handleSubmit,
    resetForm
  };
};