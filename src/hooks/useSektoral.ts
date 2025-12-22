import { useState, useEffect } from "react";
import sektoralApi from "../api/sektoralApi.js";

export type OpdItem = {
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

export type SektoralResponse = {
  data: DataSektoralItem[];
  current: number;
  total: number;
  totalCount: number;
};

export default function useSektoral() {
  const [opdList, setOpdList] = useState<OpdItem[]>([]);
  const [selectedOPD, setSelectedOPD] = useState<string>("");
  const [dariTahun, setDariTahun] = useState<string>("");
  const [sampaiTahun, setSampaiTahun] = useState<string>("");
  const [dataSektoral, setDataSektoral] = useState<DataSektoralItem[]>([]);
  const [tahunList, setTahunList] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const perPage = 20;

  useEffect(() => {
    sektoralApi
      .getOpdList()
      .then((res: OpdItem[]) => setOpdList(res))
      .catch((err: any) => console.error("Gagal memuat data OPD:", err));
  }, []);

  const fetchDataSektoral = async (page = 1) => {
    try {
      setLoading(true);

      const { data, current, total, totalCount }: SektoralResponse =
        await sektoralApi.getDataSektoral({
          selectedOPD,
          dariTahun,
          sampaiTahun,
          page,
          perPage,
        });

      const tahunSet = new Set<number>();
      data.forEach((item: DataSektoralItem) => {
        if (item.input && Array.isArray(item.input)) {
          item.input.forEach((i: InputItem) => {
            if (i.tahun) tahunSet.add(i.tahun);
          });
        }
      });

      setTahunList([...tahunSet].sort((a, b) => a - b));
      setDataSektoral(data);
      setCurrentPage(current);
      setTotalPages(total);
      setTotalCount(totalCount);
    } catch (err) {
      console.error("Gagal mengambil data sektoral:", err);
      setDataSektoral([]);
      setTahunList([]);
    } finally {
      setLoading(false);
    }
  };

  const handleTampilkan = () => {
    if (!selectedOPD || !dariTahun || !sampaiTahun) {
      alert("Isi semua field (OPD, dari tahun, sampai tahun)!");
      return;
    }
    fetchDataSektoral(1);
  };

  const handlePrev = () => {
    if (currentPage > 1) fetchDataSektoral(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) fetchDataSektoral(currentPage + 1);
  };

  return {
    opdList,
    selectedOPD,
    setSelectedOPD,
    dariTahun,
    setDariTahun,
    sampaiTahun,
    setSampaiTahun,
    dataSektoral,
    tahunList,
    loading,
    currentPage,
    totalPages,
    totalCount,
    handleTampilkan,
    handlePrev,
    handleNext,
    perPage,
  };
}
