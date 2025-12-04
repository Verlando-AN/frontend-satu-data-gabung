import client from "./client";

export interface OpdItem {
  id: number;
  nama_opd: string;
  [key: string]: any;
}

export interface SektoralItem {
  id: number;
  tahun: number;
  nilai: number;
  [key: string]: any;
}

export interface GetDataSektoralParams {
  selectedOPD: number | string;
  dariTahun: number | string;
  sampaiTahun: number | string;
  page?: number;
  perPage?: number;
}

export interface GetDataSektoralResponse {
  data: SektoralItem[];
  current: number;
  total: number;
  totalCount: number;
}

const sektoralApi = {
  async getOpdList(): Promise<OpdItem[]> {
    const res = await client.get<OpdItem[]>("/list-opd");
    return res.data;
  },

  async getDataSektoral(params: GetDataSektoralParams): Promise<GetDataSektoralResponse> {
    const {
      selectedOPD,
      dariTahun,
      sampaiTahun,
      page = 1,
      perPage = 20,
    } = params;

    const url = `/data-sektoral/list-by-opd?id_user_opd=${selectedOPD}&dari_tahun=${dariTahun}&sampai_tahun=${sampaiTahun}&page=${page}&per_page=${perPage}`;

    const res = await client.get(url);

    const current = parseInt(res.headers["x-pagination-current-page"]) || 1;
    const total = parseInt(res.headers["x-pagination-page-count"]) || 1;
    const totalCount = parseInt(res.headers["x-pagination-total-count"]) || 0;

    const data: SektoralItem[] = Array.isArray(res.data.data)
      ? res.data.data
      : res.data;

    return { data, current, total, totalCount };
  },
};

export default sektoralApi;
