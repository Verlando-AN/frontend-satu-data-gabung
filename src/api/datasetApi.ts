import client from "./client";

const datasetApi = {
  // ============================
  // GET LIST OPD
  // ============================
  async getProdusenList() {
    try {
      const res = await client.get("/list-opd");
      return res.data;
    } catch (error) {
      console.error("Error getProdusenList:", error);
      return []; // fallback aman
    }
  },

  // ============================
  // GET DATASET + PAGINATION
  // ============================
  async getDatasets(page = 1, id_opd = null, perPage = 7) {
    try {
      let url = `/dataset?per_page=${perPage}&page=${page}`;
      if (id_opd) url += `&id_user_opd=${id_opd}`;

      const res = await client.get(url);

      // Header pagination (dari API Yii2 / Laravel custom)
      const current =
        parseInt(res.headers["x-pagination-current-page"]) ||
        res.data?.meta?.current_page ||
        1;

      const total =
        parseInt(res.headers["x-pagination-page-count"]) ||
        res.data?.meta?.last_page ||
        1;

      const totalCount =
        parseInt(res.headers["x-pagination-total-count"]) ||
        res.data?.meta?.total ||
        0;

      return {
        data: res.data?.data || res.data,
        current,
        total,
        totalCount,
      };
    } catch (error) {
      console.error("Error getDatasets:", error);

      // fallback respons kosong agar UI tidak error
      return {
        data: [],
        current: 1,
        total: 1,
        totalCount: 0,
      };
    }
  },

  // ============================
  // GET DETAIL DATASET
  // ============================
  async getDatasetDetail(id: any) {
    try {
      const res = await client.get(`/dataset/detail/${id}`);
      return res.data;
    } catch (error) {
      console.error("Error getDatasetDetail:", error);
      return null; // fallback aman
    }
  },
};

export default datasetApi;
