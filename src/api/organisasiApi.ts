import client from "./client";

// =====================
// Interface Response
// =====================
export interface OrganisasiItem {
  id: number;
  nama_opd: string;
  [key: string]: any; // opsional bila ada field tambahan
}

export interface OrganisasiResponse extends Array<OrganisasiItem> {}

// =====================
// API
// =====================
const organisasiApi = {
  async getOrganisasiList(): Promise<OrganisasiResponse> {
    const res = await client.get<OrganisasiResponse>("/list-opd");
    return res.data;
  },
};

export default organisasiApi;
