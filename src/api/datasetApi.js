import client from "./client";

const datasetApi = {
  async getProdusenList() {
    const res = await client.get("/list-opd");
    return res.data;
  },

  async getDatasets(page = 1, id_opd = null, perPage = 7) {
    let url = `/dataset?per_page=${perPage}&page=${page}`;
    if (id_opd) url += `&id_user_opd=${id_opd}`;

    const res = await client.get(url);

    const current = parseInt(res.headers["x-pagination-current-page"]) || 1;
    const total = parseInt(res.headers["x-pagination-page-count"]) || 1;
    const totalCount = parseInt(res.headers["x-pagination-total-count"]) || 0;

    return {
      data: res.data,
      current,
      total,
      totalCount,
    };
  },

  async getDatasetDetail(id) {
    const res = await client.get(`/dataset/detail/${id}`);
    return res.data;
  },
};

export default datasetApi;
