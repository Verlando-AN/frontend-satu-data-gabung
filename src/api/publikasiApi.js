import client from "./client";

const publikasiApi = {
  async getPublikasiList() {
    const res = await client.get("/buku-digital");
    return res.data;
  },

  async getPublikasiDetail(slug) {
    const res = await client.get(`/buku-digital/detail/${slug}`);
    return res.data;
  },
};

export default publikasiApi;
