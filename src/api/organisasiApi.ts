import client from "./client";

export interface OrganisasiItem {
  id: number;
  nama_opd: string;
  [key: string]: any;
}

export interface OrganisasiResponse extends Array<OrganisasiItem> {}

const organisasiApi = {
  async getOrganisasiList(): Promise<OrganisasiResponse> {
    const res = await client.get<OrganisasiResponse>("/list-opd");
    return res.data;
  },
};

export default organisasiApi;
