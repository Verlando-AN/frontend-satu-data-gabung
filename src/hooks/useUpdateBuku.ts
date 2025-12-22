import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAuthHeaders } from "@/api/auth";
import client from "@/api/client"

const API_URL = client.defaults.baseURL || "";

interface BukuDetail {
  id_buku_digital: number;
  id_opd: number;
  tahun: number;
  buku: string;
  file: string;
}

export const useUpdateBuku = () => {
  const { id } = useParams();
  const id_buku_digital = Number(id);

  const [formData, setFormData] = useState({
    id_opd: "",
    tahun: "",
    buku: "",
  });

  const [newFile, setNewFile] = useState<File | null>(null);
  const [oldFileUrl, setOldFileUrl] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  useEffect(() => {
    async function fetchDetail() {
      try {
        setLoading(true);
        setError("");

        if (!id_buku_digital) {
          setError("ID Buku tidak ditemukan di URL");
          return;
        }

        const res = await fetch(
          `${API_URL}/strict/ref-data/detail-buku-digital/${id_buku_digital}`,
          { headers: getAuthHeaders() }
        );

        if (!res.ok) {
          throw new Error("Gagal mengambil data buku");
        }

        const data: BukuDetail = await res.json();

        setFormData({
          id_opd: data.id_opd.toString(),
          tahun: data.tahun.toString(),
          buku: data.buku,
        });

        setOldFileUrl(`${API_URL}/${data.file}`);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Gagal memuat detail buku");
      } finally {
        setLoading(false);
      }
    }

    fetchDetail();
  }, [id_buku_digital]);

  async function getOldFileAsBlob(): Promise<File | null> {
    try {
      const response = await fetch(oldFileUrl);
      if (!response.ok) throw new Error("Gagal mengunduh file lama");

      const blob = await response.blob();
      const filename = oldFileUrl.split("/").pop() || "old-file.pdf";

      return new File([blob], filename, { type: blob.type });
    } catch (error) {
      return null;
    }
  }

  const handleSubmit = async () => {
    if (!formData.id_opd || !formData.tahun || !formData.buku) {
      setError("Semua field harus diisi");
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      setSuccess("");

      let fileToUpload: File | null = newFile;

      if (!fileToUpload) {
        fileToUpload = await getOldFileAsBlob();
        if (!fileToUpload) throw new Error("Gagal memuat file lama");
      }

      const form = new FormData();
      form.append("files", fileToUpload);

      const queryParams = new URLSearchParams({
        id_opd: formData.id_opd,
        tahun: formData.tahun,
        buku: formData.buku,
      });

      const headers = getAuthHeaders();
      delete headers["Content-Type"];

      const response = await fetch(
        `${API_URL}/strict/ref-data/update-buku-digital/${id_buku_digital}?${queryParams.toString()}`,
        {
          method: "PUT",
          headers: {
            ...headers,
            accept: "application/json",
          },
          body: form,
        }
      );

      const result = await response.json();

      if (response.ok) {
        setSuccess("Berhasil mengupdate buku digital!");
        setNewFile(null);
      } else {
        throw new Error(result.message || "Gagal mengupdate buku digital");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal melakukan update");
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleFileChange = (file: File | null) => {
    setNewFile(file);
  };

  const resetMessages = () => {
    setError("");
    setSuccess("");
  };

  return {
    formData,
    newFile,
    oldFileUrl,
    loading,
    submitting,
    error,
    success,
    handleInputChange,
    handleFileChange,
    handleSubmit,
    resetMessages
  };
};