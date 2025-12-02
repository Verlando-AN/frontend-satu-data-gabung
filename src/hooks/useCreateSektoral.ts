import { useState } from "react";
import { getAuthHeaders } from "@/api/auth";

const API_URL =
  import.meta.env.VITE_API_URL || "https://api-satudata.lampungtimurkab.go.id";

export interface FormData {
  kodeUrusan: string;
  jenis: string;
  kategori: string;
  kodeDssd: string;
  uraianDssd: string;
  satuan: string;
  dimensi: string;
}

export const useCreateSektoral = () => {
  const [formData, setFormData] = useState<FormData>({
    kodeUrusan: "",
    jenis: "",
    kategori: "",
    kodeDssd: "",
    uraianDssd: "",
    satuan: "",
    dimensi: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const resetForm = () => {
    setFormData({
      kodeUrusan: "",
      jenis: "",
      kategori: "",
      kodeDssd: "",
      uraianDssd: "",
      satuan: "",
      dimensi: "",
    });
  };

  const validateForm = () => {
    if (
      !formData.kodeUrusan ||
      !formData.jenis ||
      !formData.kategori ||
      !formData.kodeDssd ||
      !formData.uraianDssd ||
      !formData.satuan
    ) {
      setMessage({
        type: "error",
        text: "Semua field wajib diisi kecuali dimensi",
      });
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
        dimensi: formData.dimensi || "Tahun",
        jenis: String(formData.jenis),
        kategori: String(formData.kategori),
        kode_dssd: formData.kodeDssd,
        kode_urusan: formData.kodeUrusan,
        satuan: formData.satuan,
        uraian_dssd: formData.uraianDssd,
      };

      console.log("PAYLOAD:", payload);

      const res = await fetch(
        `${API_URL}/strict/data-sektoral/create-sektoral`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            ...getAuthHeaders(),
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        console.log("ERROR RESPONSE:", errorText);
        throw new Error("Gagal menyimpan data");
      }

      setMessage({
        type: "success",
        text: "Data sektoral berhasil disimpan!",
      });

      resetForm();

      setTimeout(() => setMessage(null), 3000);

    } catch (err: any) {
      setMessage({
        type: "error",
        text: err.message || "Terjadi kesalahan",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    message,
    handleInputChange,
    handleSubmit,
    resetForm
  };
};