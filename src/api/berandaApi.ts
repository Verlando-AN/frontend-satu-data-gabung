import client from "./client"

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
  getOpdList: async (): Promise<OpdItem[]> => {
    const res = await client.get<OpdItem[]>("/list-opd")
    return res.data
  },

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
