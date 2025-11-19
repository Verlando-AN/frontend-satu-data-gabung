import client from "./client";

const organisasiApi = {
  async getOrganisasiList() {
    const res = await client.get("/list-opd");
    return res.data;
  },
};

export default organisasiApi;
