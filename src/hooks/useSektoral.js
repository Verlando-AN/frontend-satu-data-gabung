import { useState, useEffect } from "react";
import sektoralApi from "../api/sektoralApi.js";

export default function useSektoral() {
  const [opdList, setOpdList] = useState([]);
  const [selectedOPD, setSelectedOPD] = useState("");
  const [dariTahun, setDariTahun] = useState("");
  const [sampaiTahun, setSampaiTahun] = useState("");
  const [dataSektoral, setDataSektoral] = useState([]);
  const [tahunList, setTahunList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const perPage = 20;

  useEffect(() => {
    sektoralApi
      .getOpdList()
      .then(setOpdList)
      .catch((err) => console.error("Gagal memuat data OPD:", err));
  }, []);

  const fetchDataSektoral = async (page = 1) => {
    try {
      setLoading(true);
      const { data, current, total, totalCount } = await sektoralApi.getDataSektoral({
        selectedOPD,
        dariTahun,
        sampaiTahun,
        page,
        perPage,
      });

      const tahunSet = new Set();
      data.forEach((item) => {
        if (item.input && Array.isArray(item.input)) {
          item.input.forEach((i) => {
            if (i.tahun) tahunSet.add(i.tahun);
          });
        }
      });

      setTahunList(Array.from(tahunSet).sort((a, b) => a - b));
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
