import client from "./client";

const berandaApi = {
  getOpdList: async () => {
    const res = await client.get("/list-opd");
    return res.data;
  },

  getTotalData: async () => {
    const res = await client.get("/data-sektoral/beranda");
    if (res.data && res.data.total) {
      return res.data.total;
    }
    return { dataset: 0, data_sektoral: 0, urusan: 0 };
  },
};

export default berandaApi;
