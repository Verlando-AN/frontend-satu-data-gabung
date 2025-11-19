import apiClient from "./client";

export const getUrusanList = async () => {
  const response = await apiClient.get("/list-opd/urusan");
  return response.data;
};

export const getDataSektoralByUrusan = async (
  kode_urusan,
  dariTahun,
  sampaiTahun,
  page = 1,
  perPage = 20
) => {
  const response = await apiClient.get(
    `/data-sektoral/list-by-urusan`,
    {
      params: {
        kode_urusan,
        dari_tahun: dariTahun,
        sampai_tahun: sampaiTahun,
        page,
        per_page: perPage,
      },
    }
  );

  const pagination = {
    current: parseInt(response.headers["x-pagination-current-page"]) || 1,
    total: parseInt(response.headers["x-pagination-page-count"]) || 1,
    perPage: parseInt(response.headers["x-pagination-page-size"]) || 20,
    totalCount: parseInt(response.headers["x-pagination-total-count"]) || 0,
  };

  return { data: response.data.data || response.data, pagination };
};
