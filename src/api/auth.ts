/**
 * Struktur payload untuk login
 */
export interface LoginPayload {
    nip: string;
    password: string;
}

/**
 * Struktur respons login dari server
 */
export interface LoginResponse {
    token: string;
    user: {
        id: number;
        name: string;
        email: string;
    };
}

/**
 * URL dasar API backend
 * Gunakan environment variable (mis. VITE_API_URL) untuk konfigurasi fleksibel
 */
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

/**
 * Fungsi login — kirim email dan password ke backend
 */
export async function login(payload: LoginPayload): Promise<LoginResponse> {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            // Coba ambil pesan error dari backend
            const error = await response.json().catch(() => ({}));
            throw new Error(error.message || "Gagal login");
        }

        const data: LoginResponse = await response.json();

        // Simpan token ke localStorage agar bisa digunakan kembali
        localStorage.setItem("token", data.token);

        return data;
    } catch (error: any) {
        throw new Error(error.message || "Terjadi kesalahan jaringan");
    }
}

/**
 * Fungsi logout — hapus token dari localStorage
 */
export function logout(): void {
    localStorage.removeItem("token");
}

/**
 * Ambil token dari localStorage
 */
export function getToken(): string | null {
    return localStorage.getItem("token");
}

/**
 * Cek apakah user sudah login (ada token)
 */
export function isAuthenticated(): boolean {
    return !!getToken();
}

/**
 * Helper untuk membuat header otorisasi (Authorization Bearer Token)
 * — digunakan untuk request ke endpoint yang butuh autentikasi
 */
// eksport lama
// export function getAuthHeaders(): HeadersInit {
//     const token = getToken();
//     return token
//         ? {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//         }
//         : {
//             "Content-Type": "application/json",
//         };
// }

export function getAuthHeaders() {
  const token = getToken();

  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}