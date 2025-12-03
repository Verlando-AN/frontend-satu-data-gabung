import { useState, useEffect } from "react";
import { getAuthHeaders } from "@/api/auth";
import client from "@/api/client"

const API_URL = client.defaults.baseURL || "";

export interface ProfileResponse {
  id: string;
  nip: string;
  email: string;
  phone: string;
  level: number;
  level_string: string;
  full_name: string;
  kode_wilayah: string;
  id_opd: number;
  kode_bidang_urusan_1: string;
  kode_bidang_urusan_2: string;
  kode_bidang_urusan_3: string;
  kode_main_opd: string;
  kode_sub_opd: string;
  kode_opd: string;
  nama_opd: string;
  level_opd: number;
  level_opd_string: string;
}

export interface PasswordFormState {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const useProfile = () => {
  const [data, setData] = useState<ProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState<PasswordFormState>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/strict/user/profile`, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      if (!response.ok) throw new Error(`HTTP Error ${response.status}`);

      const result = await response.json();
      const finalData = result?.data ?? result?.hasil ?? result?.result ?? result;

      setData(finalData || null);
    } catch (error) {
      console.error("Error fetching:", error);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    switch (field) {
      case 'current':
        setShowCurrentPassword(!showCurrentPassword);
        break;
      case 'new':
        setShowNewPassword(!showNewPassword);
        break;
      case 'confirm':
        setShowConfirmPassword(!showConfirmPassword);
        break;
    }
  };

  const handlePasswordChange = (field: keyof PasswordFormState, value: string) => {
    setPasswordForm({ ...passwordForm, [field]: value });
  };

  const resetPasswordForm = () => {
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setPasswordMessage(null);
  };

  const validatePasswordForm = () => {
    const { currentPassword, newPassword, confirmPassword } = passwordForm;
    
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'Semua field harus diisi' });
      return false;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'Password baru dan konfirmasi tidak cocok' });
      return false;
    }

    if (newPassword.length < 6) {
      setPasswordMessage({ type: 'error', text: 'Password minimal 6 karakter' });
      return false;
    }

    return true;
  };

  const handleChangePassword = async () => {
    if (!validatePasswordForm()) return;

    try {
      setPasswordLoading(true);
      setPasswordMessage(null);

      const response = await fetch(`${API_URL}/strict/user/change-password`, {
        method: "POST",
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          current_password: passwordForm.currentPassword,
          new_password: passwordForm.newPassword,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Gagal mengubah password');
      }

      setPasswordMessage({ type: 'success', text: 'Password berhasil diubah!' });
      
      resetPasswordForm();
      
    } catch (error: any) {
      setPasswordMessage({ type: 'error', text: error.message || 'Terjadi kesalahan' });
    } finally {
      setPasswordLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading,
    passwordForm,
    passwordLoading,
    passwordMessage,
    showCurrentPassword,
    showNewPassword,
    showConfirmPassword,
    togglePasswordVisibility,
    handlePasswordChange,
    handleChangePassword,
    resetPasswordForm,
    refreshProfile: fetchData
  };
};