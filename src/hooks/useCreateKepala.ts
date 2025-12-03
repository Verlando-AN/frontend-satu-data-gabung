import { useState } from "react";
import { getAuthHeaders } from "@/api/auth";
import client from "@/api/client"

const API_URL = client.defaults.baseURL || "";

interface ApiResponse {
  success?: boolean;
  message?: string;
  email?: string;
  full_name?: string;
  nip?: string;
}

export interface AlertMessage {
  type: "success" | "error";
  text: string;
}

export interface FormState {
  email: string;
  fullName: string;
  nip: string;
}

export const useCreateKepala = () => {
  const [form, setForm] = useState<FormState>({
    email: "",
    fullName: "",
    nip: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<AlertMessage | null>(null);

  const handleInputChange = (field: keyof FormState, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const resetForm = () => {
    setForm({
      email: "",
      fullName: "",
      nip: "",
    });
    setMessage(null);
  };

  const validateForm = () => {
    if (!form.email || !form.fullName || !form.nip) {
      setMessage({ type: "error", text: "Semua field harus diisi" });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
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
      const response = await fetch(
        `${API_URL}/strict/account/add-kepala-bidang`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
          },
          body: JSON.stringify({
            email: form.email,
            full_name: form.fullName,
            nip: form.nip,
          }),
        }
      );

      const result: ApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || "Gagal membuat akun");
      }

      setMessage({
        type: "success",
        text: result?.message || "Berhasil membuat akun Kepala Bidang",
      });

      setTimeout(() => {
        resetForm();
      }, 2500);
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "Gagal mengirim data" });
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    message,
    handleInputChange,
    handleSubmit,
    resetForm
  };
};