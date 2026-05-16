import { useEffect, useState } from "react";
import sektoralApi from "../api/sektoralApi.js";

export type OpdItem = {
  id_user_opd: number | string;
  nama_opd: string;
  [key: string]: any;
};

export type InputItem = {
  tahun?: number;
  jumlah?: number;
  [key: string]: any;
};

export type DataSektoralItem = {
  id: number;
  kode_dssd?: string;
  uraian_dssd?: string;
  satuan?: string;
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

  const [selectedOPD, setSelectedOPD] =
    useState<string>("all");

  const [dariTahun, setDariTahun] =
    useState<string>("2020");

  const [sampaiTahun, setSampaiTahun] =
    useState<string>("2025");

  const [dataSektoral, setDataSektoral] =
    useState<DataSektoralItem[]>([]);

  const [tahunList, setTahunList] = useState<
    number[]
  >([]);

  const [loading, setLoading] =
    useState<boolean>(false);

  const [currentPage, setCurrentPage] =
    useState<number>(1);

  const [totalPages, setTotalPages] =
    useState<number>(1);

  const [totalCount, setTotalCount] =
    useState<number>(0);

  const perPage = 20;

  useEffect(() => {
    sektoralApi
      .getOpdList()
      .then((res: OpdItem[]) => {
        const defaultOption: OpdItem = {
          id_user_opd: "all",
          nama_opd: "Semua Data",
        };

        const normalizedData = res.map(
          (item: any) => ({
            ...item,
            id_user_opd:
              item.id_user_opd ??
              item.id_opd ??
              item.id,
          })
        );

        setOpdList([
          defaultOption,
          ...normalizedData,
        ]);
      })
      .catch((err: any) =>
        console.error(
          "Gagal memuat data OPD:",
          err
        )
      );
  }, []);

  const fetchDataSektoral = async (
    page = 1
  ) => {
    try {
      setLoading(true);

      const opdValue =
        selectedOPD === "all"
          ? "0"
          : String(selectedOPD);

      const {
        data,
        current,
        total,
        totalCount,
      }: SektoralResponse =
        await sektoralApi.getDataSektoral({
          selectedOPD: opdValue,
          dariTahun,
          sampaiTahun,
          page,
          perPage,
        });

      const tahunSet = new Set<number>();

      data.forEach(
        (item: DataSektoralItem) => {
          if (
            item.input &&
            Array.isArray(item.input)
          ) {
            item.input.forEach(
              (i: InputItem) => {
                if (i.tahun) {
                  tahunSet.add(i.tahun);
                }
              }
            );
          }
        }
      );

      setTahunList(
        [...tahunSet].sort((a, b) => a - b)
      );

      setDataSektoral(data);
      setCurrentPage(current);
      setTotalPages(total);
      setTotalCount(totalCount);
    } catch (err) {
      console.error(
        "Gagal mengambil data sektoral:",
        err
      );

      setDataSektoral([]);
      setTahunList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataSektoral(1);
  }, []);

  const handleTampilkan = () => {
    fetchDataSektoral(1);
  };

  const handleReset = () => {
    setSelectedOPD("all");
    setDariTahun("2020");
    setSampaiTahun("2025");

    fetchDataSektoral(1);
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      fetchDataSektoral(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      fetchDataSektoral(currentPage + 1);
    }
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
    handleReset,
    handlePrev,
    handleNext,
    perPage,
  };
}