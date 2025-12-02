import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAuthHeaders } from "@/api/auth";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://api-satudata.lampungtimurkab.go.id";

export interface UserData {
  id: string;
  id_opd: number;
  full_name: string;
  nip: string;
  email: string;
}

export interface ApiResponse {
  success?: boolean;
  message?: string;
  data?: UserData;
}

export interface AlertMessage {
  type: "success" | "error";
  text: string;
}

export interface FormState {
  email: string;
  fullName: string;
  nip: string;
  opd: number | "";
}

export const useEditKepalaDinas = () => {
  const navigate = useNavigate();
  const { id_user } = useParams<{ id_user: string }>();
  const userId = id_user;

  const [form, setForm] = useState<FormState>({
    email: "",
    fullName: "",
    nip: "",
    opd: "",
  });
  const [loading, setLoading] = useState(false);
  const [loadingFetch, setLoadingFetch] = useState(true);
  const [message, setMessage] = useState<AlertMessage | null>(null);

  useEffect(() => {
    if (!userId) {
      setMessage({ type: "error", text: "ID user tidak ditemukan" });
      setLoadingFetch(false);
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) return;

    const getData = async () => {
      try {
        setLoadingFetch(true);
        const response = await fetch(
          `${API_URL}/strict/account/kepala-bidang-by-id/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              ...getAuthHeaders(),
            },
          }
        );

        const result = await response.json();
        console.log("API Result:", result);

        if (Array.isArray(result) && result.length > 0) {
          const userData = result[0];
          console.log("User Data:", userData);
          
          setForm({
            email: userData.email ?? "",
            fullName: userData.full_name ?? "",
            nip: userData.nip ?? "",
            opd: userData.id_opd ?? "",
          });
        } 
        else if (result && result.data) {
          setForm({
            email: result.data.email ?? "",
            fullName: result.data.full_name ?? "",
            nip: result.data.nip ?? "",
            opd: result.data.id_opd ?? "",
          });
        }
        else {
          setMessage({ type: "error", text: "Data user tidak ditemukan" });
        }
      } catch (error: any) {
        console.error(error);
        setMessage({ type: "error", text: error.message || "Terjadi kesalahan saat mengambil data" });
      } finally {
        setLoadingFetch(false);
      }
    };

    getData();
  }, [userId]);

  const handleInputChange = (field: keyof FormState, value: string | number) => {
    setForm({ ...form, [field]: value });
  };

  const validateForm = () => {
    if (!form.email || !form.fullName || !form.nip || !form.opd) {
      setMessage({ type: "error", text: "Semua field harus diisi" });
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
        email: form.email,
        full_name: form.fullName,
        nip: form.nip
      };

      console.log("Sending data to API:", payload);
      console.log("API URL:", `${API_URL}/strict/account/update-kepala-bidang/${userId}`);

      const response = await fetch(
        `${API_URL}/strict/account/update-kepala-bidang/${userId}`,
        {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
          },
          body: JSON.stringify(payload),
        }
      );

      const result: ApiResponse = await response.json();
      console.log("Update Result:", result);

      if (!response.ok) {
        throw new Error(result?.message || "Gagal update akun");
      }

      setMessage({
        type: "success",
        text: result?.message || "Akun berhasil diperbarui",
      });
    } catch (error: any) {
      console.error(error);
      setMessage({ type: "error", text: error.message || "Terjadi kesalahan saat update" });
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return {
    userId,
    form,
    loading,
    loadingFetch,
    message,
    handleInputChange,
    handleSubmit,
    goBack
  };
};