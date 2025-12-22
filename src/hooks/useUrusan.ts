import { useState, useEffect } from "react";
import apiClient from "@/api/client";

export interface UrusanItem {
  id: number;
  kode_urusan: string;
  nama_urusan: string;
  [key: string]: any;
}

export interface InputItem {
  tahun?: number;
  [key: string]: any;
}

export interface SektoralUrusanItem {
  id: number;
  input?: InputItem[];
  tahun?: number;
  nilai?: number;
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

export const getUrusanList = async (): Promise<UrusanItem[]> => {
  const response = await apiClient.get("/list-opd/urusan");

  return Array.isArray(response.data) ? response.data : [];
};

export const getDataSektoralByUrusan = async (
  kode_urusan: string | number,
  dariTahun: string | number,
  sampaiTahun: string | number,
  page = 1,
  perPage = 20
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
    current: Number(response.headers["x-pagination-current-page"]) || 1,
    total: Number(response.headers["x-pagination-page-count"]) || 1,
    perPage: Number(response.headers["x-pagination-page-size"]) || perPage,
    totalCount: Number(response.headers["x-pagination-total-count"]) || 0,
  };

  const data: SektoralUrusanItem[] =
    Array.isArray(response.data?.data)
      ? response.data.data
      : Array.isArray(response.data)
      ? response.data
      : [];

  return { data, pagination };
};

export const useUrusan = () => {
  const [urusanList, setUrusanList] = useState<UrusanItem[]>([]);
  const [selectedOPD, setSelectedOPD] = useState<string>("");
  const [dariTahun, setDariTahun] = useState<string>("");
  const [sampaiTahun, setSampaiTahun] = useState<string>("");
  const [dataSektoral, setDataSektoral] = useState<SektoralUrusanItem[]>([]);
  const [tahunList, setTahunList] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  const [pagination, setPagination] = useState<PaginationInfo>({
    current: 1,
    total: 1,
    perPage: 20,
    totalCount: 0,
  });

  useEffect(() => {
    getUrusanList()
      .then(setUrusanList)
      .catch((err) => {
        console.error("Gagal memuat urusan:", err);
        setUrusanList([]);
      });
  }, []);

  const fetchData = async (page = 1) => {
    if (!selectedOPD || !dariTahun || !sampaiTahun) return;

    setLoading(true);
    try {
      const { data, pagination } = await getDataSektoralByUrusan(
        selectedOPD,
        dariTahun,
        sampaiTahun,
        page
      );

      setPagination(pagination);
      setDataSektoral(data);

      const tahunSet = new Set<number>();
      data.forEach((item) => {
        item.input?.forEach((i) => {
          if (i.tahun) tahunSet.add(i.tahun);
        });
      });

      setTahunList([...tahunSet].sort((a, b) => a - b));
    } catch (err) {
      console.error("Gagal mengambil data sektoral:", err);
      setDataSektoral([]);
      setTahunList([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    urusanList,
    selectedOPD,
    dariTahun,
    sampaiTahun,
    dataSektoral,
    tahunList,
    loading,
    pagination,
    setSelectedOPD,
    setDariTahun,
    setSampaiTahun,
    fetchData,
    handlePrev: () =>
      pagination.current > 1 && fetchData(pagination.current - 1),
    handleNext: () =>
      pagination.current < pagination.total &&
      fetchData(pagination.current + 1),
  };
};
