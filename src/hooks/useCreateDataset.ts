import { useState } from "react";
import { useParams } from "react-router-dom";
import { getAuthHeaders } from "@/api/auth";

const API_URL =
  import.meta.env.VITE_API_URL || "https://api-satudata.lampungtimurkab.go.id";

export interface FormState {
  title_dataset: string;
  description: string;
  fn: string;
  has_email: string;
  nama_publisher: string;
  issued: string;
  keyword: string;
  theme: string;
}

export const useCreateDataset = () => {
  const { id } = useParams();
  const [file, setFile] = useState<File | null>(null);
  const [form, setForm] = useState<FormState>({
    title_dataset: "",
    description: "",
    fn: "",
    has_email: "",
    nama_publisher: "",
    issued: "",
    keyword: "",
    theme: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleInputChange = (field: keyof FormState, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleFileChange = (file: File | null) => {
    setFile(file);
  };

  const resetForm = () => {
    setForm({
      title_dataset: "",
      description: "",
      fn: "",
      has_email: "",
      nama_publisher: "",
      issued: "",
      keyword: "",
      theme: "",
    });
    setFile(null);
  };

  const validateForm = () => {
    if (!id || !file) {
      setMessage({
        type: "error",
        text: "ID Ref Sektoral & File wajib diisi!",
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
      const fd = new FormData();
      fd.append("files", file);

      const query = new URLSearchParams({
        ...form,
      }).toString();

      const res = await fetch(
        `${API_URL}/strict/dataset/create-dataset/${id}?${query}`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            ...getAuthHeaders(),
          },
          body: fd,
        }
      );

      const text = await res.text();
      console.log("API RESPONSE:", text);

      if (!res.ok) throw new Error("Gagal membuat dataset");

      setMessage({ type: "success", text: "Dataset berhasil dibuat!" });

      resetForm();

      setTimeout(() => setMessage(null), 3000);
    } catch (err: any) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return {
    id,
    file,
    form,
    loading,
    message,
    handleInputChange,
    handleFileChange,
    handleSubmit,
    resetForm
  };
};