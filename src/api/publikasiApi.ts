import client from "./client";

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

const publikasiApi = {
  async getPublikasiList(): Promise<PublikasiItem[]> {
    const res = await client.get<PublikasiItem[]>("/buku-digital");
    return res.data;
  },

async getPublikasiDetail(slug: string): Promise<any | null> {
  const res = await client.get<any[]>(
    `/buku-digital/detail/${slug}`
  );
  return res.data?.[0] || null;
},

};

export default publikasiApi;
