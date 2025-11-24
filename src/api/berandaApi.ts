import client from "./client"

// =========================
// Interface response API
// =========================

export interface OpdItem {
  id: number
  nama_opd: string
  [key: string]: any
}

export interface TotalData {
  dataset: number
  data_sektoral: number
  urusan: number
}

interface TotalResponse {
  total: TotalData
}

const berandaApi = {
  // =========================
  // Ambil daftar OPD
  // =========================
  getOpdList: async (): Promise<OpdItem[]> => {
    const res = await client.get<OpdItem[]>("/list-opd")
    return res.data
  },

  // =========================
  // Ambil statistik data total
  // =========================
  getTotalData: async (): Promise<TotalData> => {
    const res = await client.get<TotalResponse>("/data-sektoral/beranda")

    if (res.data && res.data.total) {
      return res.data.total
    }

    return {
      dataset: 0,
      data_sektoral: 0,
      urusan: 0,
    }
  },
}

export default berandaApi
