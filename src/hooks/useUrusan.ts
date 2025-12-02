import { useState, useEffect } from "react";
import { getUrusanList, getDataSektoralByUrusan } from "../api/urusanApi.js";

// ======================
// Type Definitions
// ======================

export type UrusanItem = {
  id: number;
  nama_opd: string;
  [key: string]: any;
};

export type InputItem = {
  tahun?: number;
  [key: string]: any;
};

export type DataSektoralItem = {
  id: number;
  input?: InputItem[];
  [key: string]: any;
};

export type PaginationType = {
  current: number;
  total: number;
  perPage: number;
  totalCount: number;
};

// ======================
// Hook
// ======================

export const useUrusan = () => {
  const [urusanList, setUrusanList] = useState<UrusanItem[]>([]);
  const [selectedOPD, setSelectedOPD] = useState<string>("");
  const [dariTahun, setDariTahun] = useState<string>("");
  const [sampaiTahun, setSampaiTahun] = useState<string>("");
  const [dataSektoral, setDataSektoral] = useState<DataSektoralItem[]>([]);
  const [tahunList, setTahunList] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [pagination, setPagination] = useState<PaginationType>({
    current: 1,
    total: 1,
    perPage: 20,
    totalCount: 0,
  });

  // Load list OPD / urusan
  useEffect(() => {
    getUrusanList()
      .then(setUrusanList)
      .catch((err) => console.error("Gagal memuat data urusan:", err));
  }, []);

  // Fetch data sektoral
  const fetchData = async (page = 1) => {
    if (!selectedOPD || !dariTahun || !sampaiTahun) {
      alert("Isi semua field (urusan, dari tahun, sampai tahun)!");
      return;
    }

    setLoading(true);
    try {
      const { data, pagination } = await getDataSektoralByUrusan(
        selectedOPD,
        dariTahun,
        sampaiTahun,
        page
      );

      setPagination(pagination);

      const tahunSet = new Set<number>();
      data.forEach((item: DataSektoralItem) => {
        item.input?.forEach((i) => {
          if (i.tahun) tahunSet.add(i.tahun);
        });
      });

      setTahunList([...tahunSet].sort((a, b) => a - b));
      setDataSektoral(data);
    } catch (err) {
      console.error("Gagal mengambil data sektoral:", err);
      setDataSektoral([]);
      setTahunList([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePrev = () => {
    if (pagination.current > 1) fetchData(pagination.current - 1);
  };

  const handleNext = () => {
    if (pagination.current < pagination.total) fetchData(pagination.current + 1);
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
    handlePrev,
    handleNext,
  };
};
