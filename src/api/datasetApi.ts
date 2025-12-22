import client from "./client";

const datasetApi = {
  async getProdusenList() {
    try {
      const res = await client.get("/list-opd");
      return res.data;
    } catch (error) {
      console.error("Error getProdusenList:", error);
      return [];
    }
  },

  async getDatasets(
  page: number = 1,
  id_opd: number | null = null,
  perPage: number = 7
  ) {
    try {
      let url = `/dataset?per_page=${perPage}&page=${page}`;
      if (id_opd) url += `&id_user_opd=${id_opd}`;

      const res = await client.get(url);

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

      return {
        data: [],
        current: 1,
        total: 1,
        totalCount: 0,
      };
    }
  },

  async getDatasetDetail(id: any) {
    try {
      const res = await client.get(`/dataset/detail/${id}`);
      return res.data;
    } catch (error) {
      console.error("Error getDatasetDetail:", error);
      return null;
    }
  },
};

export default datasetApi;
