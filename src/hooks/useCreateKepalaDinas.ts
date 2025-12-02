import { useState, useEffect } from "react";
import { getAuthHeaders } from "@/api/auth";

const API_URL =
  import.meta.env.VITE_API_URL || "https://api-satudata.lampungtimurkab.go.id";

export interface OPD {
  id_opd: number;
  nama_opd: string;
}

export interface FormData {
  email: string;
  fullName: string;
  nip: string;
  idOpd: string;
}

export interface AlertMessage {
  type: "success" | "error";
  text: string;
}

export const useCreateKepalaDinas = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    fullName: "",
    nip: "",
    idOpd: "",
  });

  const [listOpd, setListOpd] = useState<OPD[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingOpd, setLoadingOpd] = useState(true);
  const [message, setMessage] = useState<AlertMessage | null>(null);

  const fetchOPD = async () => {
    try {
      setLoadingOpd(true);
      const response = await fetch(`${API_URL}/strict/ref-data/list-opd`, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      if (!response.ok) throw new Error("Gagal mengambil data OPD");

      const result = await response.json();
      const finalData = result?.data ?? result?.hasil ?? result?.result ?? (Array.isArray(result) ? result : []);

      setListOpd(finalData || []);
    } catch (error) {
      console.error("Error fetching OPD:", error);
      setMessage({ type: "error", text: "Gagal memuat data OPD" });
    } finally {
      setLoadingOpd(false);
    }
  };

  useEffect(() => {
    fetchOPD();
  }, []);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const resetForm = () => {
    setFormData({
      email: "",
      fullName: "",
      nip: "",
      idOpd: "",
    });
    setMessage(null);
  };

  const validateForm = () => {
    if (!formData.email || !formData.fullName || !formData.nip || !formData.idOpd) {
      setMessage({ type: "error", text: "Semua field harus diisi" });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage({ type: "error", text: "Format email tidak valid" });
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setMessage(null);

    try {
      const payload = {
        email: formData.email,
        full_name: formData.fullName,
        nip: formData.nip,
        id_opd: Number(formData.idOpd),
      };

      const response = await fetch(`${API_URL}/strict/account/add-kepala-opd`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log("API Result:", result);

      if (!response.ok) {
        throw new Error(result?.message || "Gagal membuat akun");
      }

      setMessage({ type: "success", text: result?.message || "Berhasil membuat akun Kepala Dinas" });

      setTimeout(() => {
        resetForm();
      }, 3000);
    } catch (error: any) {
      console.error(error);
      setMessage({ type: "error", text: error.message || "Gagal mengirim data" });
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    listOpd,
    loading,
    loadingOpd,
    message,
    handleInputChange,
    handleSubmit,
    resetForm
  };
};