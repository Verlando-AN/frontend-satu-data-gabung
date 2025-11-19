import client from "./client";

const sektoralApi = {
  async getOpdList() {
    const res = await client.get("/list-opd");
    return res.data;
  },

  async getDataSektoral({ selectedOPD, dariTahun, sampaiTahun, page = 1, perPage = 20 }) {
    const url = `/data-sektoral/list-by-opd?id_user_opd=${selectedOPD}&dari_tahun=${dariTahun}&sampai_tahun=${sampaiTahun}&page=${page}&per_page=${perPage}`;
    const res = await client.get(url);

    const current = parseInt(res.headers["x-pagination-current-page"]) || 1;
    const total = parseInt(res.headers["x-pagination-page-count"]) || 1;
    const totalCount = parseInt(res.headers["x-pagination-total-count"]) || 0;

    const data = Array.isArray(res.data.data) ? res.data.data : res.data;

    return { data, current, total, totalCount };
  },
};

export default sektoralApi;
