import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAuthHeaders } from "@/api/auth";
import client from "@/api/client";

const API_URL = client.defaults.baseURL || "";


interface TagBuku {
  id_tag: number;
  nama_tag: string;
}

interface BukuDetail {
  id_buku_digital: number;
  id_opd: number;
  tahun: number;
  buku: string;
  deskripsi?: string;
  file: string;
  tags?: TagBuku[];
}

export const useUpdateBuku = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const id_buku_digital = Number(id);

  const [formData, setFormData] = useState({
    id_opd: "",
    tahun: "",
    buku: "",
    deskripsi: "",
    tag_ids: [] as string[],
  });

  const [newFile, setNewFile] = useState<File | null>(null);
  const [oldFileUrl, setOldFileUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
          {
            headers: getAuthHeaders(),
          }
        );

        if (!res.ok) {
          throw new Error("Gagal mengambil data buku");
        }

        const data: BukuDetail = await res.json();

        setFormData({
          id_opd: data.id_opd?.toString() || "",
          tahun: data.tahun?.toString() || "",
          buku: data.buku || "",
          deskripsi: data.deskripsi || "",
          tag_ids:
            data.tags?.map((item) => item.id_tag.toString()) || [],
        });

      setOldFileUrl(data.file ? `${API_URL}/${data.file}` : "");
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Gagal memuat detail buku"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchDetail();
  }, [id_buku_digital]);

  const handleInputChange = (
    field: string,
    value: string | string[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTagChange = (tagId: string) => {
    resetMessages();

    setFormData((prev) => ({
      ...prev,
      tag_ids: prev.tag_ids.includes(tagId)
        ? prev.tag_ids.filter((id) => id !== tagId)
        : [...prev.tag_ids, tagId],
    }));
  };

  const handleFileChange = (file: File | null) => {
    setNewFile(file);
  };

  const handleSubmit = async () => {
    if (
      !formData.id_opd ||
      !formData.tahun ||
      !formData.buku ||
      !formData.deskripsi
    ) {
      setError("Semua field harus diisi");
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      setSuccess("");

      const form = new FormData();

      // Hanya kirim file jika user memilih file baru
      if (newFile) {
        form.append("files", newFile);
      }

      const queryParams = new URLSearchParams({
        id_opd: formData.id_opd,
        tahun: formData.tahun,
        buku: formData.buku,
        deskripsi: formData.deskripsi,
      });

      if (formData.tag_ids.length > 0) {
        queryParams.append(
          "tag_ids",
          formData.tag_ids.join(",")
        );
      }

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

      if (!response.ok) {
        throw new Error(
          result.message || "Gagal mengupdate buku digital"
        );
      }

      setSuccess("Berhasil mengupdate buku digital!");
      setNewFile(null);

    setTimeout(() => {
      navigate(-1);
    }, 1000);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Gagal melakukan update"
      );
    } finally {
      setSubmitting(false);
    }
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
    handleTagChange,
    handleFileChange,
    handleSubmit,
    resetMessages,
  };
};