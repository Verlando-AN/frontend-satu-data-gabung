import client from "./client";

// =====================
// Interfaces
// =====================

// Jika kamu tahu struktur data publikasi, bisa ditambah.
// Untuk sekarang dibuat generic dan fleksibel.
export interface PublikasiItem {
  id: number;
  title: string;
  slug: string;
  [key: string]: any;
}

export interface PublikasiDetail {
  id: number;
  title: string;
  slug: string;
  content?: string;
  [key: string]: any;
}

// =====================
// API
// =====================
const publikasiApi = {
  async getPublikasiList(): Promise<PublikasiItem[]> {
    const res = await client.get<PublikasiItem[]>("/buku-digital");
    return res.data;
  },

  async getPublikasiDetail(slug: string): Promise<PublikasiDetail> {
    const res = await client.get<PublikasiDetail>(`/buku-digital/detail/${slug}`);
    return res.data;
  },
};

export default publikasiApi;
