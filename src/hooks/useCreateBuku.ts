import { useState, useEffect } from "react";
import { getAuthHeaders } from "@/api/auth";

const API_URL =
  import.meta.env.VITE_API_URL || "https://api-satudata.lampungtimurkab.go.id";

interface OPD {
  id_opd: number;
  nama_opd: string;
}

export const useCreateBuku = () => {
  const [formData, setFormData] = useState({
    judulBuku: "",
    idOpd: "",
    tahun: "",
    file: null as File | null,
  });

  const [listOpd, setListOpd] = useState<OPD[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingOpd, setLoadingOpd] = useState(true);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [fileName, setFileName] = useState("");

  const getUploadHeaders = () => {
    const headers = getAuthHeaders();
    delete headers["Content-Type"];
    return headers;
  };

  const fetchOPD = async () => {
    try {
      setLoadingOpd(true);
      const response = await fetch(`${API_URL}/strict/ref-data/list-opd`, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      if (!response.ok) throw new Error("Gagal mengambil data OPD");

      const result = await response.json();
      const finalData =
        result?.data ?? result?.hasil ?? result?.result ?? (Array.isArray(result) ? result : []);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      setFormData({ ...formData, file: null });
      setFileName("");
      return;
    }

    if (file.type !== "application/pdf") {
      setMessage({ type: "error", text: "File harus berformat PDF" });
      e.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setMessage({ type: "error", text: "Ukuran file maksimal 10MB" });
      e.target.value = "";
      return;
    }

    setFormData({ ...formData, file });
    setFileName(file.name);
    setMessage(null);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const resetForm = () => {
    setFormData({
      judulBuku: "",
      idOpd: "",
      tahun: "",
      file: null,
    });
    setFileName("");
    setMessage(null);
  };

  const handleSubmit = async () => {
    if (!formData.judulBuku || !formData.idOpd || !formData.tahun) {
      setMessage({ type: "error", text: "Semua field harus diisi" });
      return;
    }

    if (!formData.file) {
      setMessage({ type: "error", text: "Silakan pilih file PDF terlebih dahulu" });
      return;
    }

    const tahunNum = parseInt(formData.tahun);
    if (isNaN(tahunNum) || tahunNum < 2000 || tahunNum > new Date().getFullYear() + 1) {
      setMessage({
        type: "error",
        text: `Tahun harus antara 2000 dan ${new Date().getFullYear() + 1}`,
      });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const form = new FormData();

      form.append("files", formData.file);
      
      const queryParams = new URLSearchParams();
      queryParams.append("id_opd", formData.idOpd);
      queryParams.append("tahun", formData.tahun);
      queryParams.append("buku", formData.judulBuku);

      const response = await fetch(
        `${API_URL}/strict/ref-data/create-publikasi?${queryParams.toString()}`,
        {
          method: "POST",
          headers: {
            ...getUploadHeaders(),
            accept: "application/json",
          },
          body: form,
        }
      );

      const responseText = await response.text();

      if (!response.ok) {
        throw new Error(responseText || "Gagal upload buku");
      }

      if (responseText.trim() === "true") {
        setMessage({ type: "success", text: "Buku berhasil ditambahkan!" });
      } else {
        try {
          const result = JSON.parse(responseText);
          setMessage({
            type: "success",
            text: result.message || result.data || "Buku berhasil ditambahkan!",
          });
        } catch {
          setMessage({ type: "success", text: responseText });
        }
      }

      resetForm();

    } catch (err: any) {
      console.error("Error submitting form:", err);
      setMessage({
        type: "error",
        text: err.message || "Terjadi kesalahan saat upload buku",
      });
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
    fileName,
    handleFileChange,
    handleInputChange,
    resetForm,
    handleSubmit
  };
};