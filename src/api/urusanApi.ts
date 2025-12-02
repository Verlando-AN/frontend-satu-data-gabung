import apiClient from "./client";

// =======================
// Interface Types
// =======================

export interface UrusanItem {
  id: number;
  kode_urusan: string;
  nama_urusan: string;
  [key: string]: any;
}

export interface SektoralUrusanItem {
  id: number;
  tahun: number;
  nilai: number;
  [key: string]: any;
}

export interface PaginationInfo {
  current: number;
  total: number;
  perPage: number;
  totalCount: number;
}

export interface GetDataSektoralByUrusanResponse {
  data: SektoralUrusanItem[];
  pagination: PaginationInfo;
}

// =======================
// API Functions
// =======================

export const getUrusanList = async (): Promise<UrusanItem[]> => {
  const response = await apiClient.get<UrusanItem[]>("/list-opd/urusan");
  return response.data;
};

export const getDataSektoralByUrusan = async (
  kode_urusan: string | number,
  dariTahun: string | number,
  sampaiTahun: string | number,
  page: number = 1,
  perPage: number = 20
): Promise<GetDataSektoralByUrusanResponse> => {
  const response = await apiClient.get("/data-sektoral/list-by-urusan", {
    params: {
      kode_urusan,
      dari_tahun: dariTahun,
      sampai_tahun: sampaiTahun,
      page,
      per_page: perPage,
    },
  });

  const pagination: PaginationInfo = {
    current: parseInt(response.headers["x-pagination-current-page"]) || 1,
    total: parseInt(response.headers["x-pagination-page-count"]) || 1,
    perPage: parseInt(response.headers["x-pagination-page-size"]) || 20,
    totalCount: parseInt(response.headers["x-pagination-total-count"]) || 0,
  };

  // Pastikan data selalu array
  const data: SektoralUrusanItem[] = Array.isArray(response.data.data)
    ? response.data.data
    : response.data;

  return { data, pagination };
};
